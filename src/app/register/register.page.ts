import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import {
  IonSlides,
  Platform,
  LoadingController,
  ToastController,
  NavController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment,
  Geocoder,
  BaseArrayClass,
  GeocoderResult
} from '@ionic-native/google-maps';
import { ApiService } from '../services/api.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IonInput } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  @ViewChild('stepSlider', null) slides: IonSlides;

  @ViewChild('inputEmail', { static: false }) inputEmail: IonInput;

  map: GoogleMap;
  loading: any;

  step = 1;

  progress: any = 0.25;

  mapDragging = false;

  slideOpts: any = {
    setWrapperSize: true,
    slidesPerView: 1,
    preloadImages: true,
    spaceBetween: 20,
    autoHeight: true
  };

  dummyMarker: any;

  countries;
  cities;
  regions;
  areas;

  lat;
  lng;

  selectedAddress;

  public userInfoForm: FormGroup;
  public addressInfoForm: FormGroup;

  constructor(
    private platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    public _translate: TranslateService
  ) {
    this.userInfoForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      mobile: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.addressInfoForm = formBuilder.group({
      address_name: ['', Validators.required],
      country_id: ['', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      area_id: [''],
      postal_code: ['']
    });
  }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    this.slides.lockSwipes(true);
    this.getCountries();
    this.dummyMarker = document.getElementById('DummyMarker');
  }

  getCountries() {
    this.apiService.getCountries().subscribe((countries: any) => {
      this.countries = countries;
    });
  }

  getRegions() {
    this.apiService
      .getRegions(this.addressInfoForm.get('country_id').value)
      .subscribe((regions: any) => {
        this.regions = regions;
      });
  }

  getCities() {
    this.apiService
      .getCities(this.addressInfoForm.get('state_id').value)
      .subscribe((cities: any) => {
        this.cities = cities;
      });
  }

  getAreas() {
    this.apiService
      .getAreas(this.addressInfoForm.get('city_id').value)
      .subscribe((areas: any) => {
        this.areas = areas;
      });
  }

  searchForName(itemID, arrayItems) {
    const res = arrayItems.filter(item => item.id === itemID);
    // console.log(res);
    return res[0].name;
  }

  nextStep() {
    switch (this.step) {
      case 1:
        if (this.userInfoForm.valid) {
          this.toNextStep();
        } else {
          this.showToast(
            this._translate.instant('general.fill_all_required_fields'),
            3000,
            'top',
            'danger'
          );
        }
        break;
      case 2:
        if (this.addressInfoForm.valid) {
          this.loadMap();
          this.getAddressCenter();
          this.toNextStep();
        } else {
          this.showToast(
            this._translate.instant('general.fill_all_required_fields'),
            3000,
            'top',
            'danger'
          );
        }
        break;
      case 3:
        // console.log(this.lat);
        // console.log(this.lng);
        if (this.lat && this.lng) {
          const registerData = {
            name: this.userInfoForm.get('name').value,
            mobile: this.userInfoForm.get('mobile').value,
            email: this.userInfoForm.get('email').value,
            username: this.userInfoForm.get('username').value,
            password: this.userInfoForm.get('password').value,
            password_confirmation: this.userInfoForm.get('password').value,
            address_name: this.addressInfoForm.get('address_name').value,
            country_id: this.addressInfoForm.get('country_id').value,
            state_id: this.addressInfoForm.get('state_id').value,
            city_id: this.addressInfoForm.get('city_id').value,
            area_id: this.addressInfoForm.get('area_id').value,
            postal_code: this.addressInfoForm.get('postal_code').value,
            lat: this.lat,
            lng: this.lng
          };
          // console.log(registerData);
          this.apiService.registerClient(registerData).subscribe(
            (userData: any) => {
              if (userData && userData.token && userData.user) {
                this.authService.doLogin(userData);
                this.toNextStep();
                this.showToast(
                  this._translate.instant(
                    'general_account_created_successfully'
                  ),
                  2000,
                  'bottom',
                  'success'
                );
                setTimeout(() => {
                  this.navCtrl.navigateRoot('/tabs/home');
                }, 5000);
              }
            },
            error => {
              // console.log(error);
              if (error.statusText === 'Unauthorized') {
                this.step = 1;
                this.progress = this.step / 4;
                this.slides.lockSwipes(false);
                this.slides.slideTo(0);
                this.slides.lockSwipes(true);
                this.userInfoForm.controls.email.setErrors({ incorrect: true });
                this.inputEmail.setFocus();
              }
              this.showToast(error.error.error, 3000, 'bottom', 'danger');
            }
          );
        }
        break;
    }
  }

  toNextStep() {
    this.step = this.step + 1;
    this.progress = this.step / 4;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    // console.log(this.step);
  }
  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDvYLf1yswB12mE2qGDxDmlBJOF_Su-CCs',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDvYLf1yswB12mE2qGDxDmlBJOF_Su-CCs'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
    this.map
      .addEventListener(GoogleMapsEvent.CAMERA_MOVE_START)
      .subscribe(data => {
        this.mapDragging = true;
        // this.dummyMarker.classList.add('dragging');
        // console.log('Dragging');
      });
    this.map
      .addEventListener(GoogleMapsEvent.CAMERA_MOVE_END)
      .subscribe(data => {
        // console.log(data);
        this.mapDragging = false;
        // this.dummyMarker.classList.remove('dragging');
        // console.log(this.map.getCameraTarget());
        const location = this.map.getCameraTarget();
        this.lat = location.lat;
        this.lng = location.lng;
        // console.log(this.lat);
        // console.log(this.lng);
      });
  }

  async getAddressCenter() {
    const addressArray = {
      country: this.searchForName(
        this.addressInfoForm.get('country_id').value,
        this.countries
      ),
      region: this.searchForName(
        this.addressInfoForm.get('state_id').value,
        this.regions
      ),
      city: this.searchForName(
        this.addressInfoForm.get('city_id').value,
        this.cities
      )
      // area: this.searchForName(
      //   this.addressInfoForm.get('area_id').value,
      //   this.areas
      // )
    };
    const addressText = `${addressArray.city} ${addressArray.region} ${addressArray.country}`;
    this.loading = await this.loadingCtrl.create({
      message: this._translate.instant('general.please_wait')
    });
    await this.loading.present();
    this.map.clear();

    // Address -> latitude,longitude
    // const searchAddress = `${this.addressInfoForm.get('')}`
    Geocoder.geocode({
      address: addressText
    }).then((results: GeocoderResult[]) => {
      // console.log(results);
      this.loading.dismiss();

      if (results.length > 0) {
        this.map.animateCamera({
          target: results[0].position,
          zoom: 16
        });
        this.lat = results[0].position.lat;
        this.lng = results[0].position.lng;
        // console.log(this.lat);
        // console.log(this.lng);
      } else {
        // alert('Not found');
      }
    });
  }

  async getCurrentLocation() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: this._translate.instant('general.please_wait')
    });
    await this.loading.present();

    // Get the location of you
    this.map
      .getMyLocation()
      .then((location: MyLocation) => {
        this.loading.dismiss();
        // console.log(JSON.stringify(location, null, 2));

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        });
      })
      .catch(err => {
        this.loading.dismiss();
        // console.log(err.error_message);
      });
  }

  async showToast(msg, time, place, theme) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: time,
      position: place,
      color: theme
    });

    toast.present();
  }
}

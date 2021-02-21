import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/ui/toast.service';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss']
})
export class LocationPage implements OnInit {
  @ViewChild('map_canvas', { static: false }) mapCanvas: ElementRef;
  map: GoogleMap;
  loading: any;

  dummyMarker: any;

  mapDragging = false;

  lat;
  lng;
  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    public locationService: LocationService,
    private router: Router,
    public loadingCtrl: LoadingController,
    public _translate: TranslateService,
    public toastService: ToastService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.loadMap().then(() => {
      const location = this.map.getCameraTarget();
      console.log('Your Location is : ' + location.lat + ',' + location.lng);
      console.log(this.lat);
      console.log(this.lng);
    });
  }

  ionViewWillLeave() {
    const nodeList = document.querySelectorAll('._gmaps_cdv_');

    for (let k = 0; k < nodeList.length; ++k) {
      nodeList.item(k).classList.remove('_gmaps_cdv_');
    }
  }

  ionViewDidLeave() {
    this.map.remove();
  }

  async loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDvYLf1yswB12mE2qGDxDmlBJOF_Su-CCs',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDvYLf1yswB12mE2qGDxDmlBJOF_Su-CCs'
    });
    this.map = GoogleMaps.create(this.mapCanvas.nativeElement, {
      controls: {
        compass: false,
        myLocation: false,
        myLocationButton: false,
        mapToolbar: false,
        zoom: false
      },
      gestures: {
        scroll: false,
        tilt: false,
        zoom: false,
        rotate: false
      },
      camera: {
        target: {
          lat: 31.032260599999997,
          lng: 31.36069329999998
        },
        zoom: 2
      }
    });
    await this.map.getMyLocation().then((location: MyLocation) => {
      // console.log(JSON.stringify(location, null, 2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 19,
        duration: 400
      });
      const myLocation = this.map.getCameraTarget();
      setTimeout(() => {
        this.lat = myLocation.lat;
        this.lng = myLocation.lng;
        console.log(this.lat);
        console.log(this.lng);
      }, 800);
    });
    // this.map
      // .addEventListener(GoogleMapsEvent.CAMERA_MOVE_START)
      // .subscribe(data => {});
    this.map
      .addEventListener(GoogleMapsEvent.CAMERA_MOVE_END)
      .subscribe(data => {
        const location = this.map.getCameraTarget();
        this.lat = location.lat;
        this.lng = location.lng;
        console.log(this.lat);
        console.log(this.lng);
      });
    this.map.setAllGesturesEnabled(false);
    this.map.setClickable(false);
  }

  async getCurrentLocation() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: this._translate.instant('general.please_wait')
    });
    await this.loading.present();

    // Get the location of you
    await this.map
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
        console.log('PROBLEM IS FOUND');
        console.log(err.error_message);

        this.toastService.simpleToast(
          this._translate.instant('general.enable_location_from_settings_first'),
          'danger',
          2000
        );
      });
    await this.locationService.getMyLocation();
  }

  async updateLocation() {
    this.loading = await this.loadingCtrl.create({
      message: this._translate.instant('general.please_wait')
    });
    await this.loading.present();
    await this.locationService.getMyLocation().then(() => {
      this.apiService
        .updateLocation(
          this.authService.userToken,
          this.locationService.myLat,
          this.locationService.myLng
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            this.loading.dismiss();
            if (res.success === 'ok') {
              this.toastService.simpleToast(
                this._translate.instant('general.update_location_success'),
                'success',
                2000
              );
            }
          },
          error => {
            console.log(error);
            this.loading.dismiss();
            this.toastService.simpleToast(
              this._translate.instant('general.update_location_faild'),
              'danger',
              2500
            );
          }
        );
    });
  }
}

import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import {
  IonSlides,
  Platform,
  LoadingController,
  ToastController,
  NavController,
  IonContent
} from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { NewAddressComponent } from '../shared/new-address/new-address.component';
import { NewReceiverComponent } from '../shared/new-receiver/new-receiver.component';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss']
})
export class NewOrderPage implements OnInit {
  @ViewChild('stepSlider', null) slides: IonSlides;

  @ViewChild('slide2', { static: true }) slide2: ElementRef;

  @ViewChild('rcv', null) receiversComp: IonicSelectableComponent;

  step = 1;

  slideOpts: any = {
    setWrapperSize: true,
    slidesPerView: 1,
    preloadImages: true,
    spaceBetween: 50,
    autoHeight: true
  };

  Opacity: any = 1;

  userAddresses;

  receivers = [];

  packageTypes;
  offices;

  categories;

  packages = [];

  receiverAddresses;

  isReturnDefray = false;

  public shipmentFirst: FormGroup;
  public packageForm: FormGroup;

  today = new Date();

  datePickerObj: any = {
    inputDate: new Date(), // default new Date()
    fromDate: new Date(), // default null
    toDate: null, // default null
    showTodayButton: false, // default true
    closeOnSelect: true, // default false
    mondayFirst: false, // default false
    titleLabel: 'Select a Date', // default null
    monthsList: [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ],
    weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
    clearButton: false, // default true
    momentLocale: 'en-US', // Default 'en-US'
    yearInAscending: true, // Default false
    btnCloseSetInReverse: false, // Default false
    btnProperties: {
      expand: 'block', // Default 'block'
      fill: '', // Default 'solid'
      size: '', // Default 'default'
      disabled: '', // Default false
      strong: '', // Default false
      color: '' // Default ''
    }
  };

  orderDone;

  keyboardOpen = false;

  constructor(
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public apiService: ApiService,
    private navCtrl: NavController,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public _translate: TranslateService
  ) {
    this.shipmentFirst = formBuilder.group({
      shipment_type: [1, Validators.required],
      sender_address: [null, Validators.required],
      receiver_id: [null],
      receiver_address: [null],
      return_defray: [false],
      return_package_fee: [null],
      packaging_id: [null, Validators.required],
      office_id: [null, Validators.required],
      ship_date: [moment(this.today).format('YYYY-MM-DD')],
      payment_type: [1, Validators.required],
      package_fee: ['']
    });

    this.packageForm = formBuilder.group({
      category_id: [null, Validators.required],
      quantity: ['', Validators.required],
      weight: ['', Validators.required],
      weight_unit: ['kg'],
      height: [''],
      height_unit: ['cm'],
      width: [''],
      width_unit: ['cm'],
      length: [''],
      length_unit: ['cm'],
      description: ['']
    });
  }

  async ngOnInit() {
    this.slides.lockSwipes(true);
    window.addEventListener('keyboardDidShow', event => {
      // Describe your logic which will be run each time when keyboard is about to be shown.
      // console.log('Keyboard is visible');
      this.keyboardOpen = true;
    });
    window.addEventListener('keyboardDidHide', () => {
      // Describe your logic which will be run each time keyboard is closed.
      // console.log('Keyboard is hide');
      this.keyboardOpen = false;
    });
    await this.getUserAddresses();
    await this.getPackageTypes();
    await this.getOffices();
    await this.getCategories();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: this._translate.instant('general.loading'),
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');
  }

  async defrayChange(event) {
    if (event.target.checked) {
      // Add a new control in the arrayForm
      this.isReturnDefray = true;
      this.shipmentFirst.get('return_package_fee').updateValueAndValidity();
      this.shipmentFirst.get('package_fee').updateValueAndValidity();
    } else {
      this.isReturnDefray = false;
      this.shipmentFirst.controls.return_package_fee.clearValidators();
      this.shipmentFirst.controls.package_fee.clearValidators();
      this.shipmentFirst.get('return_package_fee').updateValueAndValidity();
      this.shipmentFirst.get('package_fee').updateValueAndValidity();
    }
  }

  returnText(inCase) {
    switch (inCase) {
      case 'sender_address':
        return this.userAddresses.filter(
          ele => ele.id === this.shipmentFirst.controls.sender_address.value
        )[0].name;
        break;
      case 'receiver_id':
        return this.shipmentFirst.controls.receiver_id.value.name;
        break;
      case 'receiver_address':
        return this.receiverAddresses.filter(
          ele => ele.id === this.shipmentFirst.controls.receiver_address.value
        )[0].name;
        break;
      case 'packaging_id':
        return this.packageTypes.filter(
          ele => ele.id === this.shipmentFirst.controls.packaging_id.value
        )[0].name;
        break;
      case 'office_id':
        return this.offices.filter(
          ele => ele.id === this.shipmentFirst.controls.office_id.value
        )[0].name;
        break;

      default:
        break;
    }
    // return (arr.filter((ele) => { return ele.id == form.controls[control].value}))[0].name;
  }

  getCatName(catID) {
    return this.categories.filter(ele => ele.id === catID)[0].name;
  }

  async typeChange() {
    // if (this.shipmentFirst.get('shipment_type').value === 2) {
    //   this.shipmentFirst.controls.receiver_id.clearValidators();
    //   this.shipmentFirst.controls.receiver_address.clearValidators();
    //   this.shipmentFirst.get('receiver_id').updateValueAndValidity();
    //   this.shipmentFirst.get('receiver_address').updateValueAndValidity();
    // } else {
    //   this.shipmentFirst
    //     .get('sender_address')
    //     .setValidators([Validators.required]);
    //   this.shipmentFirst
    //     .get('receiver_address')
    //     .setValidators([Validators.required]);
    //   this.shipmentFirst.get('receiver_id').updateValueAndValidity();
    //   this.shipmentFirst.get('receiver_address').updateValueAndValidity();
    // }
    // console.log(this.shipmentFirst.get('shipment_type').value);
    // console.log(this.shipmentFirst.valid);
  }

  requiredIfValidator(predicate) {
    return formControl => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return Validators.required(formControl);
      }
      this.shipmentFirst.updateValueAndValidity();
      return null;
    };
  }

  async receiverChange() {}

  async appendPackage() {
    // console.log(this.packageForm.value);
    // this.packages.toArray();
    await (this.packages as any).push(this.packageForm.value);
    await this.packageFormReset();

    setTimeout(() => {
      this.slides.updateAutoHeight(200);

      this.slides.update();
    }, 200);
  }
  async removePackage(indx) {
    // console.log(indx);
    this.packages.splice(indx, 1);
  }

  searchUsers(event) {
    // console.log(event.text);
    // console.log(this.receiversComp.hasSearchText);
    if (this.receiversComp.hasSearchText) {
      this.receiversComp.showLoading();
      this.apiService.searchForUser(event.text).subscribe(
        (users: any) => {
          // console.log(users);
          this.receivers = users;
          this.receiversComp.hideLoading();
        },
        error => {
          // console.log(error);
          this.receiversComp.hideLoading();
        }
      );
    }
  }

  async getPackageTypes() {
    await this.apiService.getPackages().subscribe(
      (pTypes: any) => {
        this.packageTypes = pTypes;
        // console.log('Package Types: ', this.packageTypes);
      },
      error => {
        // console.error(error);
      }
    );
  }

  async getCategories() {
    await this.apiService.getCategories().subscribe(
      (cats: any) => {
        this.categories = cats;
        // console.log('Categories: ', this.categories);
      },
      error => {
        // console.error(error);
      }
    );
  }

  async getOffices() {
    await this.apiService.getOffices().subscribe(
      (rOffices: any) => {
        this.offices = rOffices;
        // console.log('Offices: ', this.offices);
      },
      error => {
        // console.error(error);
      }
    );
  }

  rcvDoneSelect(event) {
    // console.log(event);
    this.apiService
      .getUserAddresses(event.item.id, this.authService.userToken)
      .subscribe(
        recAddress => {
          this.receiverAddresses = recAddress;
          // console.log(this.receiverAddresses);
        },
        error => {
          // console.log(error);
        }
      );
  }
  clearRcvAddr(event) {
    this.receiverAddresses = [];
    this.shipmentFirst.get('receiver_address').patchValue(null);
  }

  getReceiverAddress() {
    const recData = this.shipmentFirst.get('receiver_id').value;
    this.apiService
      .getUserAddresses(recData.id, this.authService.userToken)
      .subscribe(
        recAddress => {
          this.receiverAddresses = recAddress;
          // console.log(this.receiverAddresses);
        },
        error => {
          // console.log(error);
        }
      );
  }

  packageFormReset() {
    this.packageForm.reset();
    this.packageForm.patchValue({
      weight_unit: 'kg',
      height_unit: 'cm',
      width_unit: 'cm',
      length_unit: 'cm'
    });
  }

  nextStep() {
    switch (this.step) {
      case 1:
        // console.log(this.shipmentFirst.value);
        if (this.shipmentFirst.valid) {
          this.step = this.step + 1;
          this.slides.lockSwipes(false);
          this.slides.slideNext();
          this.slides.lockSwipes(true);
          // console.log(this.step);
        }
        break;

      case 2:
        if (this.packages.length > 0) {
          if (this.packageForm.valid) {
            this.appendPackage().then(() => {
              this.step = this.step + 1;
              this.slides.lockSwipes(false);
              this.slides.slideNext();
              this.slides.lockSwipes(true);
              // console.log(this.step);
              // console.log(this.packages);
              this.packageFormReset();
            });
          } else {
            this.step = this.step + 1;
            this.slides.lockSwipes(false);
            this.slides.slideNext();
            this.slides.lockSwipes(true);
            // console.log(this.step);
            // console.log(this.packages);
          }
        } else {
          this.appendPackage().then(() => {
            this.step = this.step + 1;
            this.slides.lockSwipes(false);
            this.slides.slideNext();
            this.slides.lockSwipes(true);
            // console.log(this.step);
            // console.log(this.packages);
            this.packageFormReset();
          });
        }
        break;
      case 3:
        // if (this.shipmentFirst.valid) {
        //   this.step = this.step + 1;
        //   this.slides.lockSwipes(false);
        //   this.slides.slideNext();
        //   this.slides.lockSwipes(true);
        //   console.log(this.step);
        // }
        this.submitOrder();
        break;

      default:
        break;
    }
  }

  async getUserAddresses() {
    await this.apiService
      .getUserAddresses(
        this.authService.userData.id,
        this.authService.userToken
      )
      .subscribe((addresses: any) => {
        if (addresses && addresses.length > 0) {
          this.userAddresses = addresses;
          // console.log(this.userAddresses);
        }
      });
  }

  async newAddressModal() {
    const modal = await this.modalController.create({
      component: NewAddressComponent,
      componentProps: { type: 'user', receiverID: null },
      showBackdrop: false,
      cssClass: 'myClass'
    });
    modal.onWillDismiss().then(data => {
      // console.log('Modal closedd');
      this.Opacity = 1;
      // console.log(data);
      if (data.role === 'done') {
        this.getUserAddresses();
      }
    });
    this.Opacity = 0;
    return await modal.present();
  }

  async newReceiverAddressModal() {
    if (this.shipmentFirst.controls.receiver_id.valid) {
      // console.log('valid receiver');
      const desiredReceiver = this.shipmentFirst.get('receiver_id').value;
      // console.log(desiredReceiver.id);
      const modal = await this.modalController.create({
        component: NewAddressComponent,
        componentProps: {
          type: 'receiver',
          receiverID: desiredReceiver.id
        },
        showBackdrop: false,
        cssClass: 'myClass'
      });
      modal.onWillDismiss().then(data => {
        // console.log('Modal closedd');
        this.Opacity = 1;
        // console.log(data);
        if (data.role === 'done') {
          this.getUserAddresses();
          this.getReceiverAddress();
        }
      });
      this.Opacity = 0;
      return await modal.present();
    } else {
      this.showToast(
        this._translate.instant('general.select_sender_first'),
        3000,
        'bottom',
        'danger'
      );
    }
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

  async newReceiverModal() {
    const modal = await this.modalController.create({
      component: NewReceiverComponent,
      showBackdrop: false,
      cssClass: 'myClass'
    });
    modal.onWillDismiss().then(data => {
      // console.log('Modal closedd');
      this.Opacity = 1;
      // console.log(data);
      if (data.role === 'done') {
        this.getUserAddresses();
      }
    });
    this.Opacity = 0;
    return await modal.present();
  }

  submitOrder() {
    let rDefray = 0;
    let recID = null;
    if (this.shipmentFirst.controls.return_defray.value) {
      rDefray = 1;
    }
    if (this.shipmentFirst.controls.receiver_id.value !== null) {
      recID = this.shipmentFirst.controls.receiver_id.value.id;
    }

    let orderData;
    if (this.shipmentFirst.controls.shipment_type.value === 1) {
      orderData = {
        type: this.shipmentFirst.controls.shipment_type.value,
        sender_address_id: this.shipmentFirst.controls.sender_address.value,
        return_defray: rDefray,
        return_package_fee: this.shipmentFirst.controls.return_package_fee
          .value,
        packaging_id: this.shipmentFirst.controls.packaging_id.value,
        office_id: this.shipmentFirst.controls.office_id.value,
        ship_date: this.shipmentFirst.controls.ship_date.value,
        payment_type: this.shipmentFirst.controls.payment_type.value,
        package_fee: this.shipmentFirst.controls.package_fee.value,
        items: this.packages
      };
    } else {
      orderData = {
        type: this.shipmentFirst.controls.shipment_type.value,
        sender_address_id: this.shipmentFirst.controls.sender_address.value,
        receiver_id: recID,
        receiver_address_id: this.shipmentFirst.controls.receiver_address.value,
        return_defray: rDefray,
        return_package_fee: this.shipmentFirst.controls.return_package_fee
          .value,
        packaging_id: this.shipmentFirst.controls.packaging_id.value,
        office_id: this.shipmentFirst.controls.office_id.value,
        ship_date: this.shipmentFirst.controls.ship_date.value,
        payment_type: this.shipmentFirst.controls.payment_type.value,
        package_fee: this.shipmentFirst.controls.package_fee.value,
        items: this.packages
      };
    }

    // console.log(orderData);
    // console.log(this.packages);
    this.presentLoading();
    this.apiService.addOrder(this.authService.userToken, orderData).subscribe(
      (resOrder: any) => {
        // console.log(resOrder);
        this.loadingCtrl.dismiss();
        this.orderDone = resOrder;
        this.step = this.step + 1;
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
        // console.log(this.step);
      },
      error => {
        this.loadingCtrl.dismiss();
        console.error(error);
      }
    );
  }
}

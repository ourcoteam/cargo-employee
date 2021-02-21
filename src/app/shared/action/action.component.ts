import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavParams,
  ModalController,
  LoadingController,
  ToastController,
  NavController,
  AlertController
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/ui/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewAddressComponent } from '../new-address/new-address.component';
import { NewReceiverComponent } from '../new-receiver/new-receiver.component';
import * as moment from 'moment';
import { LocationService } from 'src/app/services/location.service';
import { LoadingService } from 'src/app/services/ui/loading.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @ViewChild('rcv', null) receiversComp: IonicSelectableComponent;
  shipData;
  userToken;

  action;

  Opacity: any = 1;

  userAddresses;

  newAddressData;

  receivers = [];

  packageTypes;
  offices;

  categories;

  packages = [];

  receiverAddresses;

  compareWith: any;

  isReturnDefray = false;

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

  public receiveForm: FormGroup;
  public shipmentFirst: FormGroup;

  public packageForm: FormGroup;
  public postponeForm: FormGroup;

  currentReceiver;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public apiService: ApiService,
    public locationService: LocationService,
    private navCtrl: NavController,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public _translate: TranslateService,
    private loadingUI: LoadingService,
    private toastService: ToastService
  ) {
    this.shipmentFirst = formBuilder.group({
      shipment_type: [1, Validators.required],
      sender_address: ['', Validators.required],
      receiver_id: [''],
      receiver_address: [''],
      return_defray: [false],
      return_package_fee: [''],
      packaging_id: ['', Validators.required],
      office_id: ['', Validators.required],
      ship_date: [moment(this.today).format('YYYY-MM-DD')],
      payment_type: [1, Validators.required],
      package_fee: ['']
    });

    this.receiveForm = formBuilder.group({
      id: [''],
      courier_fee: [''],
      receiver_data: [''],
      receiver_id: ['', Validators.required],
      receiver_address_id: ['', Validators.required],
      receiver_address: [''],
      return_defray: [0],
      return_package_fee: [''],
      package_fee: [''],
      return_courier_fee: ['']
    });

    this.postponeForm = formBuilder.group({
      id: [''],
      ship_date: ['', Validators.required],
      note: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.packageForm = formBuilder.group({
      category_id: ['', Validators.required],
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
    this.shipData = this.navParams.get('shipment_data');
    this.userToken = this.navParams.get('userToken');
    this.action = this.navParams.get('action');
    await this.getUserAddresses();
    await this.getPackageTypes();
    await this.getOffices();
    await this.getCategories();
    await this.fillForm().then(() => {
      if (this.action === 'receive') {
        // this.setCurrentReceiver(this.receiveForm.get('receiver_id').value);
        this.defrayChangeByVal(this.shipData.return_defray);
        console.log(typeof this.shipData);
      }
    });
    this.compareWith = this.compareWithFn;
    // await this.defrayChangeByVal(this.shipData.return_defray);
  }

  async onRecAddrChange(e) {
    console.log(e);
    this.receiveForm.patchValue({
      receiver_address_id: parseFloat(e.detail.value.id),
      receiver_address: e.detail.value
    });
    console.log(this.receiveForm.value);
  }

  compareWithFn(o1: any, o2: any) {
    // console.log(this.receiveForm.get('receiver_address_id').value);
    // console.log(o1 && o2 ? o1.id === o2.id : o1 === o2);
    // console.log(
    //   'o1: ' + o1 + ' o2: ' + o2 + 'o1.id: ' + o1.id + 'o2.id: ' + o2.id
    // );
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  async closeModal() {
    this.modalController.dismiss();
  }

  async fillForm() {
    switch (this.action) {
      case 'receive':
        this.receiveForm.patchValue({
          id: this.shipData.id ? this.shipData.id : '',
          courier_fee: this.shipData.courier_fee_amount
            ? this.shipData.courier_fee_amount
            : '',
          receiver_id: this.shipData.receiver
            ? this.shipData.receiver.id
            : '',
          receiver_address_id: this.shipData.receiver_address
            ? this.shipData.receiver_address.id
            : '',
          return_defray: this.shipData.return_defray
            ? this.shipData.return_defray
            : '',
          return_package_fee: this.shipData.return_package_fee
            ? this.shipData.return_package_fee
            : '',
          package_fee: this.shipData.package_fee_amount
            ? this.shipData.package_fee_amount
            : '',
          return_courier_fee: this.shipData.return_courier_fee_amount
            ? this.shipData.return_courier_fee_amount
            : ''
        });
        break;
      case 'postpone':
        this.postponeForm.patchValue({
          id: this.shipData.id ? this.shipData.id : '',
          shipDate: this.shipData.shipDate
            ? this.shipData.shipDate
            : new Date(),
          note: this.shipData.note ? this.shipData.note : ''
        });
        break;

      default:
        break;
    }
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
      this.receiveForm.get('return_package_fee').updateValueAndValidity();
      this.receiveForm.get('package_fee').updateValueAndValidity();
    } else {
      this.isReturnDefray = false;
      this.receiveForm.controls.return_package_fee.clearValidators();
      this.receiveForm.controls.package_fee.clearValidators();
      this.receiveForm.get('return_package_fee').updateValueAndValidity();
      this.receiveForm.get('package_fee').updateValueAndValidity();
    }
  }

  async defrayChangeByVal(value) {
    if (value === 1) {
      // Add a new control in the arrayForm
      this.isReturnDefray = true;
      this.receiveForm.get('return_package_fee').updateValueAndValidity();
      this.receiveForm.get('package_fee').updateValueAndValidity();
    } else {
      this.isReturnDefray = false;
      this.receiveForm.controls.return_package_fee.clearValidators();
      this.receiveForm.controls.package_fee.clearValidators();
      this.receiveForm.get('return_package_fee').updateValueAndValidity();
      this.receiveForm.get('package_fee').updateValueAndValidity();
    }
  }

  returnText(inCase) {
    switch (inCase) {
      case 'sender_address':
        return this.userAddresses.filter(
          ele => ele.id === this.receiveForm.controls.sender_address.value
        )[0].name;
        break;
      case 'receiver_id':
        return this.receiveForm.controls.receiver_id.value.name;
        break;
      case 'receiver_address':
        return this.receiverAddresses.filter(
          ele => ele.id === this.receiveForm.controls.receiver_address.value
        )[0].name;
        break;
      case 'packaging_id':
        return this.packageTypes.filter(
          ele => ele.id === this.receiveForm.controls.packaging_id.value
        )[0].name;
        break;
      case 'office_id':
        return this.offices.filter(
          ele => ele.id === this.receiveForm.controls.office_id.value
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

  async typeChange() {}

  requiredIfValidator(predicate) {
    return formControl => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return Validators.required(formControl);
      }
      this.receiveForm.updateValueAndValidity();
      return null;
    };
  }

  async receiverChange() {}

  async appendPackage() {
    // console.log(this.packageForm.value);
    // this.packages.toArray();
    await (this.packages as any).push(this.packageForm.value);
    await this.packageFormReset();
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
    console.log(event);
    this.receiveForm.patchValue({
      receiver_id: event.item.id,
      receiver_data: event.item
    });
    console.log(this.receiveForm.value);
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
    this.receiveForm.get('receiver_address_id').patchValue(null);
  }

  async getReceiverAddress(currentAddr?, currentAddrID?) {
    const recData = this.receiveForm.get('receiver_id').value;
    await this.apiService
      .getUserAddresses(recData, this.authService.userToken)
      .subscribe(
        async recAddress => {
          this.receiverAddresses = recAddress;
          if (currentAddrID) {
            setTimeout(() => {
              this.receiveForm.patchValue({
                receiver_address: currentAddr,
                receiver_address_id: parseFloat(currentAddrID)
              });
              console.log(this.receiveForm.get('receiver_address_id').value);
            }, 600);
          }
          console.log(this.receiverAddresses);
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
    if (this.receiveForm.controls.receiver_id.valid) {
      // console.log('valid receiver');
      const desiredReceiver = this.receiveForm.get('receiver_id').value;
      // console.log(desiredReceiver.id);
      const modalNewAddress = await this.modalController.create({
        component: NewAddressComponent,
        componentProps: {
          type: 'receiver',
          receiverID: desiredReceiver
        },
        showBackdrop: false,
        cssClass: 'myClass'
      });
      modalNewAddress.onWillDismiss().then(async data => {
        // console.log('Modal closedd');
        this.Opacity = 1;
        // console.log(data);
        if (data.role === 'done') {
          // await this.getUserAddresses();
          this.getReceiverAddress(data.data, data.data.id);
          // this.newAddressData = data.data;
          // await console.log(data);
          await console.log(this.receiveForm.get('receiver_address_id').value);
          this.getReceiverAddress(data.data, data.data.id);
        }
      });
      this.Opacity = 0;
      return await modalNewAddress.present();
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
    const modalNewReceiver = await this.modalController.create({
      component: NewReceiverComponent,
      showBackdrop: false,
      cssClass: 'myClass'
    });
    modalNewReceiver.onWillDismiss().then(async data => {
      // console.log('modalNewReceiver closedd');
      this.Opacity = 1;
      console.log(data);
      if (data.role === 'done') {
        this.receiveForm.patchValue({
          receiver_id: data.data.id,
          receiver_data: data.data,
          receiver_address_id: null,
          receiver_address: null
        });
        this.receiverAddresses = [];
        // this.shipData.push({
        //   receiver: { id: data.data.id, name: data.data.name }
        // });
        const receiver = [
          {
            receiver: { id: data.data.id, name: data.data.name }
          }
        ];
        // this.shipData[0].push(receiver);

        // this.shipData.receiver.id = data.data.id;
        // this.shipData.receiver = {
        //   id: data.data.id,
        //   name: data.data.name
        // };
        // this.shipData.receiver_address = {
        //   id: null,
        //   address: null,
        //   lat: null,
        //   lng: null
        // };
        console.log(this.shipData);
        console.log(this.receiveForm.value);
        this.getUserAddresses();
      }
    });
    this.Opacity = 0;
    return await modalNewReceiver.present();
  }

  async receiveCheck() {
    this.loadingUI.simpleLoading();
    this.apiService
      .receiveConfirmCheck(this.authService.userToken, this.receiveForm.value)
      .subscribe(
        (res: any) => {
          this.loadingUI.loadingDismiss();
          console.log(res);
          this.receiveAlertConfirm(res);
        },
        error => {
          this.loadingUI.loadingDismiss();
          console.log(error);
          // const fakeRes = {
          //   delivery_cost: '150 جنيه',
          //   sender_fees: '150 جنيه',
          //   receiver_fees: '150 جنيه'
          // };
          // this.receiveAlertConfirm(fakeRes);
          this.toastService.simpleToast(
            this._translate.instant('general.general_error'),
            'danger',
            2000
          );
        }
      );
  }

  async receiveAlertConfirm(res) {
    const alert = await this.alertController.create({
      message: `${this._translate.instant(
        'general.total_cost_shipment_fees'
      )}<br/><b>${res.delivery_cost}</b><br>
      ${this._translate.instant('general.total_cost_shipment_from_sender')}<br/>
      <b>${res.sender_fees}</b><br/>
      ${this._translate.instant(
        'general.total_cost_shipment_from_receiver'
      )}<br>
      <b>${res.receiver_fees}</b>`,
      buttons: [
        {
          text: this._translate.instant('actions.cancel'),
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: this._translate.instant('actions.confirm'),
          handler: () => {
            console.log('Confirm Okay');
            this.doDeliver();
          }
        }
      ]
    });

    await alert.present();
  }

  async doDeliver() {
    this.loadingUI.simpleLoading();
    await this.locationService.getMyLocation().then(() => {
      this.apiService
        .receiveConfirm(
          this.authService.userToken,
          this.receiveForm.value,
          this.locationService.myLat,
          this.locationService.myLng
        )
        .subscribe(
          (res: any) => {
            this.loadingUI.loadingDismiss();
            console.log(res);
            this.showToast(
              this._translate.instant('actions.received_success'),
              2000,
              'bottom',
              'success'
            );
            this.closeModal();
          },
          error => {
            this.loadingUI.loadingDismiss();
            console.log(error);
            this.showToast(
              this._translate.instant('actions.received_failed'),
              2000,
              'bottom',
              'danger'
            );
          }
        );
    });
  }

  async doPostpone() {
    this.loadingUI.simpleLoading();
    await this.locationService.getMyLocation().then(() => {
      this.apiService
        .shipPostpone(
          this.authService.userToken,
          this.postponeForm.value,
          this.locationService.myLat,
          this.locationService.myLng
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            this.loadingUI.loadingDismiss();
            this.showToast(
              this._translate.instant('actions.postponed_success'),
              2000,
              'bottom',
              'success'
            );
            this.closeModal();
          },
          error => {
            console.log(error);
            this.loadingUI.loadingDismiss();
            this.showToast(
              this._translate.instant('actions.postponed_failed'),
              2000,
              'bottom',
              'danger'
            );
          }
        );
    });
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Renderer
} from '@angular/core';
import {
  NavParams,
  ModalController,
  LoadingController,
  AlertController,
  ToastController,
  NavController,
  Platform
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/services/location.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { LoadingService } from 'src/app/services/ui/loading.service';
import { ToastService } from 'src/app/services/ui/toast.service';

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss']
})
export class DeliverComponent implements OnInit {
  shipData;
  userToken;

  action;

  contentScroll = true;

  idCardPhoto;
  idCardPhotoData;
  idCardPhoto64;

  packagePhoto;
  packagePhotoData;
  packagePhoto64;

  recName;

  signature;
  sigPhoto;
  sigSaved = false;

  sigDrawed = false;

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;

  selectedColor = '#000000';
  colors = [
    '#9e2956',
    '#c2281d',
    '#de722f',
    '#edbf4c',
    '#5db37e',
    '#459cde',
    '#4250ad',
    '#802fa3'
  ];

  drawing = false;
  lineWidth = 5;
  @ViewChild('signatureDiv', { static: false }) signatureDiv: ElementRef;

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
    private camera: Camera,

    public loadingUI: LoadingService,
    public toastUI: ToastService,
    public _translate: TranslateService,
    private plt: Platform
  ) {}

  ngOnInit() {
    this.shipData = this.navParams.get('shipment_data');
    this.userToken = this.navParams.get('userToken');
    this.action = this.navParams.get('action');

    console.log('Delivered', this.shipData);
    this.recName = this.shipData.sender.name;
  }

  async closeModal() {
    this.modalController.dismiss();
  }

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    setTimeout(() => {
      const sigWidth = this.signatureDiv.nativeElement.offsetWidth;
      const sigHeight = this.signatureDiv.nativeElement.offsetHeight;
      console.log(sigWidth);
      console.log(sigHeight);
      this.canvasElement = this.canvas.nativeElement;
      this.canvasElement.width = sigWidth - 4;
      this.canvasElement.height = sigHeight;
    }, 500);
  }

  startDrawing(ev) {
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  endDrawing() {
    this.drawing = false;
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  setBackground() {
    const background = new Image();
    background.src = './assets/code.png';
    const ctx = this.canvasElement.getContext('2d');

    background.onload = () => {
      ctx.drawImage(
        background,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
    };
  }

  moved(ev) {
    if (!this.drawing) {
      return;
    }

    this.sigDrawed = true;

    const canvasPosition = this.canvasElement.getBoundingClientRect();
    const ctx = this.canvasElement.getContext('2d');

    const currentX = ev.touches[0].pageX - canvasPosition.x;
    const currentY = ev.touches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  exportCanvasImage() {
    const dataUrl = this.canvasElement.toDataURL();

    // Clear the current canvas
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  clearSignature() {
    this.sigSaved = false;
    this.sigDrawed = false;
    this.signature = null;
    setTimeout(() => {
      const ctx = this.canvasElement.getContext('2d');
      ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      const sigWidth = this.signatureDiv.nativeElement.offsetWidth;
      const sigHeight = this.signatureDiv.nativeElement.offsetHeight;
      console.log(sigWidth);
      console.log(sigHeight);
      this.canvasElement = this.canvas.nativeElement;
      this.canvasElement.width = sigWidth - 4;
      this.canvasElement.height = sigHeight;
    }, 500);
  }

  saveSignature() {
    const dataUrl = this.canvasElement.toDataURL();
    this.signature = dataUrl;
    console.log(this.signature);
    this.sigPhoto = dataUrl.toString();
    this.sigSaved = true;
  }

  async openCam() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 400,
      targetHeight: 200,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // alert(imageData)
        this.idCardPhotoData = imageData;
        if (this.plt.is('android')) {
          this.idCardPhoto = 'data:image/jpeg;base64,' + imageData;
        } else {
          this.idCardPhoto = 'data:image/jpeg;base64,' + imageData;
        }

        this.idCardPhoto64 = 'data:image/jpeg;base64,' + imageData;

        console.log(this.idCardPhotoData);
        console.log(this.idCardPhoto);
      },
      err => {
        // Handle error
        alert('error ' + JSON.stringify(err));
      }
    );
  }

  async openCam2() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 400,
      targetHeight: 200,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // alert(imageData)
        this.packagePhotoData = imageData;
        if (this.plt.is('android')) {
          this.packagePhoto = 'data:image/jpeg;base64,' + imageData;
        } else {
          this.packagePhoto = 'data:image/jpeg;base64,' + imageData;
        }

        this.packagePhoto64 = 'data:image/jpeg;base64,' + imageData;

        console.log(this.packagePhotoData);
        console.log(this.packagePhoto);
      },
      err => {
        // Handle error
        alert('error ' + JSON.stringify(err));
      }
    );
  }

  async receiveCheck() {
    this.loadingUI.simpleLoading();
    const formData = {
      id: this.shipData.id ? this.shipData.id : null,
      courier_fee: this.shipData.courier_fee_amount
        ? this.shipData.courier_fee_amount
        : null,
      receiver_id: this.shipData.receiver ? this.shipData.receiver.id : null,
      receiver_address_id: this.shipData.receiver_address
        ? this.shipData.receiver_address.id
        : null,
      return_defray: this.shipData.return_defray
        ? this.shipData.return_defray
        : null,
      return_package_fee: this.shipData.return_package_fee
        ? this.shipData.return_package_fee
        : null,
      package_fee: this.shipData.package_fee_amount
        ? this.shipData.package_fee_amount
        : null,
      return_courier_fee: this.shipData.return_courier_fee_amount
        ? this.shipData.return_courier_fee_amount
        : null
    };
    this.apiService
      .receiveConfirmCheck(this.authService.userToken, formData)
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
          this.toastUI.simpleToast(
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
    this.presentLoading();
    await this.locationService.getMyLocation().then(() => {
      const form = {
        id: this.shipData.id,
        copy: this.idCardPhoto64,
        package_before: this.packagePhoto64,
        signature: this.signature,
        receiver: this.recName
      };
      this.apiService
        .shipDeliver(
          this.userToken,
          form,
          this.locationService.myLat,
          this.locationService.myLng
        )
        .subscribe(
          (res: any) => {
            if (res.success === 'ok') {
              console.log(res);
              this.showToast(
                this._translate.instant('actions.delivered_success'),
                2000,
                'bottom',
                'success'
              ).then(() => {
                this.loadingCtrl.dismiss();
                this.closeModal();
              });
            }
          },
          error => {
            this.loadingCtrl.dismiss();
            console.log(error);
            this.showToast(
              this._translate.instant('actions.delivered_fail'),
              2000,
              'bottom',
              'danger'
            );
          }
        );
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
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: this._translate.instant('general.uploading')
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');
  }
}

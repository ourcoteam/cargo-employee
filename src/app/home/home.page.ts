import { Component, NgZone, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from '@ionic-native/barcode-scanner/ngx';

import { AudioService } from '../services/audio.service';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Platform } from '@ionic/angular';
import { ModalController, ToastController } from '@ionic/angular';
import { ShipmentDetailsComponent } from '../shared/shipment-details/shipment-details.component';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../services/ui/loading.service';
import { BarcodeShipmentDetailsComponent } from '../shared/barcode-shipment-details/barcode-shipment-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  trackingID = '';

  trackScanned = false;

  currentTap = 'current';

  userShipments;

  archiveShipments;

  currPageNum = 1;

  pastPageNum = 1;

  totalCurrent;
  totalArchived;

  searched;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private audio: AudioService,
    public authService: AuthService,
    public apiService: ApiService,
    private platform: Platform,
    public modalController: ModalController,
    private router: Router,
    public toastController: ToastController,
    public _translate: TranslateService,
    public loadingUI: LoadingService,
    private zone:NgZone
  ) {
    this.encodeData = 'https://www.FreakyJolly.com';
    // Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((route: NavigationStart) => {
        // console.log('Route: ', route.url);
        if (route.url === '/tabs/home') {
          // this.authService.authState.subscribe(state => {
          //   if (state) {
          //     this.updateWalletNoti();
          //   }
          // });
          // if (this.authService.isAuthenticated()) {
          //   this.getUserShipments();
          // }
        }
      });
  }

  async ngOnInit() {
    this.audio.preload('codeScanned', 'assets/audio/scan_beep.mp3');
    this.audio.preload('scanCodeError', 'assets/audio/scan_error.mp3');

    // await this.loadingUI.simpleLoading();

    this.authService.ifLoggedIn().then(() => {
      this.authService.getUserData();
      // console.log(this.authService.isAuthenticated());
      if (this.authService.isAuthenticated()) {
        this.getUserShipments();
        // setTimeout(() => {
        //   this.loadingUI.loadingDismiss();
        // }, 1000);
      }
      this.authService.authState.subscribe(state => {
        if (
          state &&
          this.authService.isAuthenticated() &&
          this.authService.userToken
        ) {
          this.updateWalletNoti();
        }
      });
    });
  }

  async updateWalletNoti() {
    this.authService.getUserData();
    this.authService.notificationCount(this.authService.userToken);
    this.authService.getWallet(this.authService.userToken);
    this.authService.getNotifications(this.authService.userToken);
  }

  async presentToast(msg, pos, col, dur) {
    const toast = await this.toastController.create({
      message: msg,
      position: pos,
      color: col,
      duration: dur
    });
    toast.present();
  }

  // async ionViewDidEnter() {
  //   console.log('ionViewDidEnter');
  //   if (this.authService.isAuthenticated()) {
  //     this.getUserShipments();
  //   }
  // } 
  


  // scanCode() {
  //  this.barcodeList = [];
  //   this.doScan();
  // }

  // barcodeList = [];
  // doScan() {
  //   this.barcodeScanner.scan().then((scanData => {
  //     if(scanData.text) {
  //       this.audio.play('codeScanned')
  //       this.barcodeList.push(scanData.text);

  //     } else {
  //       this.audio.play('scanCodeError')
  //     }
  //     if(scanData.cancelled) {
  //       console.log(this.barcodeList)

  //       this.apiService.getMultiShipmentDetails(this.barcodeList).subscribe(
  //         // this.apiService.getMultiShipmentDetails(['032313','032314','032315']).subscribe(
  //           (shipmentData: any) => {
  //             console.log(shipmentData) 
  //             // this.trackScanned = true;
  //             // this.currentTap = 'search';
  //             // // console.log(this.currentTap);
  //             // this.loadingUI.loadingDismiss();
  //             // this.searched = [shipmentData];
  //             // // console.log(this.searched);


  //             // this.modalController.create({
  //             //   component: BarcodeShipmentDetailsComponent,
  //             //   componentProps:{
  //             //     data:shipmentData,
  //             //     shipment_id: shipmentData.number,
  //             //     userToken: this.authService.userToken
  //             //   },
  //             // }).then(m => m.present())
  //           },
  //           error => {
  //             this.loadingUI.loadingDismiss();
  //             // console.log(error);
  //             // console.log('nothing found');
  //             this.presentToast(
  //               this._translate.instant('general.No_shipments_found'),
  //               'bottom',
  //               'danger',
  //               3000
  //             );
  //           }
  //       );

  //     } else {
  //       this.doScan()
  //     }
  //   }))
  // }

  async scanCode() {
    await this.barcodeScanner
      .scan()
      .then((barcodeData: any) => {
        // console.log(barcodeData);
        if (!barcodeData.cancelled) {
          console.log('barcodeData', barcodeData)
          this.audio.play('codeScanned');
          this.trackingID = barcodeData.text;
          this.loadingUI.simpleLoading();
          
          // this.apiService.getShipmentDetails('REF702380').subscribe(
          this.apiService.getShipmentDetails(this.trackingID).subscribe(
            (shipmentData: any) => {
              console.log(shipmentData)
              this.trackScanned = true;
              this.currentTap = 'search';
              // console.log(this.currentTap);
              this.loadingUI.loadingDismiss();
              this.searched = [shipmentData];
              // console.log(this.searched);


              this.modalController.create({
                component: BarcodeShipmentDetailsComponent,
                componentProps:{
                  data:shipmentData,
                  shipment_id: shipmentData.number,
                  userToken: this.authService.userToken
                },
              }).then(m => m.present())
            },
            error => {
              this.loadingUI.loadingDismiss();
              // console.log(error);
              // console.log('nothing found');
              this.presentToast(
                this._translate.instant('general.No_shipments_found'),
                'bottom',
                'danger',
                3000
              );
            }
          );
       
        }
        this.scannedData = barcodeData;
      })
      .catch(err => {
        // console.log('Error', err);
        // console.log('nothing found');
      });
  }

  async trackOrder() {
    this.loadingUI.simpleLoading();
    await this.apiService.getShipmentDetails(this.trackingID).subscribe(
      (shipmentData: any) => {
        console.log(shipmentData);
        this.trackScanned = true;
        this.currentTap = 'search';
        this.loadingUI.loadingDismiss();
        this.searched = [shipmentData];
      },
      error => {
        this.loadingUI.loadingDismiss();
        // console.log(error);
        // console.log('nothing found');
        this.presentToast(
          this._translate.instant('general.No_shipments_found'),
          'bottom',
          'danger',
          3000
        );
      }
    );
  }

  async trackingChange() {
    if (this.trackingID === '' && this.authService.isAuthenticated()) {
      this.trackScanned = false;
      this.currentTap = 'current';
      this.getUserShipments();
    }
  }

  async clearTracking() {
    this.trackingID = '';
    this.searched = [];
    this.trackScanned = false;
    this.currentTap = 'current';
  }

  async getUserShipments() {
    await this.authService.getUserData();
    // console.log(this.authService.userToken);
    await this.apiService
      .getUserShipments(this.authService.userToken)
      .subscribe((shipments: any) => {
        console.log(shipments);
        // this.userShipments = shipments.filter(
        //   x => x.requested !== 4 || x.requested !== 8 || x.requested !== 12
        // );
        this.totalCurrent = shipments.count;
        this.userShipments = shipments;
        // this.archiveShipments = shipments.filter(
        //   x => x.requested === 4 || x.requested === 8 || x.requested === 12
        // );
      });
  }

  async shipmentDetail(shipmentID) {
    // console.log(shipmentID);
    const modal = await this.modalController.create({
      component: ShipmentDetailsComponent,
      componentProps: {
        shipment_id: shipmentID,
        userToken: this.authService.userToken
      }
    });
    return await modal.present().then(() => {
      modal.onWillDismiss().then(() => {
        this.getUserShipments();
        this.updateWalletNoti();
        this.trackingID = '';
        this.scannedData = {};
        this.trackScanned = false;
        this.searched = [];
        this.currentTap = 'current';
      });
    });
  }

  async navigate(lat, lng, locName?) {
    const destination = lat + ',' + lng;

    if (this.platform.is('ios')) {
      window.open('maps://?q=' + destination, '_system');
    } else {
      const label = encodeURI(locName);
      window.open('geo:0,0?q=' + destination + label, '_system');
    }
  }

  loadMore(event, type) {
    if (type === 'current') {
      if (this.totalCurrent > this.userShipments.length) {
        this.currPageNum++;
        this.apiService
          .getUserShipments(this.authService.userToken, this.currPageNum)
          .subscribe((data: any) => {
            console.log(data);
            this.userShipments.push(...data.items);
            setTimeout(() => {
              event.target.complete();
            }, 1200);
          });
      } else {
        event.target.complete();
      }
    }
  }

  async reload(event, type) {
    if (type === 'current') {
      this.currPageNum = 1;
      this.getUserShipments().then(() => {
        setTimeout(() => {
          event.target.complete();
        }, 1200);
      });
    }
  }
}

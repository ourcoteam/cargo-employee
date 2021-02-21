import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionComponent } from '../action/action.component';
import { DeliverComponent } from '../actions/deliver/deliver.component';
import { NotesComponent } from '../actions/notes/notes.component';
import { DiscardsComponent } from '../actions/discards/discards.component';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss']
})
export class ShipmentDetailsComponent implements OnInit {
  shipmentID;
  userToken;

  shData;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    public authService: AuthService,
    public apiService: ApiService,
    public _translate: TranslateService,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.showLoading();
    this.shipmentID = this.navParams.get('shipment_id');
    this.userToken = this.navParams.get('userToken');
    // console.log(this.shipmentID);
    this.apiService
      .getShipmentDetails(this.shipmentID)
      .subscribe((shipment: any) => {
        this.shData = shipment;
        console.log(this.shData);
        setTimeout(() => {
          this.hideLoading();
        }, 300);
      });
  }
  async closeModal() {
    this.modalController.dismiss();
  }

  async reloadShip() {
    console.log('reloading');
    this.apiService
      .getShipmentDetails(this.shipmentID)
      .subscribe((shipment: any) => {
        this.shData = shipment;
        console.log(this.shData);
      });
  }

  async doAction(act) {
    const modal = await this.modalController.create({
      component: ActionComponent,
      componentProps: {
        shipment_data: this.shData,
        userToken: this.userToken,
        action: act
      }
    });

    return await modal.present().then(() => {
      modal.onWillDismiss().then(() => {
        this.reloadShip();
      });
    });
  }

  async switchAction(act) {
    switch (act) {
      case 'delivered':
        const modal = await this.modalController.create({
          component: DeliverComponent,
          componentProps: {
            shipment_data: this.shData,
            userToken: this.userToken,
            action: act
          }
        });

        return await modal.present().then(() => {
          modal.onWillDismiss().then(() => {
            this.reloadShip();
          });
        });
        break;
      case 'addnote':
        const modal2 = await this.modalController.create({
          component: NotesComponent,
          componentProps: {
            shipment_data: this.shData,
            userToken: this.userToken,
            action: act
          }
        });
        return await modal2.present().then(() => {
          modal2.onWillDismiss().then(() => {
            this.reloadShip();
          });
        });
        break;
      case 'discards':
        const modal3 = await this.modalController.create({
          component: DiscardsComponent,
          componentProps: {
            shipment_data: this.shData,
            userToken: this.userToken,
            action: act
          }
        });
        return await modal3.present().then(() => {
          modal3.onWillDismiss().then(() => {
            this.reloadShip();
          });
        });
        break;

      default:
        break;
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: this._translate.instant('general.loading')
    });
    await loading.present();
  }

  async hideLoading() {
    this.loadingCtrl.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActionComponent } from '../action/action.component';
import { DeliverComponent } from '../actions/deliver/deliver.component';
import { DiscardsComponent } from '../actions/discards/discards.component';
import { NotesComponent } from '../actions/notes/notes.component';
import { ShipmentDetailsComponent } from '../shipment-details/shipment-details.component';

@Component({
  selector: 'app-barcode-shipment-details',
  templateUrl: './barcode-shipment-details.component.html',
  styleUrls: ['./barcode-shipment-details.component.scss'],
})
export class BarcodeShipmentDetailsComponent implements OnInit {
  shData
  userToken
  shipmentID
  constructor(
    private navParams:NavParams,
    private modalController:ModalController,
    private apiService:ApiService,
    public authService:AuthService
  ) { }

  ngOnInit() {
    this.shData  = this.navParams.get('data')
    this.userToken = this.navParams.get('userToken');
    this.shipmentID = this.navParams.get('shipment_id');

  }
  action;


  statusChanged(action) {
    this.action = action;
  }



  submitAction() {
    if(this.action === 'delivered' || this.action === 'addnote' || this.action === 'discards') {
      this.switchAction(this.action)
    } else {
      this.doAction(this.action)
    }
  }

  openDetails() {
    this.modalController.create({
      component: ShipmentDetailsComponent,
      componentProps: {
        shipment_id: this.shipmentID,
        userToken: this.userToken
      }
    }).then(m => m.present())
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

  async reloadShip() {
    console.log('reloading');
    this.apiService
      .getShipmentDetails(this.shipmentID)
      .subscribe((shipment: any) => {
        this.shData = shipment;
        console.log(this.shData);
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

  closeModal() {
    this.modalController.dismiss();
  }

}

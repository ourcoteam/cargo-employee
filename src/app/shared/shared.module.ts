import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { NewAddressComponent } from '../shared/new-address/new-address.component';

import { NewReceiverComponent } from '../shared/new-receiver/new-receiver.component';

import { ShipmentDetailsComponent } from '../shared/shipment-details/shipment-details.component';

import { ActionComponent } from '../shared/action/action.component';
import { DeliverComponent } from '../shared/actions/deliver/deliver.component';
import { NotesComponent } from '../shared/actions/notes/notes.component';
import { DiscardsComponent } from '../shared/actions/discards/discards.component';

import { ReactiveFormsModule } from '@angular/forms';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { IonicSelectableModule } from 'ionic-selectable';
import { BarcodeShipmentDetailsComponent } from './barcode-shipment-details/barcode-shipment-details.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewAddressComponent,
    ShipmentDetailsComponent,
    NewReceiverComponent,
    ActionComponent,
    DeliverComponent,
    NotesComponent,
    DiscardsComponent,
    BarcodeShipmentDetailsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    IonicSelectableModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    NewAddressComponent,
    ShipmentDetailsComponent,
    NewReceiverComponent,
    ActionComponent,
    DeliverComponent,
    NotesComponent,
    DiscardsComponent,
    BarcodeShipmentDetailsComponent
  ],
  entryComponents: [
    NewAddressComponent,
    ShipmentDetailsComponent,
    NewReceiverComponent,
    ActionComponent,
    DeliverComponent,
    NotesComponent,
    DiscardsComponent,
    BarcodeShipmentDetailsComponent
  ]
})
export class SharedModule {}

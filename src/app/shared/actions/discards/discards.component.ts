import { Component, OnInit } from '@angular/core';
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
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/ui/toast.service';
import { LoadingService } from 'src/app/services/ui/loading.service';

@Component({
  selector: 'app-discards',
  templateUrl: './discards.component.html',
  styleUrls: ['./discards.component.scss']
})
export class DiscardsComponent implements OnInit {
  shipData;
  userToken;

  action;

  discardsForm: FormGroup;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    public apiService: ApiService,
    public locationService: LocationService,
    private navCtrl: NavController,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public _translate: TranslateService,
    public toastUI: ToastService,
    public loadingUI: LoadingService
  ) {
    this.discardsForm = formBuilder.group({
      id: [null, [Validators.required]],
      message: [null, [Validators.required]],
      return_package_fee: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.shipData = this.navParams.get('shipment_data');
    this.userToken = this.navParams.get('userToken');
    this.action = this.navParams.get('action');
    this.discardsForm.patchValue({
      id: this.shipData.id ? this.shipData.id : null
    });
    console.log(this.discardsForm.controls.id.value);
    this.locationService.getMyLocation();
  }

  async closeModal() {
    this.modalController.dismiss();
  }

  async doDiscard() {
    console.log(this.discardsForm.value);
    this.loadingUI.simpleLoading();
    await this.locationService.getMyLocation().then(() => {
      this.apiService
        .postDiscards(
          this.authService.userToken,
          this.discardsForm.value,
          this.locationService.myLat,
          this.locationService.myLng
        )
        .subscribe(
          (res: any) => {
            this.loadingUI.loadingDismiss();
            console.log(res);
            this.toastUI.simpleToast(
              this._translate.instant('actions.discards_success'),
              'success',
              2000
            );
            this.closeModal();
          },
          error => {
            this.loadingUI.loadingDismiss();
            this.toastUI.simpleToast(
              this._translate.instant('actions.discards_failed'),
              'danger',
              2000
            );
            console.log(error);
          }
        );
    });
  }
}

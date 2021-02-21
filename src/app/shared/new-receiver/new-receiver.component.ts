import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  ModalController,
  Platform,
  LoadingController,
  ToastController,
  NavController,
  NavParams
} from '@ionic/angular';
import { ApiService } from '../../services/api.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/services/ui/loading.service';
import { ToastService } from 'src/app/services/ui/toast.service';

@Component({
  selector: 'app-new-receiver',
  templateUrl: './new-receiver.component.html',
  styleUrls: ['./new-receiver.component.scss']
})
export class NewReceiverComponent implements OnInit {
  public userForm: FormGroup;
  constructor(
    public modalController: ModalController,
    private platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private navParams: NavParams,
    public loadingUI: LoadingService,
    public toastUI: ToastService,
    public _translate: TranslateService
  ) {
    this.userForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      mobile: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  ngOnInit() {}

  async closeModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }

  async showCustomToast(message: string, msgColor: string) {
    const toast = await this.toastCtrl.create({
      message,
      color: msgColor,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }

  addUser() {
    this.loadingUI.simpleLoading();
    this.apiService
      .addNewReceiver(this.authService.userToken, this.userForm.value)
      .subscribe(
        (newRec: any) => {
          this.loadingUI.loadingDismiss();
          console.log(newRec);
          this.showCustomToast(
            `${this._translate.instant('new_receiver.new_receiver')} ( ${
              newRec.name
            } ) ${this._translate.instant('general.has_been_added')}`,
            'success'
          );
          this.modalController.dismiss(newRec, 'done');
        },
        error => {
          this.showCustomToast(
            this._translate.instant('general.general_error'),
            'danger'
          );
          this.loadingUI.loadingDismiss();
          console.log(error);
        }
      );
  }
}

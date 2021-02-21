import { Component, OnInit } from '@angular/core';
import {
  Platform,
  LoadingController,
  ToastController,
  NavController
} from '@ionic/angular';
import { ApiService } from '../services/api.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../services/ui/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  deviceToken;

  constructor(
    private platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    public _translate: TranslateService,
    private loadingUI: LoadingService
  ) {
    this.loginForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async ngOnInit() {}

  userLogin() {
    if (this.loginForm.valid) {
      const userData = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      };
      this.loadingUI.simpleLoading();
      this.apiService.loginClient(userData).subscribe(
        (userInfo: any) => {
          // console.log(userInfo);

          if (userInfo && userInfo.token && userInfo.user) {
            this.authService.notificationCount(userInfo.token);
            this.authService.getNotifications(userInfo.token);
            this.authService.doLogin(userInfo).then(() => {});

            setTimeout(() => {
              this.showToast(
                this._translate.instant('general.logged_in_successfully'),
                2000,
                'bottom',
                'success'
              );
            }, 500);
            setTimeout(() => {
              this.loadingUI.loadingDismiss();
              this.navCtrl.navigateRoot('/tabs/home');
            }, 2000);
          }
        },
        error => {
          // console.log(error);
          this.loadingUI.loadingDismiss();
          let errMessage;
          error.statusText = 'Unauthorized'
            ? (errMessage = this._translate.instant(
                'general.username_or_password_not_valid'
              ))
            : (errMessage = error.statusText);
          this.showToast(errMessage, 3000, 'bottom', 'danger');
        }
      );
    } else {
      this.loadingUI.loadingDismiss();
      this.showToast(
        this._translate.instant(
          'general.please_enter_a_valid_username_and_password'
        ),
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
}

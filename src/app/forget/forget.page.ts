import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/ui/toast.service';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../services/ui/loading.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss']
})
export class ForgetPage implements OnInit {
  public passForm: FormGroup;

  constructor(
    public toastUI: ToastService,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    public _translate: TranslateService,
    private loadingUI: LoadingService
  ) {
    this.passForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {}

  doForget() {
    if (this.passForm.valid) {
      const passData = {
        password: this.passForm.get('password').value
      };
      this.loadingUI.simpleLoading();
      this.apiService.forgetPass(passData).subscribe(
        (userInfo: any) => {
          // console.log(userInfo);

          if (userInfo && userInfo.token && userInfo.user) {
            setTimeout(() => {
              this.loadingUI.loadingDismiss();
              this.navCtrl.navigateRoot('/login');
            }, 2000);
          }
        },
        error => {
          // console.log(error);
          this.loadingUI.loadingDismiss();
          this.toastUI.simpleToast(
            this._translate.instant('general.general_error'),
            'danger',
            2000
          );
        }
      );
    } else {
      this.loadingUI.loadingDismiss();
    }
  }
}

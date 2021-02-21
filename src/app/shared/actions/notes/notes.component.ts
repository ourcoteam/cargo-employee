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
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  shipData;
  userToken;

  action;

  noteForm: FormGroup;

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
    this.noteForm = formBuilder.group({
      id: [null, [Validators.required]],
      note: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.shipData = this.navParams.get('shipment_data');
    this.userToken = this.navParams.get('userToken');
    this.action = this.navParams.get('action');
    this.noteForm.patchValue({
      id: this.shipData.id ? this.shipData.id : null
    });
    console.log(this.noteForm.controls.id.value);
  }

  async addNote() {
    console.log(this.noteForm.value);
    this.loadingUI.simpleLoading();
    await this.locationService.getMyLocation();
    await this.apiService
      .addNote(
        this.authService.userToken,
        this.noteForm.value,
        this.locationService.myLat,
        this.locationService.myLng
      )
      .subscribe(
        (res: any) => {
          this.loadingUI.loadingDismiss();
          console.log(res);
          this.toastUI.simpleToast(
            this._translate.instant('actions.note_success'),
            'success',
            2000
          );
          this.closeModal();
        },
        error => {
          this.loadingUI.loadingDismiss();
          console.log(error);
          this.toastUI.simpleToast(
            this._translate.instant('actions.note_failed'),
            'danger',
            2000
          );
        }
      );
  }

  async closeModal() {
    this.modalController.dismiss();
  }
}

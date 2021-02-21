import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(public loadingController: LoadingController) {}

  async simpleLoading() {
    const loading = await this.loadingController.create({
      translucent: true
    });
    await loading.present();
  }

  async loadingDismiss() {
    this.loadingController.dismiss();
  }
}

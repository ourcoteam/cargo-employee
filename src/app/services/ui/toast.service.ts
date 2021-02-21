import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async simpleToast(msg, clr, dur) {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      color: clr
    });
    toast.present();
  }
  async notificationToast(head, msg, clr, dur) {
    const toast = await this.toastController.create({
      header: head,
      message: msg,
      duration: dur,
      color: clr,
      position: 'bottom'
    });
    toast.present();
  }
}

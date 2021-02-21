import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  ModalController,
  ToastController,
  IonInfiniteScroll
} from '@ionic/angular';
import { ShipmentDetailsComponent } from '../shared/shipment-details/shipment-details.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage implements OnInit {
  currPage = 1;
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    private router: Router,
    public modalController: ModalController,
    public _translate: TranslateService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((route: NavigationStart) => {
        // console.log('Route: ', route.url);
        // if (route.url === '/tabs/notifications') {
        //   if (this.authService.isAuthenticated()) {
        //     this.authService.getNotifications(this.authService.userToken);
        //     this.authService.getWallet(this.authService.userToken);
        //   }
        // }
      });
  }

  ngOnInit() {}

  async loadMore(event) {
    if (
      this.authService.notificationsCount.all >
      this.authService.userNotifications.length
    ) {
      this.currPage++;
      this.authService
        .getNotifications(this.authService.userToken, this.currPage)
        .then(() => {
          setTimeout(() => {
            event.target.complete();
          }, 1200);
        });
    } else {
      event.target.complete();
    }
  }

  async reload(event) {
    this.currPage = 1;
    this.authService.notificationCount(this.authService.userToken);
    this.authService
      .getNotifications(this.authService.userToken, this.currPage)
      .then(() => {
        setTimeout(() => {
          event.target.complete();
        }, 1200);
      });
  }

  async shipmentDetail(shipmentID, notificationID) {
    // console.log(shipmentID);
    await this.apiService
      .readNotification(this.authService.userToken, notificationID)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.currPage = 1;
          this.authService.notificationCount(this.authService.userToken);
          this.authService.getNotifications(this.authService.userToken);
        },
        error => {
          console.log(error);
        }
      );
    const modal = await this.modalController.create({
      component: ShipmentDetailsComponent,
      componentProps: {
        shipment_id: shipmentID,
        userToken: this.authService.userToken
      }
    });
    return await modal.present();
  }
}

import { Component } from '@angular/core';

import {
  Platform,
  NavController,
  AlertController,
  ModalController
} from '@ionic/angular';
declare var PubNub;

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import { ApiService } from './services/api.service';

// import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router } from '@angular/router';
import { ToastService } from './services/ui/toast.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { LocationService } from './services/location.service';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationLocationProvider, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _translate: TranslateService,
    private authService: AuthService,
    private storage: Storage,
    private navCtrl: NavController,
    public apiService: ApiService,
    // private oneSignal: OneSignal,
    private fcm: FirebaseX,
    private router: Router,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public toastUI: ToastService,
    private locationService:LocationService,
    private backgroundGeolocation: BackgroundGeolocation,
    private geoLocation:Geolocation
  ) {
    this.initializeApp();
  }

  counter
  async initializeApp() {
    // this.pusher = new Pusher('0d6fc0465e28844f2cd9',{
    //   cluster: 'eu',
    // });

    await this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#2568ef');

      this.isFirstTime();
      this._initTranslate();

      
      // FCM Push Notification
      this.counter = 0
      await this.authService.authState.subscribe(state => {
        console.log('state', state);
        if (state) {
          this.counter+=1;
          if(this.counter == 1) {
            this.initializeBackgroundPosition()
          }
          console.log('counter', this.counter);
          this.authService.returnUserData().then(() => {
            this.fcm.getToken().then(token => {
              console.log(token);
              console.log(this.authService.userToken);
              if (this.authService.authState && this.authService.userToken) {
                this.apiService
                  .postDeviceToken(this.authService.userToken, token)
                  .subscribe(
                    (res: any) => {
                      console.log('Device Token Sent: ', res);
                    },
                    error => {
                      console.log(error);
                    }
                  );
              }
            });
            this.fcm.onTokenRefresh().subscribe(token => {
              console.log(token);
              console.log(this.authService.userToken);
              if (this.authService.authState && this.authService.userToken) {
                this.apiService
                  .postDeviceToken(this.authService.userToken, token)
                  .subscribe(
                    (res: any) => {
                      console.log('Device Token Sent: ', res);
                    },
                    error => {
                      console.log(error);
                    }
                  );
              }
            });
          });
        } else {
          this.counter = 0;
          this.backgroundGeolocation.stop();
          // disable background;
          // disconnect Pusher
        }
      });

      // this.fcm.onNotification().subscribe(data => {
      //   console.log(data);
      //   if (data.wasTapped) {
      //     console.log('Received in background');
      //     // this.router.navigate([data.landing_page, data.price]);
      //   } else {
      //     console.log('Received in foreground');
      //     // this.router.navigate([data.landing_page, data.price]);
      //   }
      // });

      // End FCM Push Notifications

      this.platform.backButton.subscribe(async () => {
        console.log(this.router.url);
        console.log(this.router.isActive('/tabs/home', true));
        const isModalOpened = await this.modalController.getTop();
        console.log(isModalOpened);

        if (
          (this.router.isActive('/tabs/home', true) &&
            this.router.url === '/tabs/home' &&
            !isModalOpened) ||
          (this.router.isActive('/login', true) &&
            this.router.url === '/login' &&
            !isModalOpened)
        ) {
          const alert = await this.alertCtrl.create({
            header: this._translate.instant('general.exit_app'),
            buttons: [
              {
                text: this._translate.instant('general.no'),
                role: 'cancel'
              },
              {
                text: this._translate.instant('general.yes'),
                handler: () => {
                  (navigator as any).app.exitApp();
                }
              }
            ]
          });

          await alert.present();
        } else {
          const url = this.router.url;
          if (url.match('(^/[a-zA-Z0-9-.]*)$')) {
          } else {
            this.navCtrl.navigateBack(
              url.replace(new RegExp('(/([a-zA-Z0-9-.])*)$'), '')
            );
          }
        }
      });

      // this.oneSignal.startInit(
      //   '99dd0bfa-eb28-4c83-95d9-526ab3dd50a1',
      //   '430922230075'
      // );

      // this.oneSignal.inFocusDisplaying(
      //   this.oneSignal.OSInFocusDisplayOption.None
      // );

      // this.oneSignal.handleNotificationReceived().subscribe(data => {
      //   // do something when notification is received
      //   this.handleNotify(data);
      //   console.log('In NotificationReceived');
      //   this.authService.reloadNotifications(this.authService.userToken);
      //   this.authService.getNotifications(this.authService.userToken);
      // });

      // this.oneSignal.handleNotificationOpened().subscribe(data => {
      //   // do something when a notification is opened
      //   this.handleNotify(data);

      //   this.authService.getNotifications(this.authService.userToken);
      // });

      // this.oneSignal.endInit();

      // this.authService.getDeviceToken();
    });
    this.splashScreen.hide();
  }

  // pusher:Pusher;

  initializeBackgroundPosition() {
     // // this.geoLocation.watchPosition({}).subscribe(position => {
     // //   console.log(position)
     // // })

    // let pubnub = new PubNub({
    //   publishKey : "pub-c-a9cdcfa1-332b-47ff-a245-83b8095af5c3",
    //   subscribeKey : "sub-c-82204506-fdaf-11ea-ae2d-56dc81df9fb5",
    //   uuid: "sec-c-MjAwMDBhYjQtYTNlZC00MWU3LTg0MDAtYmViNGU3ODgwYTFk"
    // })
    


    // const config: BackgroundGeolocationConfig = {
    //   notificationsEnabled: false,
    //   debug: false, //  enable this hear sounds for background-geolocation life-cycle.
    //   stopOnTerminate: false,
    //   interval:1000,
    //   startForeground:true,
    //   saveBatteryOnBackground:true,
    //   desiredAccuracy: 10,
    //   stationaryRadius: 50,
    //   distanceFilter: 50,
    // };

    // this.backgroundGeolocation.configure(config)
    // .then(() => {

    //   this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
    //   console.log('background location', location);
    //   // this.pusher.send_event('updateLocation', location, this.authService.userData.id )


    //     let publishPayload = {
    //       channel : this.authService.userData.id,
    //       message: location
    //     }
    //     pubnub.publish(publishPayload)
    //     localStorage.setItem('' +location.time, JSON.stringify(location))

    //     alert(`lat=${location.latitude}  lng=${location.longitude}, time=${new Date(location.time)}`)

    //     // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    //     // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
    //     // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
    //     if(this.platform.is('ios')) this.backgroundGeolocation.finish(); // FOR IOS ONLY
    //   });

    // });

    // this.backgroundGeolocation.start();

   
  }

  async handleNotify(notification) {
    const msg = notification.payload.body;
    const title = notification.payload.title;
    this.toastUI.notificationToast(title, msg, 'dark', 2000);
  }

  private async _initTranslate() {
    // Set the default language for translation strings, and the current language.
    await this.authService.ifLoggedIn().then(res => {
      if (this.authService.isAuthenticated()) {
        this.authService.returnUserData().then(async userData => {
          // console.log(userData);
          this._translate.setDefaultLang(userData.user.language);
          // console.log(this._translate.langs);
          // console.log(userData.user.language);
          document.documentElement.lang = userData.user.language;
          this.apiService.defaultLang = userData.user.language;
          await this.authService.notificationCount(userData.token);
          await this.authService.getNotifications(userData.token);
          await this.authService.getWallet(userData.token);
        });
      } else {
        document.documentElement.lang = 'en';
        this._translate.setDefaultLang('en');
      }
    });

    // if (this._translate.getBrowserLang() !== undefined) {
    //   this._translate.use(this._translate.getBrowserLang());
    // } else {
    //   this._translate.use('en'); // Set your language here
    // }
  }

  async isFirstTime() {
    await this.authService.ifLoggedIn();
    if (this.authService.isAuthenticated()) {
      await this.navCtrl.navigateRoot('/tabs/home');
    } else {
      await this.navCtrl.navigateRoot('/login');
    }
  }
}

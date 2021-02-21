import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher:any;

  notificationPusher:any;
  public privateChatMesseges:any;
  public privateNotificationMesseges:any;
  constructor(
    ) {
    // this.initializeChatPusher();
  }

  initializeChatPusher(){
    this.pusher = new Pusher('0d6fc0465e28844f2cd9',{
      cluster: 'eu',
    });
  }

}

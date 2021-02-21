import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  myLocation;
  myLat;
  myLng;

  constructor(private geolocation: Geolocation) {
    this.getMyLocation();
  }

  async getMyLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.myLocation = resp.coords;
        this.myLat = resp.coords.latitude;
        this.myLng = resp.coords.longitude;
        // console.log(
        //   'My Location: ' +
        //     this.myLocation +
        //     ' - Lat: ' +
        //     this.myLat +
        //     ' - Lng: ' +
        //     this.myLng
        // );
      })
      .catch(error => {
        console.log('Error getting location', error);
        this.geolocation
        .getCurrentPosition().then((resp) => {
          this.myLocation = resp.coords;
          this.myLat = resp.coords.latitude;
          this.myLng = resp.coords.longitude;
        })
      });
  }
}

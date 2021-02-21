import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackgroundGeolocationConfig, BackgroundGeolocation, BackgroundGeolocationEvents, BackgroundGeolocationResponse, BackgroundGeolocationCurrentPositionConfig } from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, Marker, MarkerClusterIcon, MarkerClusterOptions, MarkerOptions } from '@ionic-native/google-maps';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.page.html',
  styleUrls: ['./shipment-details.page.scss'],
})
export class ShipmentDetailsPage implements OnInit, AfterViewInit {
  @ViewChild('map_canvas', { static: false }) mapCanvas: ElementRef;

  constructor(
    private backgroundGeolocation:BackgroundGeolocation,
    private geolocation:Geolocation
  ) { }

  ngAfterViewInit(): void {
  
  }

  lat;
  long
  ngOnInit() {
   
  }

  map:GoogleMap
  ionViewWillEnter() {
    console.log('entriee')
    this.geolocation.getCurrentPosition().then(coords => {
      console.log('coords', coords)
      this.lat = coords.coords.latitude
      this.long = coords.coords.longitude;
      this.loadMap()
    })

    // setInterval(() => {
    //   this.geolocation.getCurrentPosition().then(coords => {
    //     console.log('coords', coords)
    //     this.fetchDate(coords.coords.latitude, coords.coords.longitude, true)
    //   })
    // }, 5000)

  }

  ionViewWillLeave() {
    this.backgroundGeolocation.stop();

  }
  loadMap() {
    this.map = GoogleMaps.create(this.mapCanvas.nativeElement, {
      camera: {
        target: {
          lat: this.lat,
          lng: this.long
        },
        zoom: 10,
        
      }
    });

    
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(e => {
      let option:MarkerOptions = {
        position:{
          lat: this.lat,
          lng: this.long
        }
      }
      this.map.addMarker(option)
      this.initializeBackgroundPosition()
    })
  }

  fetchDate(lat, lng, draw = false) {
    this.map.clear();
    this.map.animateCamera({
      target: {
        lat,
        lng,
      },
      zoom: 15,
      tilt: 30
    });
    let option:MarkerOptions = {
      position:{
        lat: this.lat,
        lng: this.long
      }
    }
    this.map.addMarker(option)

    if(draw) {
      let icon:MarkerClusterIcon = {
        url:'assets/img/marker_delivery.svg', min:10, max:7
      }
      let opts:MarkerClusterOptions = {
        markers: [option],
        icons:[icon]
      } 
      this.map.addMarkerCluster(opts)
    }
    
  }


  initializeBackgroundPosition() {
    // this.geoLocation.watchPosition({}).subscribe(position => {
    //   console.log(position)
    // })

    const config: BackgroundGeolocationConfig = {
      notificationsEnabled: false,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false,
      // interval:1000,
      startForeground:true,
      saveBatteryOnBackground:true,
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
    };

    this.backgroundGeolocation.configure(config)
    .then(() => {

      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
      console.log('background location', location);
      // this.pusher.send_event('updateLocation', location, this.authService.userData.id )

        this.fetchDate(location.latitude, location.longitude, true)
        alert(`lat=${location.latitude}  lng=${location.longitude}, time=${new Date(location.time)}`)

        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        // if(this.platform.is('ios')) this.backgroundGeolocation.finish(); // FOR IOS ONLY
      });

    });

    this.backgroundGeolocation.start();

   
  }

}

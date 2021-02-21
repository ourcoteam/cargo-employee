(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shipment-details-shipment-details-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/shipment-details/shipment-details.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shipment-details/shipment-details.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>shipmentDetails</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"io-padding\">\n  <div id=\"map_canvas\" #map_canvas></div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/shipment-details/shipment-details.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/shipment-details/shipment-details.module.ts ***!
  \*************************************************************/
/*! exports provided: ShipmentDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipmentDetailsPageModule", function() { return ShipmentDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shipment_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shipment-details.page */ "./src/app/shipment-details/shipment-details.page.ts");







var routes = [
    {
        path: '',
        component: _shipment_details_page__WEBPACK_IMPORTED_MODULE_6__["ShipmentDetailsPage"]
    }
];
var ShipmentDetailsPageModule = /** @class */ (function () {
    function ShipmentDetailsPageModule() {
    }
    ShipmentDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_shipment_details_page__WEBPACK_IMPORTED_MODULE_6__["ShipmentDetailsPage"]]
        })
    ], ShipmentDetailsPageModule);
    return ShipmentDetailsPageModule;
}());



/***/ }),

/***/ "./src/app/shipment-details/shipment-details.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/shipment-details/shipment-details.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#map_canvas {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcG90bGF5ZXIvRG93bmxvYWRzL2NhcmdvLWVtcGxveWVlL3NyYy9hcHAvc2hpcG1lbnQtZGV0YWlscy9zaGlwbWVudC1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvc2hpcG1lbnQtZGV0YWlscy9zaGlwbWVudC1kZXRhaWxzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9zaGlwbWVudC1kZXRhaWxzL3NoaXBtZW50LWRldGFpbHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI21hcF9jYW52YXMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbn0iLCIjbWFwX2NhbnZhcyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/shipment-details/shipment-details.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/shipment-details/shipment-details.page.ts ***!
  \***********************************************************/
/*! exports provided: ShipmentDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipmentDetailsPage", function() { return ShipmentDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_background_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/background-geolocation/ngx */ "./node_modules/@ionic-native/background-geolocation/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/google-maps */ "./node_modules/@ionic-native/google-maps/index.js");





var ShipmentDetailsPage = /** @class */ (function () {
    function ShipmentDetailsPage(backgroundGeolocation, geolocation) {
        this.backgroundGeolocation = backgroundGeolocation;
        this.geolocation = geolocation;
    }
    ShipmentDetailsPage.prototype.ngAfterViewInit = function () {
    };
    ShipmentDetailsPage.prototype.ngOnInit = function () {
    };
    ShipmentDetailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('entriee');
        this.geolocation.getCurrentPosition().then(function (coords) {
            console.log('coords', coords);
            _this.lat = coords.coords.latitude;
            _this.long = coords.coords.longitude;
            _this.loadMap();
        });
        // setInterval(() => {
        //   this.geolocation.getCurrentPosition().then(coords => {
        //     console.log('coords', coords)
        //     this.fetchDate(coords.coords.latitude, coords.coords.longitude, true)
        //   })
        // }, 5000)
    };
    ShipmentDetailsPage.prototype.ionViewWillLeave = function () {
        this.backgroundGeolocation.stop();
    };
    ShipmentDetailsPage.prototype.loadMap = function () {
        var _this = this;
        this.map = _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_4__["GoogleMaps"].create(this.mapCanvas.nativeElement, {
            camera: {
                target: {
                    lat: this.lat,
                    lng: this.long
                },
                zoom: 10,
            }
        });
        this.map.on(_ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_4__["GoogleMapsEvent"].MAP_READY).subscribe(function (e) {
            var option = {
                position: {
                    lat: _this.lat,
                    lng: _this.long
                }
            };
            _this.map.addMarker(option);
            _this.initializeBackgroundPosition();
        });
    };
    ShipmentDetailsPage.prototype.fetchDate = function (lat, lng, draw) {
        if (draw === void 0) { draw = false; }
        this.map.clear();
        this.map.animateCamera({
            target: {
                lat: lat,
                lng: lng,
            },
            zoom: 15,
            tilt: 30
        });
        var option = {
            position: {
                lat: this.lat,
                lng: this.long
            }
        };
        this.map.addMarker(option);
        if (draw) {
            var icon = {
                url: 'assets/img/marker_delivery.svg', min: 10, max: 7
            };
            var opts = {
                markers: [option],
                icons: [icon]
            };
            this.map.addMarkerCluster(opts);
        }
    };
    ShipmentDetailsPage.prototype.initializeBackgroundPosition = function () {
        // this.geoLocation.watchPosition({}).subscribe(position => {
        //   console.log(position)
        // })
        var _this = this;
        var config = {
            notificationsEnabled: false,
            debug: false,
            stopOnTerminate: false,
            // interval:1000,
            startForeground: true,
            saveBatteryOnBackground: true,
            desiredAccuracy: 10,
            stationaryRadius: 50,
            distanceFilter: 50,
        };
        this.backgroundGeolocation.configure(config)
            .then(function () {
            _this.backgroundGeolocation.on(_ionic_native_background_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__["BackgroundGeolocationEvents"].location).subscribe(function (location) {
                console.log('background location', location);
                // this.pusher.send_event('updateLocation', location, this.authService.userData.id )
                _this.fetchDate(location.latitude, location.longitude, true);
                alert("lat=" + location.latitude + "  lng=" + location.longitude + ", time=" + new Date(location.time));
                // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
                // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                // if(this.platform.is('ios')) this.backgroundGeolocation.finish(); // FOR IOS ONLY
            });
        });
        this.backgroundGeolocation.start();
    };
    ShipmentDetailsPage.ctorParameters = function () { return [
        { type: _ionic_native_background_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__["BackgroundGeolocation"] },
        { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__["Geolocation"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map_canvas', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ShipmentDetailsPage.prototype, "mapCanvas", void 0);
    ShipmentDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-shipment-details',
            template: __webpack_require__(/*! raw-loader!./shipment-details.page.html */ "./node_modules/raw-loader/index.js!./src/app/shipment-details/shipment-details.page.html"),
            styles: [__webpack_require__(/*! ./shipment-details.page.scss */ "./src/app/shipment-details/shipment-details.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_background_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__["BackgroundGeolocation"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__["Geolocation"]])
    ], ShipmentDetailsPage);
    return ShipmentDetailsPage;
}());



/***/ })

}]);
//# sourceMappingURL=shipment-details-shipment-details-module-es5.js.map
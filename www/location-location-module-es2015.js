(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["location-location-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/location/location.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/location/location.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"bg-header\">\n    <ion-toolbar *ngIf=\"authService.isAuthenticated()\">\n        <ion-button color=\"light\" fill=\"clear\" routerLink=\"/tabs/profile\" routerDirection=\"forward\" slot=\"end\">\n            <ion-icon name=\"wallet\" slot=\"end\"></ion-icon>\n            <ion-badge slot=\"start\">{{authService.userWallet?.wallet > 0 ? authService.userWallet?.wallet : 0}}</ion-badge>\n        </ion-button>\n        <ion-title>\n            <ion-img src=\"/assets/img/home_logo_small.svg\" class=\"header-logo\"></ion-img>\n        </ion-title>\n        <ion-button color=\"light\" fill=\"clear\" routerLink=\"/tabs/notifications\" routerDirection=\"forward\" slot=\"start\">\n            <ion-icon name=\"notifications\" slot=\"start\"></ion-icon>\n            <ion-badge slot=\"end\">{{authService.notificationsCount?.unreaded > 0 ? authService.notificationsCount?.unreaded : 0}}</ion-badge>\n        </ion-button>\n    </ion-toolbar>\n    <h6 class=\"emp-name ion-text-center\">\n        {{_translate.instant('tabs.location')}}\n    </h6>\n</ion-header>\n\n<ion-content class=\"io-padding\">\n    <div id=\"map_canvas\" #map_canvas>\n        <ion-img src=\"/assets/img/marker_delivery.svg\" [ngClass]=\"mapDragging ? 'map-marker dragging' : 'map-marker'\" id=\"DummyMarker\"></ion-img>\n    </div>\n</ion-content>\n<ion-footer class=\"has-action\">\n    <ion-button class=\"btn-full btn-gradient\" expand=\"block\" round strong [disabled]=\"!lat || !lng\" (click)=\"updateLocation()\">\n        {{ _translate.instant('general.update_my_location') }}\n    </ion-button>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/location/location.module.ts":
/*!*********************************************!*\
  !*** ./src/app/location/location.module.ts ***!
  \*********************************************/
/*! exports provided: LocationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationPageModule", function() { return LocationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _location_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./location.page */ "./src/app/location/location.page.ts");







const routes = [
    {
        path: '',
        component: _location_page__WEBPACK_IMPORTED_MODULE_6__["LocationPage"]
    }
];
let LocationPageModule = class LocationPageModule {
};
LocationPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_location_page__WEBPACK_IMPORTED_MODULE_6__["LocationPage"]]
    })
], LocationPageModule);



/***/ }),

/***/ "./src/app/location/location.page.scss":
/*!*********************************************!*\
  !*** ./src/app/location/location.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#map_canvas {\n  width: 90%;\n  height: 93%;\n  border-radius: 15px;\n  z-index: 999999;\n  margin: 5%;\n}\n#map_canvas ion-img.map-marker {\n  max-width: 60px;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%) scale(1);\n          transform: translate(-50%, -50%) scale(1);\n  opacity: 1;\n  -webkit-transition: all 0.2s;\n  transition: all 0.2s;\n}\n#map_canvas ion-img.map-marker.dragging {\n  -webkit-transform: translate(-50%, -50%) scale(1.1);\n          transform: translate(-50%, -50%) scale(1.1);\n  opacity: 0.5;\n}\n#map_canvas ion-button.map-btn {\n  position: absolute;\n  z-index: 2;\n  border-radius: 15px;\n  --border-radius: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcG90bGF5ZXIvRG93bmxvYWRzL2NhcmdvLWVtcGxveWVlL3NyYy9hcHAvbG9jYXRpb24vbG9jYXRpb24ucGFnZS5zY3NzIiwic3JjL2FwcC9sb2NhdGlvbi9sb2NhdGlvbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxVQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7QUNDSjtBREFJO0VBQ0ksZUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsaURBQUE7VUFBQSx5Q0FBQTtFQUNBLFVBQUE7RUFDQSw0QkFBQTtFQUFBLG9CQUFBO0FDRVI7QUREUTtFQUNJLG1EQUFBO1VBQUEsMkNBQUE7RUFDQSxZQUFBO0FDR1o7QURBSTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7QUNFUiIsImZpbGUiOiJzcmMvYXBwL2xvY2F0aW9uL2xvY2F0aW9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNtYXBfY2FudmFzIHtcbiAgICB3aWR0aDogOTAlO1xuICAgIGhlaWdodDogOTMlO1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgei1pbmRleDogOTk5OTk5O1xuICAgIG1hcmdpbjogNSU7XG4gICAgaW9uLWltZy5tYXAtbWFya2VyIHtcbiAgICAgICAgbWF4LXdpZHRoOiA2MHB4O1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG4gICAgICAgICYuZHJhZ2dpbmcge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMS4xKTtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpb24tYnV0dG9uLm1hcC1idG4ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICAgIC0tYm9yZGVyLXJhZGl1czogMTVweDtcbiAgICB9XG59IiwiI21hcF9jYW52YXMge1xuICB3aWR0aDogOTAlO1xuICBoZWlnaHQ6IDkzJTtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgei1pbmRleDogOTk5OTk5O1xuICBtYXJnaW46IDUlO1xufVxuI21hcF9jYW52YXMgaW9uLWltZy5tYXAtbWFya2VyIHtcbiAgbWF4LXdpZHRoOiA2MHB4O1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcbiAgb3BhY2l0eTogMTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG59XG4jbWFwX2NhbnZhcyBpb24taW1nLm1hcC1tYXJrZXIuZHJhZ2dpbmcge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxLjEpO1xuICBvcGFjaXR5OiAwLjU7XG59XG4jbWFwX2NhbnZhcyBpb24tYnV0dG9uLm1hcC1idG4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDI7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIC0tYm9yZGVyLXJhZGl1czogMTVweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/location/location.page.ts":
/*!*******************************************!*\
  !*** ./src/app/location/location.page.ts ***!
  \*******************************************/
/*! exports provided: LocationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationPage", function() { return LocationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _services_ui_toast_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/ui/toast.service */ "./src/app/services/ui/toast.service.ts");
/* harmony import */ var _services_location_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/location.service */ "./src/app/services/location.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/google-maps */ "./node_modules/@ionic-native/google-maps/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");










let LocationPage = class LocationPage {
    constructor(authService, apiService, locationService, router, loadingCtrl, _translate, toastService) {
        this.authService = authService;
        this.apiService = apiService;
        this.locationService = locationService;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this._translate = _translate;
        this.toastService = toastService;
        this.mapDragging = false;
    }
    ngOnInit() { }
    ionViewDidEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.loadMap().then(() => {
                const location = this.map.getCameraTarget();
                console.log('Your Location is : ' + location.lat + ',' + location.lng);
                console.log(this.lat);
                console.log(this.lng);
            });
        });
    }
    ionViewWillLeave() {
        const nodeList = document.querySelectorAll('._gmaps_cdv_');
        for (let k = 0; k < nodeList.length; ++k) {
            nodeList.item(k).classList.remove('_gmaps_cdv_');
        }
    }
    ionViewDidLeave() {
        this.map.remove();
    }
    loadMap() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_8__["Environment"].setEnv({
                API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDvYLf1yswB12mE2qGDxDmlBJOF_Su-CCs',
                API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDvYLf1yswB12mE2qGDxDmlBJOF_Su-CCs'
            });
            this.map = _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_8__["GoogleMaps"].create(this.mapCanvas.nativeElement, {
                controls: {
                    compass: false,
                    myLocation: false,
                    myLocationButton: false,
                    mapToolbar: false,
                    zoom: false
                },
                gestures: {
                    scroll: false,
                    tilt: false,
                    zoom: false,
                    rotate: false
                },
                camera: {
                    target: {
                        lat: 31.032260599999997,
                        lng: 31.36069329999998
                    },
                    zoom: 2
                }
            });
            yield this.map.getMyLocation().then((location) => {
                // console.log(JSON.stringify(location, null, 2));
                // Move the map camera to the location with animation
                this.map.animateCamera({
                    target: location.latLng,
                    zoom: 19,
                    duration: 400
                });
                const myLocation = this.map.getCameraTarget();
                setTimeout(() => {
                    this.lat = myLocation.lat;
                    this.lng = myLocation.lng;
                    console.log(this.lat);
                    console.log(this.lng);
                }, 800);
            });
            // this.map
            // .addEventListener(GoogleMapsEvent.CAMERA_MOVE_START)
            // .subscribe(data => {});
            this.map
                .addEventListener(_ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_8__["GoogleMapsEvent"].CAMERA_MOVE_END)
                .subscribe(data => {
                const location = this.map.getCameraTarget();
                this.lat = location.lat;
                this.lng = location.lng;
                console.log(this.lat);
                console.log(this.lng);
            });
            this.map.setAllGesturesEnabled(false);
            this.map.setClickable(false);
        });
    }
    getCurrentLocation() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.map.clear();
            this.loading = yield this.loadingCtrl.create({
                message: this._translate.instant('general.please_wait')
            });
            yield this.loading.present();
            // Get the location of you
            yield this.map
                .getMyLocation()
                .then((location) => {
                this.loading.dismiss();
                // console.log(JSON.stringify(location, null, 2));
                // Move the map camera to the location with animation
                this.map.animateCamera({
                    target: location.latLng,
                    zoom: 17,
                    tilt: 30
                });
            })
                .catch(err => {
                this.loading.dismiss();
                console.log('PROBLEM IS FOUND');
                console.log(err.error_message);
                this.toastService.simpleToast(this._translate.instant('general.enable_location_from_settings_first'), 'danger', 2000);
            });
            yield this.locationService.getMyLocation();
        });
    }
    updateLocation() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingCtrl.create({
                message: this._translate.instant('general.please_wait')
            });
            yield this.loading.present();
            yield this.locationService.getMyLocation().then(() => {
                this.apiService
                    .updateLocation(this.authService.userToken, this.locationService.myLat, this.locationService.myLng)
                    .subscribe((res) => {
                    console.log(res);
                    this.loading.dismiss();
                    if (res.success === 'ok') {
                        this.toastService.simpleToast(this._translate.instant('general.update_location_success'), 'success', 2000);
                    }
                }, error => {
                    console.log(error);
                    this.loading.dismiss();
                    this.toastService.simpleToast(this._translate.instant('general.update_location_faild'), 'danger', 2500);
                });
            });
        });
    }
};
LocationPage.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"] },
    { type: _services_location_service__WEBPACK_IMPORTED_MODULE_5__["LocationService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["LoadingController"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] },
    { type: _services_ui_toast_service__WEBPACK_IMPORTED_MODULE_4__["ToastService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map_canvas', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], LocationPage.prototype, "mapCanvas", void 0);
LocationPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-location',
        template: __webpack_require__(/*! raw-loader!./location.page.html */ "./node_modules/raw-loader/index.js!./src/app/location/location.page.html"),
        styles: [__webpack_require__(/*! ./location.page.scss */ "./src/app/location/location.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
        _services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"],
        _services_location_service__WEBPACK_IMPORTED_MODULE_5__["LocationService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["LoadingController"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"],
        _services_ui_toast_service__WEBPACK_IMPORTED_MODULE_4__["ToastService"]])
], LocationPage);



/***/ })

}]);
//# sourceMappingURL=location-location-module-es2015.js.map
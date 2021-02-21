(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["register-register-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/register/register.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/register/register.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"has-elements\">\n    <ion-toolbar>\n        <ion-img src=\"/assets/img/logo.svg\" slot=\"start\" class=\"header-icon\"></ion-img>\n        <ion-title>{{_translate.instant('register.create_account')}}</ion-title>\n        <ion-button color=\"primary\" size=\"small\" fill=\"clear\" slot=\"end\" routerLink=\"/login\" routerDirection=\"back\">\n            {{_translate.instant('register.log_in')}}\n        </ion-button>\n    </ion-toolbar>\n    <ion-progress-bar color=\"primary\" [value]=\"progress\"></ion-progress-bar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n    <ion-slides pager=\"false\" #stepSlider class=\"step-slider\" [options]=\"slideOpts\">\n        <ion-slide>\n            <div class=\"form-holder register-form\">\n                <form [formGroup]=\"userInfoForm\">\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.name')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-input formControlName=\"name\" type=\"text\"> </ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.mobile')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-input formControlName=\"mobile\" type=\"tel\"> </ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.email')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-input #inputEmail formControlName=\"email\" type=\"email\">\n                        </ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.username')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-input formControlName=\"username\" type=\"text\"> </ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.password')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-input formControlName=\"password\" type=\"password\"> </ion-input>\n                    </ion-item>\n                </form>\n            </div>\n        </ion-slide>\n        <ion-slide>\n            <div class=\"form-holder register-form\">\n                <form [formGroup]=\"addressInfoForm\">\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.address_name')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-input formControlName=\"address_name\" type=\"text\"> </ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.country')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-select formControlName=\"country_id\" placeholder=\"Select Country\" interface=\"action-sheet\" (ionChange)=\"getRegions()\" [disabled]=\"!countries\">\n                            <ion-select-option *ngFor=\"let country of countries\" [value]=\"country.id\">{{country.name}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.state_region')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-select formControlName=\"state_id\" placeholder=\"Select State/Region\" interface=\"action-sheet\" (ionChange)=\"getCities()\" [disabled]=\"!regions\">\n                            <ion-select-option *ngFor=\"let region of regions\" [value]=\"region.id\">{{region.name}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.city')}}\n                            <ion-text> * </ion-text>\n                        </ion-label>\n                        <ion-select formControlName=\"city_id\" placeholder=\"Select City\" interface=\"action-sheet\" (ionChange)=\"getAreas()\" [disabled]=\"!cities\">\n                            <ion-select-option *ngFor=\"let city of cities\" [value]=\"city.id\">{{city.name}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.area')}}\n                        </ion-label>\n                        <ion-select formControlName=\"area_id\" placeholder=\"Select Area\" interface=\"action-sheet\" [disabled]=\"!areas\">\n                            <ion-select-option *ngFor=\"let area of areas\" [value]=\"area.id\">{{area.name}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">\n                            {{_translate.instant('general.postal_code')}}\n                        </ion-label>\n                        <ion-input formControlName=\"postal_code\" type=\"num\"> </ion-input>\n                    </ion-item>\n                </form>\n            </div>\n        </ion-slide>\n        <ion-slide class=\"has-map\">\n            <ion-button color=\"dark\" (click)=\"getCurrentLocation()\" class=\"map-btn\">\n                <ion-icon name=\"locate\" slot=\"start\"></ion-icon>\n                {{_translate.instant('general.my_current_location')}}\n            </ion-button>\n            <div id=\"map_canvas\">\n                <!-- <ion-button ion-button (click)=\"onButtonClick()\">Demo</ion-button> -->\n                <ion-img src=\"/assets/img/marker.svg\" class=\"map-marker\" id=\"DummyMarker\" *ngIf=\"step == 3\"></ion-img>\n            </div>\n        </ion-slide>\n        <ion-slide class=\"success\">\n            <div class=\"success-content\">\n                <ion-img src=\"/assets/img/success_logo.svg\"></ion-img>\n                <p>\n                    {{_translate.instant('register.you_have_successfully_created_your')}}\n                    <b> {{_translate.instant('register.account')}}</b>\n                </p>\n                <!-- <p>You will be redirected</p> -->\n                <!-- <ion-button class=\"btn-full btn-gradient\" expand=\"block\" round strong>\n          Login Now\n        </ion-button> -->\n            </div>\n        </ion-slide>\n    </ion-slides>\n</ion-content>\n<ion-footer class=\"has-action\">\n    <ion-button class=\"btn-full btn-gradient\" expand=\"block\" round strong (click)=\"nextStep()\">\n        {{_translate.instant('general.next')}}\n    </ion-button>\n</ion-footer>"

/***/ }),

/***/ "./src/app/register/register.module.ts":
/*!*********************************************!*\
  !*** ./src/app/register/register.module.ts ***!
  \*********************************************/
/*! exports provided: RegisterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./register.page */ "./src/app/register/register.page.ts");








const routes = [
    {
        path: '',
        component: _register_page__WEBPACK_IMPORTED_MODULE_6__["RegisterPage"]
    }
];
let RegisterPageModule = class RegisterPageModule {
};
RegisterPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_register_page__WEBPACK_IMPORTED_MODULE_6__["RegisterPage"]]
    })
], RegisterPageModule);



/***/ }),

/***/ "./src/app/register/register.page.scss":
/*!*********************************************!*\
  !*** ./src/app/register/register.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#map_canvas {\n  width: 100%;\n  height: 76vh;\n  min-height: 500px;\n  border-radius: 15px;\n}\n#map_canvas ion-img.map-marker {\n  max-width: 80px;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%) scale(1);\n          transform: translate(-50%, -50%) scale(1);\n  opacity: 1;\n  -webkit-transition: all 0.2s;\n  transition: all 0.2s;\n}\n#map_canvas ion-img.map-marker.dragging {\n  -webkit-transform: translate(-50%, -50%) scale(1.1);\n          transform: translate(-50%, -50%) scale(1.1);\n  opacity: 0.5;\n}\nion-slide.success {\n  height: 78vh;\n}\nion-slide.success .success-content {\n  text-align: center;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 0 20px;\n  line-height: 1.8em;\n}\nion-slide.has-map {\n  height: 78vh !important;\n}\nion-slide.has-map ion-button.map-btn {\n  position: absolute;\n  width: 95%;\n  top: 15px;\n  z-index: 2;\n  border-radius: 15px;\n  --border-radius: 15px;\n  height: 45px;\n}\nion-content {\n  background-color: #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcG90bGF5ZXIvRG93bmxvYWRzL2NhcmdvLWVtcGxveWVlL3NyYy9hcHAvcmVnaXN0ZXIvcmVnaXN0ZXIucGFnZS5zY3NzIiwic3JjL2FwcC9yZWdpc3Rlci9yZWdpc3Rlci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUNDSjtBREFJO0VBQ0ksZUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsaURBQUE7VUFBQSx5Q0FBQTtFQUNBLFVBQUE7RUFDQSw0QkFBQTtFQUFBLG9CQUFBO0FDRVI7QUREUTtFQUNJLG1EQUFBO1VBQUEsMkNBQUE7RUFDQSxZQUFBO0FDR1o7QURFQTtFQUNJLFlBQUE7QUNDSjtBREFJO0VBQ0ksa0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDRVI7QURFQTtFQUNJLHVCQUFBO0FDQ0o7QURBSTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7QUNFUjtBREVBO0VBQ0ksc0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lzdGVyL3JlZ2lzdGVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNtYXBfY2FudmFzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDc2dmg7XG4gICAgbWluLWhlaWdodDogNTAwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgICBpb24taW1nLm1hcC1tYXJrZXIge1xuICAgICAgICBtYXgtd2lkdGg6IDgwcHg7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbiAgICAgICAgJi5kcmFnZ2luZyB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxLjEpO1xuICAgICAgICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5pb24tc2xpZGUuc3VjY2VzcyB7XG4gICAgaGVpZ2h0OiA3OHZoO1xuICAgIC5zdWNjZXNzLWNvbnRlbnQge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IDAgMjBweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuOGVtO1xuICAgIH1cbn1cblxuaW9uLXNsaWRlLmhhcy1tYXAge1xuICAgIGhlaWdodDogNzh2aCAhaW1wb3J0YW50O1xuICAgIGlvbi1idXR0b24ubWFwLWJ0biB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDk1JTtcbiAgICAgICAgdG9wOiAxNXB4O1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgICAgICAtLWJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICAgIGhlaWdodDogNDVweDtcbiAgICB9XG59XG5cbmlvbi1jb250ZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufSIsIiNtYXBfY2FudmFzIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNzZ2aDtcbiAgbWluLWhlaWdodDogNTAwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG59XG4jbWFwX2NhbnZhcyBpb24taW1nLm1hcC1tYXJrZXIge1xuICBtYXgtd2lkdGg6IDgwcHg7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpO1xuICBvcGFjaXR5OiAxO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbn1cbiNtYXBfY2FudmFzIGlvbi1pbWcubWFwLW1hcmtlci5kcmFnZ2luZyB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEuMSk7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuaW9uLXNsaWRlLnN1Y2Nlc3Mge1xuICBoZWlnaHQ6IDc4dmg7XG59XG5pb24tc2xpZGUuc3VjY2VzcyAuc3VjY2Vzcy1jb250ZW50IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwIDIwcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjhlbTtcbn1cblxuaW9uLXNsaWRlLmhhcy1tYXAge1xuICBoZWlnaHQ6IDc4dmggIWltcG9ydGFudDtcbn1cbmlvbi1zbGlkZS5oYXMtbWFwIGlvbi1idXR0b24ubWFwLWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDk1JTtcbiAgdG9wOiAxNXB4O1xuICB6LWluZGV4OiAyO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAtLWJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGhlaWdodDogNDVweDtcbn1cblxuaW9uLWNvbnRlbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/register/register.page.ts":
/*!*******************************************!*\
  !*** ./src/app/register/register.page.ts ***!
  \*******************************************/
/*! exports provided: RegisterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPage", function() { return RegisterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/google-maps */ "./node_modules/@ionic-native/google-maps/index.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");









let RegisterPage = class RegisterPage {
    constructor(platform, loadingCtrl, toastCtrl, apiService, formBuilder, navCtrl, authService, _translate) {
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.apiService = apiService;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this._translate = _translate;
        this.step = 1;
        this.progress = 0.25;
        this.mapDragging = false;
        this.slideOpts = {
            setWrapperSize: true,
            slidesPerView: 1,
            preloadImages: true,
            spaceBetween: 20,
            autoHeight: true
        };
        this.userInfoForm = formBuilder.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(5)]],
            mobile: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(9)]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].email]],
            username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(5)]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(6)]]
        });
        this.addressInfoForm = formBuilder.group({
            address_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            country_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            state_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            city_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            area_id: [''],
            postal_code: ['']
        });
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // Since ngOnInit() is executed before `deviceready` event,
            // you have to wait the event.
            yield this.platform.ready();
            this.slides.lockSwipes(true);
            this.getCountries();
            this.dummyMarker = document.getElementById('DummyMarker');
        });
    }
    getCountries() {
        this.apiService.getCountries().subscribe((countries) => {
            this.countries = countries;
        });
    }
    getRegions() {
        this.apiService
            .getRegions(this.addressInfoForm.get('country_id').value)
            .subscribe((regions) => {
            this.regions = regions;
        });
    }
    getCities() {
        this.apiService
            .getCities(this.addressInfoForm.get('state_id').value)
            .subscribe((cities) => {
            this.cities = cities;
        });
    }
    getAreas() {
        this.apiService
            .getAreas(this.addressInfoForm.get('city_id').value)
            .subscribe((areas) => {
            this.areas = areas;
        });
    }
    searchForName(itemID, arrayItems) {
        const res = arrayItems.filter(item => item.id === itemID);
        // console.log(res);
        return res[0].name;
    }
    nextStep() {
        switch (this.step) {
            case 1:
                if (this.userInfoForm.valid) {
                    this.toNextStep();
                }
                else {
                    this.showToast(this._translate.instant('general.fill_all_required_fields'), 3000, 'top', 'danger');
                }
                break;
            case 2:
                if (this.addressInfoForm.valid) {
                    this.loadMap();
                    this.getAddressCenter();
                    this.toNextStep();
                }
                else {
                    this.showToast(this._translate.instant('general.fill_all_required_fields'), 3000, 'top', 'danger');
                }
                break;
            case 3:
                // console.log(this.lat);
                // console.log(this.lng);
                if (this.lat && this.lng) {
                    const registerData = {
                        name: this.userInfoForm.get('name').value,
                        mobile: this.userInfoForm.get('mobile').value,
                        email: this.userInfoForm.get('email').value,
                        username: this.userInfoForm.get('username').value,
                        password: this.userInfoForm.get('password').value,
                        password_confirmation: this.userInfoForm.get('password').value,
                        address_name: this.addressInfoForm.get('address_name').value,
                        country_id: this.addressInfoForm.get('country_id').value,
                        state_id: this.addressInfoForm.get('state_id').value,
                        city_id: this.addressInfoForm.get('city_id').value,
                        area_id: this.addressInfoForm.get('area_id').value,
                        postal_code: this.addressInfoForm.get('postal_code').value,
                        lat: this.lat,
                        lng: this.lng
                    };
                    // console.log(registerData);
                    this.apiService.registerClient(registerData).subscribe((userData) => {
                        if (userData && userData.token && userData.user) {
                            this.authService.doLogin(userData);
                            this.toNextStep();
                            this.showToast(this._translate.instant('general_account_created_successfully'), 2000, 'bottom', 'success');
                            setTimeout(() => {
                                this.navCtrl.navigateRoot('/tabs/home');
                            }, 5000);
                        }
                    }, error => {
                        // console.log(error);
                        if (error.statusText === 'Unauthorized') {
                            this.step = 1;
                            this.progress = this.step / 4;
                            this.slides.lockSwipes(false);
                            this.slides.slideTo(0);
                            this.slides.lockSwipes(true);
                            this.userInfoForm.controls.email.setErrors({ incorrect: true });
                            this.inputEmail.setFocus();
                        }
                        this.showToast(error.error.error, 3000, 'bottom', 'danger');
                    });
                }
                break;
        }
    }
    toNextStep() {
        this.step = this.step + 1;
        this.progress = this.step / 4;
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
        // console.log(this.step);
    }
    loadMap() {
        _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_3__["Environment"].setEnv({
            API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDvYLf1yswB12mE2qGDxDmlBJOF_Su-CCs',
            API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDvYLf1yswB12mE2qGDxDmlBJOF_Su-CCs'
        });
        this.map = _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_3__["GoogleMaps"].create('map_canvas', {
            camera: {
                target: {
                    lat: 43.0741704,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        });
        this.map
            .addEventListener(_ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_3__["GoogleMapsEvent"].CAMERA_MOVE_START)
            .subscribe(data => {
            this.mapDragging = true;
            // this.dummyMarker.classList.add('dragging');
            // console.log('Dragging');
        });
        this.map
            .addEventListener(_ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_3__["GoogleMapsEvent"].CAMERA_MOVE_END)
            .subscribe(data => {
            // console.log(data);
            this.mapDragging = false;
            // this.dummyMarker.classList.remove('dragging');
            // console.log(this.map.getCameraTarget());
            const location = this.map.getCameraTarget();
            this.lat = location.lat;
            this.lng = location.lng;
            // console.log(this.lat);
            // console.log(this.lng);
        });
    }
    getAddressCenter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const addressArray = {
                country: this.searchForName(this.addressInfoForm.get('country_id').value, this.countries),
                region: this.searchForName(this.addressInfoForm.get('state_id').value, this.regions),
                city: this.searchForName(this.addressInfoForm.get('city_id').value, this.cities)
                // area: this.searchForName(
                //   this.addressInfoForm.get('area_id').value,
                //   this.areas
                // )
            };
            const addressText = `${addressArray.city} ${addressArray.region} ${addressArray.country}`;
            this.loading = yield this.loadingCtrl.create({
                message: this._translate.instant('general.please_wait')
            });
            yield this.loading.present();
            this.map.clear();
            // Address -> latitude,longitude
            // const searchAddress = `${this.addressInfoForm.get('')}`
            _ionic_native_google_maps__WEBPACK_IMPORTED_MODULE_3__["Geocoder"].geocode({
                address: addressText
            }).then((results) => {
                // console.log(results);
                this.loading.dismiss();
                if (results.length > 0) {
                    this.map.animateCamera({
                        target: results[0].position,
                        zoom: 16
                    });
                    this.lat = results[0].position.lat;
                    this.lng = results[0].position.lng;
                    // console.log(this.lat);
                    // console.log(this.lng);
                }
                else {
                    // alert('Not found');
                }
            });
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
            this.map
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
                // console.log(err.error_message);
            });
        });
    }
    showToast(msg, time, place, theme) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastCtrl.create({
                message: msg,
                duration: time,
                position: place,
                color: theme
            });
            toast.present();
        });
    }
};
RegisterPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('stepSlider', null),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonSlides"])
], RegisterPage.prototype, "slides", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('inputEmail', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonInput"])
], RegisterPage.prototype, "inputEmail", void 0);
RegisterPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-register',
        template: __webpack_require__(/*! raw-loader!./register.page.html */ "./node_modules/raw-loader/index.js!./src/app/register/register.page.html"),
        styles: [__webpack_require__(/*! ./register.page.scss */ "./src/app/register/register.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        _services_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
], RegisterPage);



/***/ })

}]);
//# sourceMappingURL=register-register-module-es2015.js.map
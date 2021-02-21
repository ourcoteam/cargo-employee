(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/profile/profile.page.html":
/*!*********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/profile/profile.page.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"bg-header\">\n    <ion-toolbar *ngIf=\"authService.isAuthenticated()\">\n        <ion-button color=\"light\" fill=\"clear\" routerLink=\"/tabs/profile\" routerDirection=\"forward\" slot=\"end\">\n            <ion-icon name=\"wallet\" slot=\"end\"></ion-icon>\n            <ion-badge slot=\"start\">{{authService.userWallet?.wallet > 0 ? authService.userWallet?.wallet : 0}}</ion-badge>\n        </ion-button>\n        <ion-title>\n            <ion-img src=\"/assets/img/home_logo_small.svg\" class=\"header-logo\"></ion-img>\n        </ion-title>\n        <ion-button color=\"light\" fill=\"clear\" routerLink=\"/tabs/notifications\" routerDirection=\"forward\" slot=\"start\">\n            <ion-icon name=\"notifications\" slot=\"start\"></ion-icon>\n            <ion-badge slot=\"end\">{{authService.notificationsCount?.unreaded > 0 ? authService.notificationsCount?.unreaded : 0}}</ion-badge>\n        </ion-button>\n    </ion-toolbar>\n    <h6 class=\"emp-name ion-text-center\">\n        {{_translate.instant('general.profile')}}\n    </h6>\n</ion-header>\n\n<ion-content>\n    <div class=\"profile-data\">\n        <ion-avatar>\n            <img [src]=\"authService.userData?.avatar != null ? authService.userData?.avatar : '/assets/img/profile_image.svg'\" />\n        </ion-avatar>\n        <ion-chip class=\"name\" color=\"primary\">\n            <ion-icon name=\"contact\"></ion-icon>\n            <ion-label>{{authService.userData?.name}} {{authService.userData?.surname}}\n            </ion-label>\n        </ion-chip>\n        <ion-chip class=\"email\" color=\"medium\" outline=\"true\">\n            <ion-icon name=\"mail\"></ion-icon>\n            <ion-label>{{authService.userData?.email}}</ion-label>\n        </ion-chip>\n        <ion-chip class=\"phone\" color=\"medium\" outline=\"true\">\n            <ion-icon name=\"phone-portrait\"></ion-icon>\n            <ion-label>{{authService.userData?.mobile}}</ion-label>\n        </ion-chip>\n        <ion-chip class=\"wallet\" color=\"medium\" outline=\"true\">\n            <ion-icon name=\"wallet\"></ion-icon>\n            <ion-label>{{authService.userWallet?.wallet > 0 ? authService.userWallet?.wallet : 0}}</ion-label>\n        </ion-chip>\n    </div>\n    <ion-list lines=\"full\">\n        <ion-item>\n            <ion-label> {{_translate.instant('general.language')}} </ion-label>\n            <ion-select [(ngModel)]=\"userLang\" (ionChange)=\"changeLang()\" interface=\"action-sheet\">\n                <ion-select-option value=\"en\">English</ion-select-option>\n                <ion-select-option value=\"ar\">العربية</ion-select-option>\n            </ion-select>\n        </ion-item>\n        <ion-item (click)=\"authService.logout()\">\n            <ion-icon name=\"log-out\" slot=\"end\"></ion-icon>\n            <ion-label> {{_translate.instant('general.logout')}} </ion-label>\n        </ion-item>\n    </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/profile/profile.module.ts":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.module.ts ***!
  \*******************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "./src/app/profile/profile.page.ts");







const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]
    }
];
let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]]
    })
], ProfilePageModule);



/***/ }),

/***/ "./src/app/profile/profile.page.scss":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".profile-data {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  border-bottom: 1px solid var(var(--ion-color-light-shade));\n  padding-bottom: 15px;\n}\n.profile-data ion-avatar {\n  width: 150px;\n  height: 150px;\n}\n.profile-data ion-chip.name {\n  font-size: larger;\n  font-weight: 800;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcG90bGF5ZXIvRG93bmxvYWRzL2NhcmdvLWVtcGxveWVlL3NyYy9hcHAvcHJvZmlsZS9wcm9maWxlLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcHJvZmlsZS9wcm9maWxlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSwwREFBQTtFQUNBLG9CQUFBO0FDQ0o7QURBSTtFQUNJLFlBQUE7RUFDQSxhQUFBO0FDRVI7QURFUTtFQUNJLGlCQUFBO0VBQ0EsZ0JBQUE7QUNBWiIsImZpbGUiOiJzcmMvYXBwL3Byb2ZpbGUvcHJvZmlsZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZmlsZS1kYXRhIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSkpO1xuICAgIHBhZGRpbmctYm90dG9tOiAxNXB4O1xuICAgIGlvbi1hdmF0YXIge1xuICAgICAgICB3aWR0aDogMTUwcHg7XG4gICAgICAgIGhlaWdodDogMTUwcHg7XG4gICAgICAgIGltZyB7fVxuICAgIH1cbiAgICBpb24tY2hpcCB7XG4gICAgICAgICYubmFtZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IGxhcmdlcjtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLnByb2ZpbGUtZGF0YSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIodmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKSk7XG4gIHBhZGRpbmctYm90dG9tOiAxNXB4O1xufVxuLnByb2ZpbGUtZGF0YSBpb24tYXZhdGFyIHtcbiAgd2lkdGg6IDE1MHB4O1xuICBoZWlnaHQ6IDE1MHB4O1xufVxuLnByb2ZpbGUtZGF0YSBpb24tY2hpcC5uYW1lIHtcbiAgZm9udC1zaXplOiBsYXJnZXI7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/profile/profile.page.ts":
/*!*****************************************!*\
  !*** ./src/app/profile/profile.page.ts ***!
  \*****************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _services_ui_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/ui/loading.service */ "./src/app/services/ui/loading.service.ts");








let ProfilePage = class ProfilePage {
    constructor(authService, apiService, router, _translate, loadingUI) {
        this.authService = authService;
        this.apiService = apiService;
        this.router = router;
        this._translate = _translate;
        this.loadingUI = loadingUI;
        this.router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationStart"]))
            .subscribe((route) => {
            // console.log('Route: ', route.url);
            if (route.url === '/tabs/profile') {
                if (this.authService.isAuthenticated()) {
                    this.authService.getWallet(this.authService.userToken);
                }
            }
        });
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.authService.returnUserLang().then(lang => {
                // console.log(lang);
                this.userLang = lang;
                // console.log(this.userLang);
            });
            // console.log(this.authService.userData);
        });
    }
    changeLang() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log(this.userLang);
            this.authService.changeUserLang(this.userLang).then(() => {
                console.log(this.authService.userData.language);
            });
        });
    }
};
ProfilePage.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"] },
    { type: _services_ui_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"] }
];
ProfilePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(/*! raw-loader!./profile.page.html */ "./node_modules/raw-loader/index.js!./src/app/profile/profile.page.html"),
        styles: [__webpack_require__(/*! ./profile.page.scss */ "./src/app/profile/profile.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
        _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"],
        _services_ui_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"]])
], ProfilePage);



/***/ }),

/***/ "./src/app/services/ui/loading.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/ui/loading.service.ts ***!
  \************************************************/
/*! exports provided: LoadingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingService", function() { return LoadingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



let LoadingService = class LoadingService {
    constructor(loadingController) {
        this.loadingController = loadingController;
    }
    simpleLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                translucent: true
            });
            yield loading.present();
        });
    }
    loadingDismiss() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loadingController.dismiss();
        });
    }
};
LoadingService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] }
];
LoadingService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"]])
], LoadingService);



/***/ })

}]);
//# sourceMappingURL=profile-profile-module-es2015.js.map
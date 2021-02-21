(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notifications-notifications-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/notifications/notifications.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/notifications/notifications.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"bg-header\">\n    <ion-toolbar *ngIf=\"authService.isAuthenticated()\">\n        <ion-button color=\"light\" fill=\"clear\" routerLink=\"/tabs/profile\" routerDirection=\"forward\" slot=\"end\">\n            <ion-icon name=\"wallet\" slot=\"end\"></ion-icon>\n            <ion-badge slot=\"start\">{{authService.userWallet?.wallet > 0 ? authService.userWallet?.wallet : 0}}</ion-badge>\n        </ion-button>\n        <ion-title>\n            <ion-img src=\"/assets/img/home_logo_small.svg\" class=\"header-logo\"></ion-img>\n        </ion-title>\n        <ion-button color=\"light\" fill=\"clear\" routerLink=\"/tabs/notifications\" routerDirection=\"forward\" slot=\"start\">\n            <ion-icon name=\"notifications\" slot=\"start\"></ion-icon>\n            <ion-badge slot=\"end\">{{authService.notificationsCount?.unreaded > 0 ? authService.notificationsCount?.unreaded : 0}}</ion-badge>\n        </ion-button>\n    </ion-toolbar>\n    <h6 class=\"emp-name ion-text-center\">\n        {{_translate.instant('general.notifications')}}\n    </h6>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"reload($event)\">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-card class=\"white-card\" *ngFor=\"let item of authService?.userNotifications\" button=\"true\" (click)=\"shipmentDetail(item.number, item.id)\">\n        <!-- <ion-card-header>\n            <ion-card-subtitle [class]=\"item.read != 1 ? 'unread' : ''\">{{item.read != 1 ? _translate.instant('general.unreaded') : _translate.instant('general.readed')}}\n            </ion-card-subtitle>\n        </ion-card-header> -->\n        <ion-card-content>\n            <ion-grid class=\"ion-no-padding\">\n                <ion-row>\n                    <ion-col class=\"ion-no-padding\" size=\"10\">\n                        <p [class]=\"item.read != 1 ? 'unread' : ''\">{{item.content}}</p>\n                    </ion-col>\n                    <ion-col size=\"2\" class=\"ion-no-padding ion-text-end\">\n                        <span [class]=\"item.read != 1 ? 'unreaded' : ''\"></span>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-card-content>\n    </ion-card>\n    <p *ngIf=\"authService?.userNotifications?.length ==0 || !authService?.userNotifications\" class=\"ion-text-center\">\n        <ion-text color=\"medium\">\n            {{_translate.instant('general.no_notifications')}}\n        </ion-text>\n    </p>\n    <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMore($event)\" *ngIf=\"authService?.userNotifications?.length > 0 && authService?.userNotifications?.length < authService?.notificationsCount?.all\">\n        <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"\">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/notifications/notifications.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/notifications/notifications.module.ts ***!
  \*******************************************************/
/*! exports provided: NotificationsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsPageModule", function() { return NotificationsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _notifications_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifications.page */ "./src/app/notifications/notifications.page.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");








var routes = [
    {
        path: '',
        component: _notifications_page__WEBPACK_IMPORTED_MODULE_6__["NotificationsPage"]
    }
];
var NotificationsPageModule = /** @class */ (function () {
    function NotificationsPageModule() {
    }
    NotificationsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"]
            ],
            declarations: [_notifications_page__WEBPACK_IMPORTED_MODULE_6__["NotificationsPage"]]
        })
    ], NotificationsPageModule);
    return NotificationsPageModule;
}());



/***/ }),

/***/ "./src/app/notifications/notifications.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/notifications/notifications.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-card.white-card {\n  margin-bottom: 20px;\n}\nion-card.white-card ion-card-header {\n  padding-bottom: 5px;\n}\nion-card.white-card ion-card-header ion-card-title {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--ion-color-dark);\n}\nion-card.white-card ion-card-content p.unread {\n  font-weight: 700;\n}\nion-card.white-card ion-card-content span {\n  width: 10px;\n  height: 10px;\n  background: var(--ion-color-light);\n  display: inline-block;\n  border-radius: 10px;\n  margin: 0;\n}\nion-card.white-card ion-card-content span.unreaded {\n  background: var(--ion-color-primary);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcG90bGF5ZXIvRG93bmxvYWRzL2NhcmdvLWVtcGxveWVlL3NyYy9hcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLnBhZ2Uuc2NzcyIsInNyYy9hcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFBO0FDQ0o7QURBSTtFQUNJLG1CQUFBO0FDRVI7QURBUTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FDRVo7QURHWTtFQUNJLGdCQUFBO0FDRGhCO0FESVE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtDQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUNGWjtBREdZO0VBQ0ksb0NBQUE7QUNEaEIiLCJmaWxlIjoic3JjL2FwcC9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNhcmQud2hpdGUtY2FyZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICBpb24tY2FyZC1oZWFkZXIge1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICAgICAgICBpb24tY2FyZC1zdWJ0aXRsZSB7fVxuICAgICAgICBpb24tY2FyZC10aXRsZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpb24tY2FyZC1jb250ZW50IHtcbiAgICAgICAgcCB7XG4gICAgICAgICAgICAmLnVucmVhZCB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzcGFuIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAmLnVucmVhZGVkIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW9uLWNhcmQud2hpdGUtY2FyZCB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5pb24tY2FyZC53aGl0ZS1jYXJkIGlvbi1jYXJkLWhlYWRlciB7XG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XG59XG5pb24tY2FyZC53aGl0ZS1jYXJkIGlvbi1jYXJkLWhlYWRlciBpb24tY2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbn1cbmlvbi1jYXJkLndoaXRlLWNhcmQgaW9uLWNhcmQtY29udGVudCBwLnVucmVhZCB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5pb24tY2FyZC53aGl0ZS1jYXJkIGlvbi1jYXJkLWNvbnRlbnQgc3BhbiB7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luOiAwO1xufVxuaW9uLWNhcmQud2hpdGUtY2FyZCBpb24tY2FyZC1jb250ZW50IHNwYW4udW5yZWFkZWQge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59Il19 */"

/***/ }),

/***/ "./src/app/notifications/notifications.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/notifications/notifications.page.ts ***!
  \*****************************************************/
/*! exports provided: NotificationsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsPage", function() { return NotificationsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shared_shipment_details_shipment_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shipment-details/shipment-details.component */ "./src/app/shared/shipment-details/shipment-details.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");









var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(authService, apiService, router, modalController, _translate) {
        this.authService = authService;
        this.apiService = apiService;
        this.router = router;
        this.modalController = modalController;
        this._translate = _translate;
        this.currPage = 1;
        this.router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationStart"]; }))
            .subscribe(function (route) {
            // console.log('Route: ', route.url);
            // if (route.url === '/tabs/notifications') {
            //   if (this.authService.isAuthenticated()) {
            //     this.authService.getNotifications(this.authService.userToken);
            //     this.authService.getWallet(this.authService.userToken);
            //   }
            // }
        });
    }
    NotificationsPage.prototype.ngOnInit = function () { };
    NotificationsPage.prototype.loadMore = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (this.authService.notificationsCount.all >
                    this.authService.userNotifications.length) {
                    this.currPage++;
                    this.authService
                        .getNotifications(this.authService.userToken, this.currPage)
                        .then(function () {
                        setTimeout(function () {
                            event.target.complete();
                        }, 1200);
                    });
                }
                else {
                    event.target.complete();
                }
                return [2 /*return*/];
            });
        });
    };
    NotificationsPage.prototype.reload = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.currPage = 1;
                this.authService.notificationCount(this.authService.userToken);
                this.authService
                    .getNotifications(this.authService.userToken, this.currPage)
                    .then(function () {
                    setTimeout(function () {
                        event.target.complete();
                    }, 1200);
                });
                return [2 /*return*/];
            });
        });
    };
    NotificationsPage.prototype.shipmentDetail = function (shipmentID, notificationID) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log(shipmentID);
                    return [4 /*yield*/, this.apiService
                            .readNotification(this.authService.userToken, notificationID)
                            .subscribe(function (res) {
                            console.log(res);
                            _this.currPage = 1;
                            _this.authService.notificationCount(_this.authService.userToken);
                            _this.authService.getNotifications(_this.authService.userToken);
                        }, function (error) {
                            console.log(error);
                        })];
                    case 1:
                        // console.log(shipmentID);
                        _a.sent();
                        return [4 /*yield*/, this.modalController.create({
                                component: _shared_shipment_details_shipment_details_component__WEBPACK_IMPORTED_MODULE_7__["ShipmentDetailsComponent"],
                                componentProps: {
                                    shipment_id: shipmentID,
                                    userToken: this.authService.userToken
                                }
                            })];
                    case 2:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotificationsPage.ctorParameters = function () { return [
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
        { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonInfiniteScroll"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonInfiniteScroll"])
    ], NotificationsPage.prototype, "infiniteScroll", void 0);
    NotificationsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-notifications',
            template: __webpack_require__(/*! raw-loader!./notifications.page.html */ "./node_modules/raw-loader/index.js!./src/app/notifications/notifications.page.html"),
            styles: [__webpack_require__(/*! ./notifications.page.scss */ "./src/app/notifications/notifications.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], NotificationsPage);
    return NotificationsPage;
}());



/***/ })

}]);
//# sourceMappingURL=notifications-notifications-module-es5.js.map
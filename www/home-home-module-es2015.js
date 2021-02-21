(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"bg-header\">\n    <ion-toolbar *ngIf=\"!authService.isAuthenticated()\">\n        <!-- <ion-button routerLink=\"/register\" routerDirection=\"forward\" color=\"light\" fill=\"clear\" slot=\"start\">\n            {{_translate.instant('general.register')}}\n        </ion-button> -->\n\n        <ion-button routerLink=\"/login\" routerDirection=\"forward\" color=\"light\" fill=\"clear\" slot=\"end\">\n            {{_translate.instant('general.login')}}\n        </ion-button>\n\n       \n\n        <!-- <ion-title>home</ion-title> -->\n    </ion-toolbar>\n\n    <ion-toolbar *ngIf=\"authService.isAuthenticated()\">\n        <ion-button color=\"light\" fill=\"clear\" routerLink=\"/tabs/profile\" routerDirection=\"forward\" slot=\"end\">\n            <ion-icon name=\"wallet\" slot=\"end\"></ion-icon>\n            <ion-badge slot=\"start\">{{authService.userWallet?.wallet > 0 ? authService.userWallet?.wallet : 0}}</ion-badge>\n        </ion-button>\n        <ion-title>\n            <ion-img src=\"/assets/img/home_logo_small.svg\" class=\"header-logo\"></ion-img>\n        </ion-title>\n        <ion-button color=\"light\" fill=\"clear\" routerLink=\"/tabs/notifications\" routerDirection=\"forward\" slot=\"start\">\n            <ion-icon name=\"notifications\" slot=\"start\"></ion-icon>\n            <ion-badge slot=\"end\">{{authService.notificationsCount?.unreaded > 0 ? authService.notificationsCount?.unreaded : 0}}</ion-badge>\n        </ion-button>\n        <!-- <ion-button routerLink=\"/shipment-details\">\n            shipment\n        </ion-button> -->\n\n    </ion-toolbar>\n    <h6 class=\"emp-name ion-text-center\">\n        {{authService.userData?.name}} \n    </h6>\n\n    <!-- <ion-img src=\"/assets/img/home_logo.svg\" class=\"home-logo\"></ion-img> -->\n    <ion-item class=\"home-tracking\">\n        <ion-icon name=\"search\" slot=\"start\" class=\"search\"></ion-icon>\n        <ion-input [placeholder]=\"_translate.instant('home.tracking_id')\" [(ngModel)]=\"trackingID\" (ionChange)=\"trackingChange()\" debounce=\"200\"></ion-input>\n        <ion-button slot=\"end\" fill=\"clear\" *ngIf=\"trackingID == ''\" (click)=\"scanCode()\">\n            <ion-icon color=\"primary\" src=\"/assets/icons/code-scanning.svg\" slot=\"icon-only\"></ion-icon>\n        </ion-button>\n        <ion-button slot=\"end\" fill=\"clear\" *ngIf=\"trackingID != '' && trackScanned\" (click)=\"clearTracking()\">\n            <ion-icon color=\"primary\" name=\"close-circle-outline\" slot=\"icon-only\"></ion-icon>\n        </ion-button>\n        <ion-button slot=\"end\" fill=\"clear\" *ngIf=\"trackingID != '' && trackScanned == false\" (click)=\"trackOrder()\">\n            {{_translate.instant('general.track_order')}}\n        </ion-button>\n    </ion-item>\n</ion-header>\n\n<ion-content class=\"ion-padding gray-bg\">\n    <!-- <ion-fab vertical=\"bottom\" horizontal=\"start\" slot=\"fixed\" class=\"home-fab\" *ngIf=\"authService.isAuthenticated()\">\n        <ion-fab-button>\n            <ion-icon name=\"add\" routerLink=\"/new-order\" routerDirection=\"forward\"></ion-icon>\n        </ion-fab-button>\n    </ion-fab> -->\n    <div *ngIf=\"authService.isAuthenticated()\" [ngSwitch]=\"currentTap\">\n        <div *ngSwitchCase=\"'current'\">\n            <ion-refresher slot=\"fixed\" (ionRefresh)=\"reload($event, 'current')\">\n                <ion-refresher-content></ion-refresher-content>\n            </ion-refresher>\n            <ion-card class=\"white-card\" *ngFor=\"let shipment of userShipments\" button=\"true\" (click)=\"shipmentDetail(shipment.number)\">\n                <ion-card-header>\n                    <ion-card-title color=\"primary\">\n                        {{shipment.sender.name}}\n                    </ion-card-title>\n                    <ion-card-subtitle [class]=\"shipment.status\">\n                        {{shipment.number}} - {{shipment.status}}\n                    </ion-card-subtitle>\n                    <div class=\"shipment-data\">\n                        <ion-grid class=\"ion-no-padding\">\n                            <ion-row>\n                                <ion-col size=\"4\" class=\"ion-text-start ion-no-padding\">\n                                    {{shipment.ship_date}}\n                                </ion-col>\n                                <ion-col size=\"6\" class=\"ion-text-center ion-no-padding\">\n                                    {{shipment.courier_fee}} - {{shipment.payment_type == 1 ? _translate.instant('general.prepaid') : _translate.instant('general.postpaid')}}\n                                </ion-col>\n                                <ion-col size=\"2\" class=\"ion-text-end ion-no-padding\">{{shipment.type == 2 ? _translate.instant('general.send') : _translate.instant('general.receive')}}\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </div>\n                </ion-card-header>\n                <ion-card-content>\n                    <ion-grid class=\"ion-no-padding delivery-data\">\n                        <ion-row>\n                            <ion-col size=\"2\" class=\"ion-text-start\">\n                                <ion-button color=\"primary\" fill=\"clear\" class=\"ship-navigate\" (click)=\"navigate(shipment.destination.lat, shipment.destination.lng, '')\">\n                                    <ion-icon src=\"/assets/icons/route.svg\" slot=\"icon-only\" color=\"primary\"></ion-icon>\n                                </ion-button>\n                            </ion-col>\n                            <ion-col size=\"5\">\n                                <p class=\"from\">{{_translate.instant('general.from')}}</p>\n                                <p class=\"address\">{{shipment.sender_address?.address}}</p>\n                            </ion-col>\n                            <ion-col size=\"5\">\n                                <p class=\"to\">{{_translate.instant('general.to')}}</p>\n                                <p class=\"address\">\n                                    {{shipment.receiver_address?.address ? shipment.receiver_address?.address :shipment.sender_address?.address}}\n                                </p>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n            <ion-infinite-scroll threshold=\"2px\" (ionInfinite)=\"loadMore($event, 'current')\" *ngIf=\"archiveShipments?.length < totalCurrent\">\n                <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"\">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n        </div>\n        <div *ngSwitchCase=\"'archive'\">\n            <ion-card class=\"white-card\" *ngFor=\"let shipment of archiveShipments\" button=\"true\" (click)=\"shipmentDetail(shipment.number)\">\n                <ion-card-header>\n                    <ion-card-title color=\"primary\">\n                        {{shipment.number}}\n                    </ion-card-title>\n                    <ion-card-subtitle [class]=\"shipment.status\">\n                        {{shipment.status}}\n                    </ion-card-subtitle>\n                </ion-card-header>\n                <ion-card-content>\n                    <div class=\"time-line\">\n                        <p class=\"step\">\n                            {{_translate.instant('general.from')}}:\n                            <span>\n                {{shipment.sender_address.address | slice:0:50}}...\n              </span>\n                        </p>\n                        <p class=\"step\">\n                            {{_translate.instant('general.to')}}:\n                            <span>{{shipment.sender_address.address | slice:0:50}}...</span>\n                        </p>\n                    </div>\n                </ion-card-content>\n            </ion-card>\n        </div>\n        <div *ngSwitchCase=\"'search'\">\n            <ion-card class=\"white-card\" *ngFor=\"let shipment of searched\" button=\"true\" (click)=\"shipmentDetail(shipment.number)\">\n                <ion-card-header>\n                    <ion-card-title color=\"primary\">\n                        {{shipment.sender.name}}\n                    </ion-card-title>\n                    <ion-card-subtitle [class]=\"shipment.status\">\n                        {{shipment.number}} - {{shipment.status}}\n                    </ion-card-subtitle>\n                    <div class=\"shipment-data\">\n                        <ion-grid class=\"ion-no-padding\">\n                            <ion-row>\n                                <ion-col size=\"4\" class=\"ion-text-start ion-no-padding\">\n                                    {{shipment.ship_date}}\n                                </ion-col>\n                                <ion-col size=\"6\" class=\"ion-text-center ion-no-padding\">\n                                    {{shipment.courier_fee}} - {{shipment.payment_type == 1 ? _translate.instant('general.prepaid') : _translate.instant('general.postpaid')}}\n                                </ion-col>\n                                <ion-col size=\"2\" class=\"ion-text-end ion-no-padding\">{{shipment.type == 2 ? _translate.instant('general.send') : _translate.instant('general.receive')}}\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </div>\n                </ion-card-header>\n                <ion-card-content>\n                    <ion-grid class=\"ion-no-padding delivery-data\">\n                        <ion-row>\n                            <ion-col size=\"2\" class=\"ion-text-start\">\n                                <ion-button color=\"primary\" fill=\"clear\" class=\"ship-navigate\" (click)=\"navigate(shipment.destination.lat, shipment.destination.lng, '')\">\n                                    <ion-icon src=\"/assets/icons/route.svg\" slot=\"icon-only\" color=\"primary\"></ion-icon>\n                                </ion-button>\n                            </ion-col>\n                            <ion-col size=\"5\">\n                                <p class=\"from\">{{_translate.instant('general.from')}}</p>\n                                <p class=\"address\">{{shipment.sender_address?.address}}</p>\n                            </ion-col>\n                            <ion-col size=\"5\">\n                                <p class=\"to\">{{_translate.instant('general.to')}}</p>\n                                <p class=\"address\">\n                                    {{shipment.receiver_address?.address ? shipment.receiver_address?.address :shipment.sender_address?.address}}\n                                </p>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n        </div>\n    </div>\n    <div *ngIf=\"!authService.isAuthenticated() && trackScanned\">\n        <div>\n            <ion-card class=\"white-card\" *ngFor=\"let shipment of userShipments\" button=\"true\" (click)=\"shipmentDetail(shipment.number)\">\n                <ion-card-header>\n                    <ion-card-title color=\"primary\">\n                        {{shipment.number}}\n                    </ion-card-title>\n                    <ion-card-subtitle [class]=\"shipment.status\">\n                        {{shipment.status}}\n                    </ion-card-subtitle>\n                </ion-card-header>\n                <ion-card-content>\n                    <div class=\"time-line\">\n                        <p class=\"step\">\n                            {{_translate.instant('general.from')}}:\n                            <span>\n                {{shipment.sender_address.address | slice:0:50}}...\n              </span>\n                        </p>\n                        <p class=\"step\">\n                            {{_translate.instant('general.to')}}:\n                            <span>{{shipment.sender_address.address | slice:0:50}}...</span>\n                        </p>\n                    </div>\n                </ion-card-content>\n            </ion-card>\n        </div>\n    </div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");








const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
    }
];
let HomePageModule = class HomePageModule {
};
HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"]
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
    })
], HomePageModule);



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-img.home-logo {\n  margin: 2vh auto;\n  height: 18vh;\n}\n\napp-home {\n  background: #f7f7fb;\n}\n\nion-img.header-logo {\n  height: 40px;\n  margin: 3px auto;\n}\n\nion-item.home-tracking {\n  margin: 10px 20px;\n  --border-radius: 25px;\n  --box-shadow: 0 5px 10px rgba(204, 132, 21, 0.59);\n  border-radius: 25px;\n  box-shadow: 0 5px 10px rgba(204, 132, 21, 0.59);\n  --highlight-color-focused: transparent;\n  margin-bottom: 35px;\n}\n\nion-item.home-tracking ion-input {\n  --placeholder-color: var(--ion-color-medium);\n  --placeholder-font-weight: 400;\n  font-size: 15px;\n  --placeholder-opacity: 0.8;\n}\n\nion-item.home-tracking ion-icon.search {\n  font-size: 14px;\n  color: #cecece;\n  margin: 0 15px;\n}\n\nion-segment.home-segment {\n  width: calc(100vw / 1.5);\n}\n\nion-segment.home-segment ion-segment-button {\n  color: var(--ion-color-light);\n  opacity: 0.75;\n  margin: 0 15px;\n}\n\nion-segment.home-segment ion-segment-button.segment-button-checked {\n  opacity: 1;\n}\n\nion-fab ion-fab-button {\n  font-size: 18px;\n  border: 5px solid #f7f7fb;\n  border-radius: 100%;\n  --background: #f19f21;\n  --box-shadow: 0 3px 10px rgba(241, 159, 34, 0.6);\n}\n\nion-fab.home-fab {\n  left: calc(23px + var(--ion-safe-area-left, 0px));\n  right: auto;\n}\n\nion-content {\n  --padding-top: 20px;\n}\n\nion-content ion-card.white-card {\n  margin-bottom: 20px;\n  -webkit-margin-start: 0;\n          margin-inline-start: 0;\n  -webkit-margin-end: 0;\n          margin-inline-end: 0;\n}\n\nion-content ion-card.white-card ion-card-title {\n  font-size: 16px;\n  font-weight: 400;\n}\n\nion-content ion-card.white-card ion-card-subtitle {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 10px 10px;\n  margin: 0;\n  color: var(--ion-color-medium-contrast);\n  border-radius: 0 0 0 10px;\n  font-size: 13px;\n  font-weight: 700;\n  background: var(--ion-color-primary);\n}\n\nion-content ion-card.white-card ion-card-subtitle.in-transit {\n  background: #f19f21;\n  color: #fff;\n}\n\nion-content ion-card.white-card ion-card-subtitle.Pending {\n  background: #f19f21;\n  color: #fff;\n}\n\nion-content ion-card.white-card ion-card-subtitle.proccessing {\n  background: #2189f1;\n  color: #fff;\n}\n\nion-content ion-card.white-card ion-card-subtitle.on-hold {\n  background: rgba(225, 42, 42, 0.75);\n  color: #fff;\n}\n\nion-content ion-card.white-card .shipment-data {\n  border-bottom: 1px solid #EBEBF1;\n  padding: 10px 0;\n  -webkit-padding-start: 5px;\n          padding-inline-start: 5px;\n  -webkit-padding-end: 5px;\n          padding-inline-end: 5px;\n}\n\nion-content ion-card.white-card ion-card-content .delivery-data ion-button.ship-navigate {\n  --color: var(--ion-color-primary);\n  --padding-start: 0;\n  --padding-end: 0;\n  height: 100%;\n  margin: 0;\n  width: 40px;\n}\n\nion-content ion-card.white-card ion-card-content .delivery-data ion-button.ship-navigate ion-icon {\n  color: var(--ion-color-primary);\n  width: 100%;\n  height: 100%;\n}\n\nion-content ion-card.white-card ion-card-content .delivery-data p {\n  font-size: 12px;\n  line-height: 15px;\n}\n\nion-content ion-card.white-card ion-card-content .delivery-data p.from, ion-content ion-card.white-card ion-card-content .delivery-data p.to {\n  font-weight: 800;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcG90bGF5ZXIvRG93bmxvYWRzL2NhcmdvLWVtcGxveWVlL3NyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7RUFDQSxxQkFBQTtFQUNBLGlEQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQ0FBQTtFQUNBLHNDQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURBSTtFQUNJLDRDQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0VBQ0EsMEJBQUE7QUNFUjs7QURBSTtFQUNJLGVBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtBQ0VSOztBREVBO0VBQ0ksd0JBQUE7QUNDSjs7QURBSTtFQUNJLDZCQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7QUNFUjs7QURBSTtFQUNJLFVBQUE7QUNFUjs7QURJSTtFQUNJLGVBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxnREFBQTtBQ0RSOztBREdJO0VBQ0ksaURBQUE7RUFDQSxXQUFBO0FDRFI7O0FES0E7RUFDSSxtQkFBQTtBQ0ZKOztBREdJO0VBQ0ksbUJBQUE7RUFDQSx1QkFBQTtVQUFBLHNCQUFBO0VBQ0EscUJBQUE7VUFBQSxvQkFBQTtBQ0RSOztBREVRO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FDQVo7O0FERVE7RUFDSSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsdUNBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG9DQUFBO0FDQVo7O0FEQ1k7RUFDSSxtQkFBQTtFQUNBLFdBQUE7QUNDaEI7O0FEQ1k7RUFDSSxtQkFBQTtFQUNBLFdBQUE7QUNDaEI7O0FEQ1k7RUFDSSxtQkFBQTtFQUNBLFdBQUE7QUNDaEI7O0FEQ1k7RUFDSSxtQ0FBQTtFQUNBLFdBQUE7QUNDaEI7O0FERVE7RUFDSSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtVQUFBLHlCQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtBQ0FaOztBRElnQjtFQUNJLGlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtBQ0ZwQjs7QURHb0I7RUFDSSwrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDRHhCOztBRElnQjtFQUNJLGVBQUE7RUFDQSxpQkFBQTtBQ0ZwQjs7QURHb0I7RUFFSSxnQkFBQTtBQ0Z4QiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taW1nLmhvbWUtbG9nbyB7XG4gICAgbWFyZ2luOiAydmggYXV0bztcbiAgICBoZWlnaHQ6IDE4dmg7XG59XG5cbmFwcC1ob21lIHtcbiAgICBiYWNrZ3JvdW5kOiAjZjdmN2ZiO1xufVxuXG5pb24taW1nLmhlYWRlci1sb2dvIHtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgbWFyZ2luOiAzcHggYXV0bztcbn1cblxuaW9uLWl0ZW0uaG9tZS10cmFja2luZyB7XG4gICAgbWFyZ2luOiAxMHB4IDIwcHg7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgIC0tYm94LXNoYWRvdzogMCA1cHggMTBweCByZ2JhKDIwNCwgMTMyLCAyMSwgMC41OSk7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICBib3gtc2hhZG93OiAwIDVweCAxMHB4IHJnYmEoMjA0LCAxMzIsIDIxLCAwLjU5KTtcbiAgICAtLWhpZ2hsaWdodC1jb2xvci1mb2N1c2VkOiB0cmFuc3BhcmVudDtcbiAgICBtYXJnaW4tYm90dG9tOiAzNXB4O1xuICAgIGlvbi1pbnB1dCB7XG4gICAgICAgIC0tcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAtLXBsYWNlaG9sZGVyLWZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgICAgLS1wbGFjZWhvbGRlci1vcGFjaXR5OiAwLjg7XG4gICAgfVxuICAgIGlvbi1pY29uLnNlYXJjaCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgY29sb3I6ICNjZWNlY2U7XG4gICAgICAgIG1hcmdpbjogMCAxNXB4O1xuICAgIH1cbn1cblxuaW9uLXNlZ21lbnQuaG9tZS1zZWdtZW50IHtcbiAgICB3aWR0aDogY2FsYygxMDB2dyAvIDEuNSk7XG4gICAgaW9uLXNlZ21lbnQtYnV0dG9uIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgICAgIG9wYWNpdHk6IDAuNzU7XG4gICAgICAgIG1hcmdpbjogMCAxNXB4O1xuICAgIH1cbiAgICBpb24tc2VnbWVudC1idXR0b24uc2VnbWVudC1idXR0b24tY2hlY2tlZCB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxufVxuXG5pb24tZmFiIHtcbiAgICAvLyBib3R0b206IDMwcHg7XG4gICAgaW9uLWZhYi1idXR0b24ge1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIGJvcmRlcjogNXB4IHNvbGlkICNmN2Y3ZmI7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIC0tYmFja2dyb3VuZDogI2YxOWYyMTtcbiAgICAgICAgLS1ib3gtc2hhZG93OiAwIDNweCAxMHB4IHJnYmEoMjQxLCAxNTksIDM0LCAwLjYpO1xuICAgIH1cbiAgICAmLmhvbWUtZmFiIHtcbiAgICAgICAgbGVmdDogY2FsYygyM3B4ICsgdmFyKC0taW9uLXNhZmUtYXJlYS1sZWZ0LCAwcHgpKTtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgfVxufVxuXG5pb24tY29udGVudCB7XG4gICAgLS1wYWRkaW5nLXRvcDogMjBweDtcbiAgICBpb24tY2FyZC53aGl0ZS1jYXJkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgbWFyZ2luLWlubGluZS1zdGFydDogMDtcbiAgICAgICAgbWFyZ2luLWlubGluZS1lbmQ6IDA7XG4gICAgICAgIGlvbi1jYXJkLXRpdGxlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIH1cbiAgICAgICAgaW9uLWNhcmQtc3VidGl0bGUge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDEwcHg7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdCk7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwIDAgMCAxMHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgICYuaW4tdHJhbnNpdCB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2YxOWYyMTtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYuUGVuZGluZyB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2YxOWYyMTtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYucHJvY2Nlc3Npbmcge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMyMTg5ZjE7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAmLm9uLWhvbGQge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjI1LCA0MiwgNDIsIDAuNzUpO1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5zaGlwbWVudC1kYXRhIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRUJFQkYxO1xuICAgICAgICAgICAgcGFkZGluZzogMTBweCAwO1xuICAgICAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDVweDtcbiAgICAgICAgICAgIHBhZGRpbmctaW5saW5lLWVuZDogNXB4O1xuICAgICAgICB9XG4gICAgICAgIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgICAgICAgICAgLmRlbGl2ZXJ5LWRhdGEge1xuICAgICAgICAgICAgICAgIGlvbi1idXR0b24uc2hpcC1uYXZpZ2F0ZSB7XG4gICAgICAgICAgICAgICAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgICAgICAgICAgICAgICAtLXBhZGRpbmctZW5kOiAwO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwcHg7XG4gICAgICAgICAgICAgICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwIHtcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTVweDtcbiAgICAgICAgICAgICAgICAgICAgJi5mcm9tLFxuICAgICAgICAgICAgICAgICAgICAmLnRvIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW9uLWltZy5ob21lLWxvZ28ge1xuICBtYXJnaW46IDJ2aCBhdXRvO1xuICBoZWlnaHQ6IDE4dmg7XG59XG5cbmFwcC1ob21lIHtcbiAgYmFja2dyb3VuZDogI2Y3ZjdmYjtcbn1cblxuaW9uLWltZy5oZWFkZXItbG9nbyB7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luOiAzcHggYXV0bztcbn1cblxuaW9uLWl0ZW0uaG9tZS10cmFja2luZyB7XG4gIG1hcmdpbjogMTBweCAyMHB4O1xuICAtLWJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIC0tYm94LXNoYWRvdzogMCA1cHggMTBweCByZ2JhKDIwNCwgMTMyLCAyMSwgMC41OSk7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIGJveC1zaGFkb3c6IDAgNXB4IDEwcHggcmdiYSgyMDQsIDEzMiwgMjEsIDAuNTkpO1xuICAtLWhpZ2hsaWdodC1jb2xvci1mb2N1c2VkOiB0cmFuc3BhcmVudDtcbiAgbWFyZ2luLWJvdHRvbTogMzVweDtcbn1cbmlvbi1pdGVtLmhvbWUtdHJhY2tpbmcgaW9uLWlucHV0IHtcbiAgLS1wbGFjZWhvbGRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIC0tcGxhY2Vob2xkZXItZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICAtLXBsYWNlaG9sZGVyLW9wYWNpdHk6IDAuODtcbn1cbmlvbi1pdGVtLmhvbWUtdHJhY2tpbmcgaW9uLWljb24uc2VhcmNoIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogI2NlY2VjZTtcbiAgbWFyZ2luOiAwIDE1cHg7XG59XG5cbmlvbi1zZWdtZW50LmhvbWUtc2VnbWVudCB7XG4gIHdpZHRoOiBjYWxjKDEwMHZ3IC8gMS41KTtcbn1cbmlvbi1zZWdtZW50LmhvbWUtc2VnbWVudCBpb24tc2VnbWVudC1idXR0b24ge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgb3BhY2l0eTogMC43NTtcbiAgbWFyZ2luOiAwIDE1cHg7XG59XG5pb24tc2VnbWVudC5ob21lLXNlZ21lbnQgaW9uLXNlZ21lbnQtYnV0dG9uLnNlZ21lbnQtYnV0dG9uLWNoZWNrZWQge1xuICBvcGFjaXR5OiAxO1xufVxuXG5pb24tZmFiIGlvbi1mYWItYnV0dG9uIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBib3JkZXI6IDVweCBzb2xpZCAjZjdmN2ZiO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAtLWJhY2tncm91bmQ6ICNmMTlmMjE7XG4gIC0tYm94LXNoYWRvdzogMCAzcHggMTBweCByZ2JhKDI0MSwgMTU5LCAzNCwgMC42KTtcbn1cbmlvbi1mYWIuaG9tZS1mYWIge1xuICBsZWZ0OiBjYWxjKDIzcHggKyB2YXIoLS1pb24tc2FmZS1hcmVhLWxlZnQsIDBweCkpO1xuICByaWdodDogYXV0bztcbn1cblxuaW9uLWNvbnRlbnQge1xuICAtLXBhZGRpbmctdG9wOiAyMHB4O1xufVxuaW9uLWNvbnRlbnQgaW9uLWNhcmQud2hpdGUtY2FyZCB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDA7XG4gIG1hcmdpbi1pbmxpbmUtZW5kOiAwO1xufVxuaW9uLWNvbnRlbnQgaW9uLWNhcmQud2hpdGUtY2FyZCBpb24tY2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cbmlvbi1jb250ZW50IGlvbi1jYXJkLndoaXRlLWNhcmQgaW9uLWNhcmQtc3VidGl0bGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIHBhZGRpbmc6IDEwcHggMTBweDtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdCk7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCAwIDEwcHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuaW9uLWNvbnRlbnQgaW9uLWNhcmQud2hpdGUtY2FyZCBpb24tY2FyZC1zdWJ0aXRsZS5pbi10cmFuc2l0IHtcbiAgYmFja2dyb3VuZDogI2YxOWYyMTtcbiAgY29sb3I6ICNmZmY7XG59XG5pb24tY29udGVudCBpb24tY2FyZC53aGl0ZS1jYXJkIGlvbi1jYXJkLXN1YnRpdGxlLlBlbmRpbmcge1xuICBiYWNrZ3JvdW5kOiAjZjE5ZjIxO1xuICBjb2xvcjogI2ZmZjtcbn1cbmlvbi1jb250ZW50IGlvbi1jYXJkLndoaXRlLWNhcmQgaW9uLWNhcmQtc3VidGl0bGUucHJvY2Nlc3Npbmcge1xuICBiYWNrZ3JvdW5kOiAjMjE4OWYxO1xuICBjb2xvcjogI2ZmZjtcbn1cbmlvbi1jb250ZW50IGlvbi1jYXJkLndoaXRlLWNhcmQgaW9uLWNhcmQtc3VidGl0bGUub24taG9sZCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjI1LCA0MiwgNDIsIDAuNzUpO1xuICBjb2xvcjogI2ZmZjtcbn1cbmlvbi1jb250ZW50IGlvbi1jYXJkLndoaXRlLWNhcmQgLnNoaXBtZW50LWRhdGEge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0VCRUJGMTtcbiAgcGFkZGluZzogMTBweCAwO1xuICBwYWRkaW5nLWlubGluZS1zdGFydDogNXB4O1xuICBwYWRkaW5nLWlubGluZS1lbmQ6IDVweDtcbn1cbmlvbi1jb250ZW50IGlvbi1jYXJkLndoaXRlLWNhcmQgaW9uLWNhcmQtY29udGVudCAuZGVsaXZlcnktZGF0YSBpb24tYnV0dG9uLnNoaXAtbmF2aWdhdGUge1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXJnaW46IDA7XG4gIHdpZHRoOiA0MHB4O1xufVxuaW9uLWNvbnRlbnQgaW9uLWNhcmQud2hpdGUtY2FyZCBpb24tY2FyZC1jb250ZW50IC5kZWxpdmVyeS1kYXRhIGlvbi1idXR0b24uc2hpcC1uYXZpZ2F0ZSBpb24taWNvbiB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5pb24tY29udGVudCBpb24tY2FyZC53aGl0ZS1jYXJkIGlvbi1jYXJkLWNvbnRlbnQgLmRlbGl2ZXJ5LWRhdGEgcCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbGluZS1oZWlnaHQ6IDE1cHg7XG59XG5pb24tY29udGVudCBpb24tY2FyZC53aGl0ZS1jYXJkIGlvbi1jYXJkLWNvbnRlbnQgLmRlbGl2ZXJ5LWRhdGEgcC5mcm9tLCBpb24tY29udGVudCBpb24tY2FyZC53aGl0ZS1jYXJkIGlvbi1jYXJkLWNvbnRlbnQgLmRlbGl2ZXJ5LWRhdGEgcC50byB7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/barcode-scanner/ngx */ "./node_modules/@ionic-native/barcode-scanner/ngx/index.js");
/* harmony import */ var _services_audio_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/audio.service */ "./src/app/services/audio.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shared_shipment_details_shipment_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shipment-details/shipment-details.component */ "./src/app/shared/shipment-details/shipment-details.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _services_ui_loading_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/ui/loading.service */ "./src/app/services/ui/loading.service.ts");
/* harmony import */ var _shared_barcode_shipment_details_barcode_shipment_details_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/barcode-shipment-details/barcode-shipment-details.component */ "./src/app/shared/barcode-shipment-details/barcode-shipment-details.component.ts");














let HomePage = class HomePage {
    constructor(barcodeScanner, audio, authService, apiService, platform, modalController, router, toastController, _translate, loadingUI, zone) {
        this.barcodeScanner = barcodeScanner;
        this.audio = audio;
        this.authService = authService;
        this.apiService = apiService;
        this.platform = platform;
        this.modalController = modalController;
        this.router = router;
        this.toastController = toastController;
        this._translate = _translate;
        this.loadingUI = loadingUI;
        this.zone = zone;
        this.trackingID = '';
        this.trackScanned = false;
        this.currentTap = 'current';
        this.currPageNum = 1;
        this.pastPageNum = 1;
        this.encodeData = 'https://www.FreakyJolly.com';
        // Options
        this.barcodeScannerOptions = {
            showTorchButton: true,
            showFlipCameraButton: true
        };
        this.router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__["NavigationStart"]))
            .subscribe((route) => {
            // console.log('Route: ', route.url);
            if (route.url === '/tabs/home') {
                // this.authService.authState.subscribe(state => {
                //   if (state) {
                //     this.updateWalletNoti();
                //   }
                // });
                // if (this.authService.isAuthenticated()) {
                //   this.getUserShipments();
                // }
            }
        });
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.audio.preload('codeScanned', 'assets/audio/scan_beep.mp3');
            this.audio.preload('scanCodeError', 'assets/audio/scan_error.mp3');
            // await this.loadingUI.simpleLoading();
            this.authService.ifLoggedIn().then(() => {
                this.authService.getUserData();
                // console.log(this.authService.isAuthenticated());
                if (this.authService.isAuthenticated()) {
                    this.getUserShipments();
                    // setTimeout(() => {
                    //   this.loadingUI.loadingDismiss();
                    // }, 1000);
                }
                this.authService.authState.subscribe(state => {
                    if (state &&
                        this.authService.isAuthenticated() &&
                        this.authService.userToken) {
                        this.updateWalletNoti();
                    }
                });
            });
        });
    }
    updateWalletNoti() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.authService.getUserData();
            this.authService.notificationCount(this.authService.userToken);
            this.authService.getWallet(this.authService.userToken);
            this.authService.getNotifications(this.authService.userToken);
        });
    }
    presentToast(msg, pos, col, dur) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: msg,
                position: pos,
                color: col,
                duration: dur
            });
            toast.present();
        });
    }
    // async ionViewDidEnter() {
    //   console.log('ionViewDidEnter');
    //   if (this.authService.isAuthenticated()) {
    //     this.getUserShipments();
    //   }
    // } 
    // scanCode() {
    //  this.barcodeList = [];
    //   this.doScan();
    // }
    // barcodeList = [];
    // doScan() {
    //   this.barcodeScanner.scan().then((scanData => {
    //     if(scanData.text) {
    //       this.audio.play('codeScanned')
    //       this.barcodeList.push(scanData.text);
    //     } else {
    //       this.audio.play('scanCodeError')
    //     }
    //     if(scanData.cancelled) {
    //       console.log(this.barcodeList)
    //       this.apiService.getMultiShipmentDetails(this.barcodeList).subscribe(
    //         // this.apiService.getMultiShipmentDetails(['032313','032314','032315']).subscribe(
    //           (shipmentData: any) => {
    //             console.log(shipmentData) 
    //             // this.trackScanned = true;
    //             // this.currentTap = 'search';
    //             // // console.log(this.currentTap);
    //             // this.loadingUI.loadingDismiss();
    //             // this.searched = [shipmentData];
    //             // // console.log(this.searched);
    //             // this.modalController.create({
    //             //   component: BarcodeShipmentDetailsComponent,
    //             //   componentProps:{
    //             //     data:shipmentData,
    //             //     shipment_id: shipmentData.number,
    //             //     userToken: this.authService.userToken
    //             //   },
    //             // }).then(m => m.present())
    //           },
    //           error => {
    //             this.loadingUI.loadingDismiss();
    //             // console.log(error);
    //             // console.log('nothing found');
    //             this.presentToast(
    //               this._translate.instant('general.No_shipments_found'),
    //               'bottom',
    //               'danger',
    //               3000
    //             );
    //           }
    //       );
    //     } else {
    //       this.doScan()
    //     }
    //   }))
    // }
    scanCode() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.barcodeScanner
                .scan()
                .then((barcodeData) => {
                // console.log(barcodeData);
                if (!barcodeData.cancelled) {
                    console.log('barcodeData', barcodeData);
                    this.audio.play('codeScanned');
                    this.trackingID = barcodeData.text;
                    this.loadingUI.simpleLoading();
                    // this.apiService.getShipmentDetails('REF702380').subscribe(
                    this.apiService.getShipmentDetails(this.trackingID).subscribe((shipmentData) => {
                        console.log(shipmentData);
                        this.trackScanned = true;
                        this.currentTap = 'search';
                        // console.log(this.currentTap);
                        this.loadingUI.loadingDismiss();
                        this.searched = [shipmentData];
                        // console.log(this.searched);
                        this.modalController.create({
                            component: _shared_barcode_shipment_details_barcode_shipment_details_component__WEBPACK_IMPORTED_MODULE_12__["BarcodeShipmentDetailsComponent"],
                            componentProps: {
                                data: shipmentData,
                                shipment_id: shipmentData.number,
                                userToken: this.authService.userToken
                            },
                        }).then(m => m.present());
                    }, error => {
                        this.loadingUI.loadingDismiss();
                        // console.log(error);
                        // console.log('nothing found');
                        this.presentToast(this._translate.instant('general.No_shipments_found'), 'bottom', 'danger', 3000);
                    });
                }
                this.scannedData = barcodeData;
            })
                .catch(err => {
                // console.log('Error', err);
                // console.log('nothing found');
            });
        });
    }
    trackOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loadingUI.simpleLoading();
            yield this.apiService.getShipmentDetails(this.trackingID).subscribe((shipmentData) => {
                console.log(shipmentData);
                this.trackScanned = true;
                this.currentTap = 'search';
                this.loadingUI.loadingDismiss();
                this.searched = [shipmentData];
            }, error => {
                this.loadingUI.loadingDismiss();
                // console.log(error);
                // console.log('nothing found');
                this.presentToast(this._translate.instant('general.No_shipments_found'), 'bottom', 'danger', 3000);
            });
        });
    }
    trackingChange() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.trackingID === '' && this.authService.isAuthenticated()) {
                this.trackScanned = false;
                this.currentTap = 'current';
                this.getUserShipments();
            }
        });
    }
    clearTracking() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.trackingID = '';
            this.searched = [];
            this.trackScanned = false;
            this.currentTap = 'current';
        });
    }
    getUserShipments() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.authService.getUserData();
            // console.log(this.authService.userToken);
            yield this.apiService
                .getUserShipments(this.authService.userToken)
                .subscribe((shipments) => {
                console.log(shipments);
                // this.userShipments = shipments.filter(
                //   x => x.requested !== 4 || x.requested !== 8 || x.requested !== 12
                // );
                this.totalCurrent = shipments.count;
                this.userShipments = shipments;
                // this.archiveShipments = shipments.filter(
                //   x => x.requested === 4 || x.requested === 8 || x.requested === 12
                // );
            });
        });
    }
    shipmentDetail(shipmentID) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log(shipmentID);
            const modal = yield this.modalController.create({
                component: _shared_shipment_details_shipment_details_component__WEBPACK_IMPORTED_MODULE_7__["ShipmentDetailsComponent"],
                componentProps: {
                    shipment_id: shipmentID,
                    userToken: this.authService.userToken
                }
            });
            return yield modal.present().then(() => {
                modal.onWillDismiss().then(() => {
                    this.getUserShipments();
                    this.updateWalletNoti();
                    this.trackingID = '';
                    this.scannedData = {};
                    this.trackScanned = false;
                    this.searched = [];
                    this.currentTap = 'current';
                });
            });
        });
    }
    navigate(lat, lng, locName) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const destination = lat + ',' + lng;
            if (this.platform.is('ios')) {
                window.open('maps://?q=' + destination, '_system');
            }
            else {
                const label = encodeURI(locName);
                window.open('geo:0,0?q=' + destination + label, '_system');
            }
        });
    }
    loadMore(event, type) {
        if (type === 'current') {
            if (this.totalCurrent > this.userShipments.length) {
                this.currPageNum++;
                this.apiService
                    .getUserShipments(this.authService.userToken, this.currPageNum)
                    .subscribe((data) => {
                    console.log(data);
                    this.userShipments.push(...data.items);
                    setTimeout(() => {
                        event.target.complete();
                    }, 1200);
                });
            }
            else {
                event.target.complete();
            }
        }
    }
    reload(event, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (type === 'current') {
                this.currPageNum = 1;
                this.getUserShipments().then(() => {
                    setTimeout(() => {
                        event.target.complete();
                    }, 1200);
                });
            }
        });
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__["BarcodeScanner"] },
    { type: _services_audio_service__WEBPACK_IMPORTED_MODULE_3__["AudioService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateService"] },
    { type: _services_ui_loading_service__WEBPACK_IMPORTED_MODULE_11__["LoadingService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
];
HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html"),
        styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__["BarcodeScanner"],
        _services_audio_service__WEBPACK_IMPORTED_MODULE_3__["AudioService"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
        _services_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateService"],
        _services_ui_loading_service__WEBPACK_IMPORTED_MODULE_11__["LoadingService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
], HomePage);



/***/ }),

/***/ "./src/app/services/audio.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/audio.service.ts ***!
  \*******************************************/
/*! exports provided: AudioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioService", function() { return AudioService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_native_audio_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/native-audio/ngx */ "./node_modules/@ionic-native/native-audio/ngx/index.js");




let AudioService = class AudioService {
    constructor(platform, nativeAudio) {
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.sounds = [];
        this.audioPlayer = new Audio();
        this.forceWebAudio = true;
    }
    preload(key, asset) {
        if (this.platform.is('cordova') && !this.forceWebAudio) {
            this.nativeAudio.preloadSimple(key, asset);
            this.sounds.push({
                key,
                asset,
                isNative: true
            });
        }
        else {
            const audio = new Audio();
            audio.src = asset;
            this.sounds.push({
                key,
                asset,
                isNative: false
            });
        }
    }
    play(key) {
        const soundToPlay = this.sounds.find(sound => {
            return sound.key === key;
        });
        if (soundToPlay.isNative) {
            this.nativeAudio.play(soundToPlay.asset).then(res => {
                // console.log(res);
            }, err => {
                // console.log(err);
            });
        }
        else {
            this.audioPlayer.src = soundToPlay.asset;
            this.audioPlayer.play();
        }
    }
};
AudioService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_native_native_audio_ngx__WEBPACK_IMPORTED_MODULE_3__["NativeAudio"] }
];
AudioService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"], _ionic_native_native_audio_ngx__WEBPACK_IMPORTED_MODULE_3__["NativeAudio"]])
], AudioService);



/***/ })

}]);
//# sourceMappingURL=home-home-module-es2015.js.map
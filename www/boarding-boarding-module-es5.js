(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["boarding-boarding-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/boarding/boarding.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/boarding/boarding.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n    <ion-slides pager=\"true\">\n        <ion-slide>\n            <div class=\"slide-content slide_1\">\n                <ion-img src=\"/assets/img/boarding/slide_1.svg\"></ion-img>\n                <h4>{{_translate.instant('general.submit_your_order')}}</h4>\n                <div class=\"slide-text\">\n                    <ion-text color=\"medium\" class=\"ion-text-wrap\">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam.</ion-text>\n                </div>\n            </div>\n        </ion-slide>\n        <ion-slide>\n            <div class=\"slide-content slide_2\">\n                <ion-img src=\"/assets/img/boarding/slide_2.svg\"></ion-img>\n                <h4>{{_translate.instant('general.choose_a_destination')}}</h4>\n                <div class=\"slide-text\">\n                    <ion-text color=\"medium\" class=\"ion-text-wrap\">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam.</ion-text>\n                </div>\n            </div>\n        </ion-slide>\n        <ion-slide>\n            <div class=\"slide-content slide_3\">\n                <ion-img src=\"/assets/img/boarding/slide_3.svg\"></ion-img>\n                <h4>{{_translate.instant('general.order_delivered')}}</h4>\n                <div class=\"slide-text\">\n                    <ion-text color=\"medium\" class=\"ion-text-wrap\">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam.</ion-text>\n                </div>\n            </div>\n        </ion-slide>\n    </ion-slides>\n    <div class=\"actions-holder\">\n        <ion-button color=\"primary\" class=\"btn-full mr-b-30\" expand=\"block\" round strong routerLink=\"/register\" routerDirection=\"root\">\n            {{_translate.instant('general.register')}}\n        </ion-button>\n        <ion-button color=\"clight\" class=\"btn-full slim low\" expand=\"block\" fill=\"outline\" round strong routerLink=\"/login\" routerDirection=\"root\">\n            {{_translate.instant('general.skip')}}\n        </ion-button>\n    </div>\n</ion-content>"

/***/ }),

/***/ "./src/app/boarding/boarding.module.ts":
/*!*********************************************!*\
  !*** ./src/app/boarding/boarding.module.ts ***!
  \*********************************************/
/*! exports provided: BoardingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardingPageModule", function() { return BoardingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _boarding_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./boarding.page */ "./src/app/boarding/boarding.page.ts");







var routes = [
    {
        path: '',
        component: _boarding_page__WEBPACK_IMPORTED_MODULE_6__["BoardingPage"]
    }
];
var BoardingPageModule = /** @class */ (function () {
    function BoardingPageModule() {
    }
    BoardingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_boarding_page__WEBPACK_IMPORTED_MODULE_6__["BoardingPage"]]
        })
    ], BoardingPageModule);
    return BoardingPageModule;
}());



/***/ }),

/***/ "./src/app/boarding/boarding.page.scss":
/*!*********************************************!*\
  !*** ./src/app/boarding/boarding.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".slide-content {\n  padding-top: 65px;\n  padding-bottom: 40px;\n  background-repeat: no-repeat;\n  background-position: right top;\n  background-size: cover;\n}\n.slide-content.slide_1 {\n  background-image: url(/assets/img/boarding/slide_bg_1.svg);\n}\n.slide-content.slide_2 {\n  background-image: url(/assets/img/boarding/slide_bg_2.svg);\n}\n.slide-content.slide_3 {\n  background-image: url(/assets/img/boarding/slide_bg_3.svg);\n}\n.slide-content ion-img {\n  height: 395px;\n  max-height: 40vh;\n}\n.slide-content h4 {\n  color: var(--ion-color-primary);\n  font-size: 22px;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.slide-content .slide-text {\n  padding: 0 20px;\n}\n.slide-content .slide-text ion-text {\n  font-size: 14px;\n  font-weight: 400;\n}\n.swiper-pagination {\n  bottom: 0px;\n}\n.actions-holder {\n  padding: 3vh 10vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcG90bGF5ZXIvRG93bmxvYWRzL2NhcmdvLWVtcGxveWVlL3NyYy9hcHAvYm9hcmRpbmcvYm9hcmRpbmcucGFnZS5zY3NzIiwic3JjL2FwcC9ib2FyZGluZy9ib2FyZGluZy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsNEJBQUE7RUFDQSw4QkFBQTtFQUNBLHNCQUFBO0FDQ0Y7QURBRTtFQUNFLDBEQUFBO0FDRUo7QURBRTtFQUNFLDBEQUFBO0FDRUo7QURBRTtFQUNFLDBEQUFBO0FDRUo7QURBRTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtBQ0VKO0FEQUU7RUFDRSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FDRUo7QURBRTtFQUNFLGVBQUE7QUNFSjtBRERJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDR047QURFQTtFQUNFLFdBQUE7QUNDRjtBREVBO0VBQ0UsaUJBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2JvYXJkaW5nL2JvYXJkaW5nLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zbGlkZS1jb250ZW50IHtcbiAgcGFkZGluZy10b3A6IDY1cHg7XG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCB0b3A7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICYuc2xpZGVfMSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1nL2JvYXJkaW5nL3NsaWRlX2JnXzEuc3ZnKTtcbiAgfVxuICAmLnNsaWRlXzIge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2ltZy9ib2FyZGluZy9zbGlkZV9iZ18yLnN2Zyk7XG4gIH1cbiAgJi5zbGlkZV8zIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9pbWcvYm9hcmRpbmcvc2xpZGVfYmdfMy5zdmcpO1xuICB9XG4gIGlvbi1pbWcge1xuICAgIGhlaWdodDogMzk1cHg7XG4gICAgbWF4LWhlaWdodDogNDB2aDtcbiAgfVxuICBoNCB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBmb250LXNpemU6IDIycHg7XG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICB9XG4gIC5zbGlkZS10ZXh0IHtcbiAgICBwYWRkaW5nOiAwIDIwcHg7XG4gICAgaW9uLXRleHQge1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICB9XG4gIH1cbn1cblxuLnN3aXBlci1wYWdpbmF0aW9uIHtcbiAgYm90dG9tOiAwcHg7XG59XG5cbi5hY3Rpb25zLWhvbGRlciB7XG4gIHBhZGRpbmc6IDN2aCAxMHZ3O1xufVxuIiwiLnNsaWRlLWNvbnRlbnQge1xuICBwYWRkaW5nLXRvcDogNjVweDtcbiAgcGFkZGluZy1ib3R0b206IDQwcHg7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IHRvcDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cbi5zbGlkZS1jb250ZW50LnNsaWRlXzEge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9pbWcvYm9hcmRpbmcvc2xpZGVfYmdfMS5zdmcpO1xufVxuLnNsaWRlLWNvbnRlbnQuc2xpZGVfMiB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2ltZy9ib2FyZGluZy9zbGlkZV9iZ18yLnN2Zyk7XG59XG4uc2xpZGUtY29udGVudC5zbGlkZV8zIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1nL2JvYXJkaW5nL3NsaWRlX2JnXzMuc3ZnKTtcbn1cbi5zbGlkZS1jb250ZW50IGlvbi1pbWcge1xuICBoZWlnaHQ6IDM5NXB4O1xuICBtYXgtaGVpZ2h0OiA0MHZoO1xufVxuLnNsaWRlLWNvbnRlbnQgaDQge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDIycHg7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uc2xpZGUtY29udGVudCAuc2xpZGUtdGV4dCB7XG4gIHBhZGRpbmc6IDAgMjBweDtcbn1cbi5zbGlkZS1jb250ZW50IC5zbGlkZS10ZXh0IGlvbi10ZXh0IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4uc3dpcGVyLXBhZ2luYXRpb24ge1xuICBib3R0b206IDBweDtcbn1cblxuLmFjdGlvbnMtaG9sZGVyIHtcbiAgcGFkZGluZzogM3ZoIDEwdnc7XG59Il19 */"

/***/ }),

/***/ "./src/app/boarding/boarding.page.ts":
/*!*******************************************!*\
  !*** ./src/app/boarding/boarding.page.ts ***!
  \*******************************************/
/*! exports provided: BoardingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardingPage", function() { return BoardingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");



var BoardingPage = /** @class */ (function () {
    function BoardingPage(_translate) {
        this._translate = _translate;
    }
    BoardingPage.prototype.ngOnInit = function () { };
    BoardingPage.ctorParameters = function () { return [
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"] }
    ]; };
    BoardingPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-boarding',
            template: __webpack_require__(/*! raw-loader!./boarding.page.html */ "./node_modules/raw-loader/index.js!./src/app/boarding/boarding.page.html"),
            styles: [__webpack_require__(/*! ./boarding.page.scss */ "./src/app/boarding/boarding.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]])
    ], BoardingPage);
    return BoardingPage;
}());



/***/ })

}]);
//# sourceMappingURL=boarding-boarding-module-es5.js.map
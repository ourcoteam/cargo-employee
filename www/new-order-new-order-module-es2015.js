(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["new-order-new-order-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/new-order/new-order.page.html":
/*!*************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/new-order/new-order.page.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"bg-header\" [ngStyle]=\"{'opacity': Opacity}\">\n    <ion-toolbar>\n        <ion-back-button defaultHref=\"/tabs/home\" text=\"\" icon=\"arrow-back\" slot=\"start\"></ion-back-button>\n        <ion-title>{{_translate.instant('general.new_order')}}</ion-title>\n    </ion-toolbar>\n    <ion-segment class=\"order-steps\" color=\"light\">\n        <ion-segment-button value=\"info\" [checked]=\"step == 1\" disabled=\"true\" [class]=\"step > 1 ? 'success' : ''\">\n            <ion-icon src=\"/assets/icons/package.svg\"></ion-icon>\n            <ion-label>{{_translate.instant('general.shipment_info')}}</ion-label>\n        </ion-segment-button>\n        <ion-segment-button value=\"details\" [checked]=\"step == 2\" disabled=\"true\" [class]=\"step > 2 ? 'success' : ''\">\n            <ion-icon src=\"/assets/icons/checklist.svg\"></ion-icon>\n            <ion-label>{{_translate.instant('general.shipment_details')}}</ion-label>\n        </ion-segment-button>\n        <ion-segment-button value=\"review\" [checked]=\"step == 3\" disabled=\"true\" [class]=\"step > 3 ? 'success' : ''\">\n            <ion-icon src=\"/assets/icons/box.svg\"></ion-icon>\n            <ion-label>{{_translate.instant('general.order_review')}}</ion-label>\n        </ion-segment-button>\n    </ion-segment>\n</ion-header>\n\n<ion-content class=\"ion-padding\" [ngStyle]=\"{'opacity': Opacity}\" #content>\n    <ion-slides pager=\"false\" #stepSlider class=\"step-slider\" [options]=\"slideOpts\">\n        <ion-slide>\n            <div class=\"form-holder\">\n                <form [formGroup]=\"shipmentFirst\">\n                    <ion-list>\n                        <ion-radio-group class=\"check-buttons\" formControlName=\"shipment_type\" (ionChange)=\"typeChange()\" value=\"1\">\n                            <ion-list-header>\n                                {{_translate.instant('general.shipment_type')}}\n                            </ion-list-header>\n\n                            <ion-item lines=\"none\">\n                                <ion-label>{{_translate.instant('general.send')}}</ion-label>\n                                <ion-radio value=\"1\" mode=\"ios\" slot=\"start\" label=\"_translate.instant('general.send')\"></ion-radio>\n                            </ion-item>\n\n                            <ion-item lines=\"none\">\n                                <ion-label>{{_translate.instant('general.receive')}}</ion-label>\n                                <ion-radio value=\"2\" mode=\"ios\" slot=\"start\" label=\"Recieve\"></ion-radio>\n                            </ion-item>\n                        </ion-radio-group>\n                    </ion-list>\n                    <ion-item class=\"has-action\">\n                        <ion-note slot=\"end\" color=\"primary\" class=\"action-btn\" (click)=\"newAddressModal()\">{{_translate.instant('general.add_new_address')}}</ion-note>\n                        <ion-label position=\"stacked\" color=\"medium\">{{_translate.instant('general.sender_address')}} <span>*</span>\n                        </ion-label>\n                        <ion-select [placeholder]=\"_translate.instant('general.select_receiver')\" interface=\"action-sheet\" formControlName=\"sender_address\">\n                            <ion-select-option *ngFor=\"let address of userAddresses\" [value]=\"address.id\">{{address.name}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item class=\"has-action\">\n                        <ion-note slot=\"end\" color=\"primary\" class=\"action-btn\" (click)=\"newReceiverModal()\">{{_translate.instant('general.add_new_receiver')}}</ion-note>\n                        <ion-label position=\"stacked\" color=\"medium\">{{_translate.instant('general.receiver')}}\n                            <span *ngIf=\"shipmentFirst.get('shipment_type').value == 2 || shipmentFirst.get('receiver_id').value\">*</span\n              >\n            </ion-label>\n            <ionic-selectable\n              #rcv\n              formControlName=\"receiver_id\"\n              itemValueField=\"id\"\n              itemTextField=\"name\"\n              [items]=\"receivers\"\n              [canSearch]=\"true\"\n              [canClear]=\"true\"\n              (onSearch)=\"searchUsers($event)\"\n              [placeholder]=\"_translate.instant('general.select_receiver')\"\n              [searchDebounce]=\"500\"\n              [searchFailText]=\"_translate.instant('general.no_users_found')\"\n              [searchPlaceholder]=\"_translate.instant('general.username_or_mobile')\"\n              [shouldFocusSearchbar]=\"true\"\n              headerColor=\"primary\"\n              (onSelect)=\"rcvDoneSelect($event)\"\n              [required]=\"shipmentFirst.get('shipment_type').value == 2\"\n              (onClear)=\"clearRcvAddr($event)\"\n            >\n            </ionic-selectable>\n          </ion-item>\n          <ion-item class=\"has-action\">\n            <ion-note\n              slot=\"end\"\n              color=\"primary\"\n              class=\"action-btn\"\n              (click)=\"newReceiverAddressModal()\"\n              *ngIf=\"shipmentFirst.get('receiver_id').value\"\n              >{{_translate.instant('general.add_receiver_address')}}</ion-note\n            >\n            <ion-label position=\"stacked\" color=\"medium\"\n              >{{_translate.instant('general.receiver_address')}}\n              <span\n                *ngIf=\"shipmentFirst.get('shipment_type').value == 2 || shipmentFirst.get('receiver_id').value\"\n                >*</span\n              ></ion-label\n            >\n            <ion-select\n              [placeholder]=\"_translate.instant('general.select_receiver_address')\"\n              interface=\"action-sheet\"\n              formControlName=\"receiver_address\"\n              [required]=\"shipmentFirst.get('receiver_id').value\"\n            >\n              <ion-select-option\n                *ngFor=\"let recAddr of receiverAddresses\"\n                [value]=\"recAddr?.id\"\n                >{{recAddr?.name}}</ion-select-option\n              >\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label color=\"medium\"\n              >{{_translate.instant('general.return_defray')}}</ion-label\n            >\n            <ion-toggle\n              color=\"primary\"\n              formControlName=\"return_defray\"\n              (ionChange)=\"defrayChange($event)\"\n            ></ion-toggle>\n          </ion-item>\n          <ion-grid class=\"ion-no-padding\" *ngIf=\"isReturnDefray\">\n            <ion-row>\n              <ion-col size=\"6\">\n                <ion-item>\n                  <ion-label color=\"medium\" position=\"floating\"\n                    >{{_translate.instant('general.return_package_fee')}}\n                    <span>*</span>\n                        </ion-label>\n                        <ion-input type=\"num\" formControlName=\"package_fee\" [required]=\"isReturnDefray\">\n                        </ion-input>\n                    </ion-item>\n                    </ion-col>\n                    <ion-col size=\"6\">\n                        <ion-item>\n                            <ion-label color=\"medium\" position=\"floating\">{{_translate.instant('general.package_fee')}}\n                                <span>*</span>\n                            </ion-label>\n                            <ion-input type=\"num\" formControlName=\"return_package_fee\" [required]=\"isReturnDefray\">\n                            </ion-input>\n                        </ion-item>\n                    </ion-col>\n                    </ion-row>\n                    </ion-grid>\n\n                    <ion-item class=\"has-action\">\n                        <ion-label position=\"stacked\" color=\"medium\">{{_translate.instant('general.payment_type')}}\n                            <span>*</span></ion-label>\n                        <ion-select [placeholder]=\"_translate.instant('general.select_payment_type')\" interface=\"action-sheet\" value=\"1\" formControlName=\"payment_type\" required>\n                            <ion-select-option value=\"1\" selected>{{_translate.instant('general.postpaid')}}</ion-select-option>\n                            <ion-select-option value=\"2\">{{_translate.instant('general.prepaid')}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item class=\"has-action\">\n                        <ion-label position=\"stacked\" color=\"medium\">{{_translate.instant('general.package_type')}} <span>*</span>\n                        </ion-label>\n                        <ion-select [placeholder]=\"_translate.instant('general.select_package_type')\" interface=\"action-sheet\" formControlName=\"packaging_id\">\n                            <ion-select-option *ngFor=\"let type of packageTypes\" [value]=\"type?.id\">{{type?.name}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item class=\"has-action\">\n                        <ion-label position=\"stacked\" color=\"medium\">{{_translate.instant('general.office')}}\n                            <span>*</span></ion-label>\n                        <ion-select [placeholder]=\"_translate.instant('general.select_office')\" interface=\"action-sheet\" formControlName=\"office_id\">\n                            <ion-select-option *ngFor=\"let office of offices\" [value]=\"office?.id\">{{office?.name}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label color=\"medium\" position=\"floating\">{{_translate.instant('general.ship_date')}}\n                        </ion-label>\n                        <ion-input type=\"num\" formControlName=\"ship_date\" [liIonic4Datepicker]=\"datePickerObj\">\n                        </ion-input>\n                    </ion-item>\n                </form>\n            </div>\n        </ion-slide>\n        <ion-slide #slide2>\n            <div class=\"form-holder\">\n                <div class=\"packages-holder has-grids\" *ngFor=\"let package of packages; let i = index\">\n                    <ion-grid class=\"data-grid package ion-no-padding\">\n                        <ion-row>\n                            <ion-col size=\"10\">\n                                <ion-row>\n                                    <ion-col>{{_translate.instant('general.package_type')}} {{package.category_id}}\n                                    </ion-col>\n                                    <ion-col>{{_translate.instant('general.quantity')}} {{package.quantity}}\n                                    </ion-col>\n                                    <ion-col></ion-col>\n                                </ion-row>\n                                <ion-row>\n                                    <ion-col>{{_translate.instant('general.weight')}}<br /> {{package.weight}} {{package.weight_unit}}</ion-col>\n                                    <ion-col>{{_translate.instant('general.height')}}<br /> {{package.height}} {{package.height_unit}}</ion-col>\n                                    <ion-col>{{_translate.instant('general.width')}}<br /> {{package.width}} {{package.width_unit}}</ion-col>\n                                    <ion-col>{{_translate.instant('general.length')}}<br /> {{package.length}} {{package.length_unit}}</ion-col>\n                                </ion-row>\n                                <ion-row>\n                                    <ion-col>{{_translate.instant('general.description')}} {{package.description}}\n                                    </ion-col>\n                                </ion-row>\n                            </ion-col>\n                            <ion-col size=\"2\" class=\"actions ion-no-padding\">\n                                <ion-button expand=\"full\" color=\"danger\" size=\"small\" fill=\"clear\" (click)=\"removePackage(i)\">\n                                    <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\n                                </ion-button>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </div>\n                <form [formGroup]=\"packageForm\">\n                    <ion-grid class=\"ion-no-padding\">\n                        <ion-row>\n                            <ion-col size=\"6\" class=\"no-padding-left\">\n                                <ion-item>\n                                    <ion-label position=\"stacked\" color=\"medium\">{{_translate.instant('general.category')}}</ion-label>\n                                    <ion-select [placeholder]=\"_translate.instant('general.select_category')\" interface=\"action-sheet\" formControlName=\"category_id\">\n                                        <ion-select-option *ngFor=\"let category of categories\" [value]=\"category.id\">{{category.name}}</ion-select-option>\n                                    </ion-select>\n                                </ion-item>\n                            </ion-col>\n                            <ion-col size=\"6\" class=\"no-padding-left\">\n                                <ion-item>\n                                    <ion-label position=\"floating\" color=\"medium\">{{_translate.instant('general.quantity')}}</ion-label>\n                                    <ion-input type=\"num\" formControlName=\"quantity\"> </ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n\n                    <ion-grid class=\"ion-no-padding\">\n                        <ion-row>\n                            <ion-col size=\"6\" class=\"multi-item no-padding-left\">\n                                <ion-row>\n                                    <ion-col size=\"7\" class=\"no-padding-left\">\n                                        <ion-item>\n                                            <ion-label position=\"floating\" color=\"medium\">{{_translate.instant('general.weight')}}</ion-label>\n                                            <ion-input type=\"num\" formControlName=\"weight\">\n                                            </ion-input>\n                                        </ion-item>\n                                    </ion-col>\n                                    <ion-col size=\"5\">\n                                        <ion-item class=\"fix-height\">\n                                            <ion-label position=\"stacked\" color=\"medium\"></ion-label>\n                                            <ion-select [placeholder]=\"_translate.instant('general.unit')\" interface=\"action-sheet\" formControlName=\"weight_unit\">\n                                                <ion-select-option value=\"kg\" selected>{{_translate.instant('general.kg')}}</ion-select-option>\n                                                <ion-select-option value=\"g\">{{_translate.instant('general.g')}}</ion-select-option>\n                                            </ion-select>\n                                        </ion-item>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-col>\n                            <ion-col size=\"6\" class=\"multi-item no-padding-right\">\n                                <ion-row>\n                                    <ion-col size=\"7\" class=\"no-padding-right\">\n                                        <ion-item>\n                                            <ion-label position=\"floating\" color=\"medium\">{{_translate.instant('general.height')}}</ion-label>\n                                            <ion-input type=\"num\" formControlName=\"height\">\n                                            </ion-input>\n                                        </ion-item>\n                                    </ion-col>\n                                    <ion-col size=\"5\">\n                                        <ion-item class=\"fix-height\">\n                                            <ion-label position=\"stacked\" color=\"medium\"></ion-label>\n                                            <ion-select placeholder=\"Select Category\" interface=\"action-sheet\" formControlName=\"height_unit\">\n                                                <ion-select-option value=\"cm\" selected>{{_translate.instant('general.cm')}}</ion-select-option>\n                                                <ion-select-option value=\"m\">{{_translate.instant('general.m')}}</ion-select-option>\n                                            </ion-select>\n                                        </ion-item>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col size=\"6\" class=\"multi-item no-padding-left\">\n                                <ion-row>\n                                    <ion-col size=\"7\" class=\"no-padding-left\">\n                                        <ion-item>\n                                            <ion-label position=\"floating\" color=\"medium\">{{_translate.instant('general.width')}}</ion-label>\n                                            <ion-input type=\"num\" formControlName=\"width\">\n                                            </ion-input>\n                                        </ion-item>\n                                    </ion-col>\n                                    <ion-col size=\"5\">\n                                        <ion-item class=\"fix-height\">\n                                            <ion-label position=\"stacked\" color=\"medium\"></ion-label>\n                                            <ion-select placeholder=\"Select Category\" interface=\"action-sheet\" formControlName=\"width_unit\">\n                                                <ion-select-option value=\"cm\" selected>{{_translate.instant('general.cm')}}</ion-select-option>\n                                                <ion-select-option value=\"m\">{{_translate.instant('general.m')}}</ion-select-option>\n                                            </ion-select>\n                                        </ion-item>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-col>\n                            <ion-col size=\"6\" class=\"multi-item no-padding-right\">\n                                <ion-row>\n                                    <ion-col size=\"7\" class=\"no-padding-right\">\n                                        <ion-item>\n                                            <ion-label position=\"floating\" color=\"medium\">{{_translate.instant('general.length')}}</ion-label>\n                                            <ion-input type=\"num\" formControlName=\"length\">\n                                            </ion-input>\n                                        </ion-item>\n                                    </ion-col>\n                                    <ion-col size=\"5\">\n                                        <ion-item class=\"fix-height\">\n                                            <ion-label position=\"stacked\" color=\"medium\"></ion-label>\n                                            <ion-select placeholder=\"Select Category\" interface=\"action-sheet\" formControlName=\"length_unit\">\n                                                <ion-select-option value=\"cm\" selected>{{_translate.instant('general.cm')}}</ion-select-option>\n                                                <ion-select-option value=\"m\">{{_translate.instant('general.m')}}</ion-select-option>\n                                            </ion-select>\n                                        </ion-item>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                    <ion-item>\n                        <ion-label position=\"floating\" color=\"medium\">{{_translate.instant('general.description')}}</ion-label>\n                        <ion-textarea [placeholder]=\"_translate.instant('general.describe_your_order')\" rows=\"3\" formControlName=\"description\">\n                        </ion-textarea>\n                    </ion-item>\n                    <ion-button class=\"btn-full\" round strong size=\"small\" color=\"primary\" (click)=\"appendPackage()\" [disabled]=\"!packageForm.valid\" *ngIf=\"packageForm.valid\">\n                        <ion-icon name=\"add-circle-outline\" slot=\"start\"></ion-icon>\n                        {{_translate.instant('general.add_more_packages')}}\n                    </ion-button>\n                </form>\n            </div>\n        </ion-slide>\n        <ion-slide class=\"has-grids\">\n            <div class=\"data-grid\">\n                <h4>{{_translate.instant('general.shipment_info')}}</h4>\n                <ion-row>\n                    <ion-col size=\"6\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.shipment_type')}}</ion-label>\n                        <p [innerHTML]=\"shipmentFirst.get('shipment_type').value == 1 ? _translate.instant('general.send') : _translate.instant('general.receive')\">\n                            {{_translate.instant('general.send')}}\n                        </p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('sender_address').value != null\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.sender_address')}}</ion-label>\n                        <p>{{returnText('sender_address')}}</p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('receiver_id').value != null\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.receiver')}}</ion-label>\n                        <p>{{returnText('receiver_id')}}</p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('receiver_address').value != null\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.receiver_address')}}</ion-label>\n                        <p>{{returnText('receiver_address')}}</p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('return_defray').value\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.return_defray')}}</ion-label>\n                        <p [innerHTML]=\"shipmentFirst.get('return_defray').value ? 'Yes' : 'No'\"></p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('return_defray').value\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.return_package_fee')}}</ion-label>\n                        <p>{{shipmentFirst.get('return_package_fee').value}}</p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('return_defray').value\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.package_fee')}}</ion-label>\n                        <p>{{shipmentFirst.get('package_fee').value}}</p>\n                    </ion-col>\n                    <ion-col size=\"6\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.payment_type')}}</ion-label>\n                        <p [innerHTML]=\"shipmentFirst.get('payment_type').value == 1 ? 'Postpaid' : 'Prepaid'\"></p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('packaging_id').value != null\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.packaging')}}</ion-label>\n                        <p>{{returnText('packaging_id')}}</p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('office_id').value != null\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.office')}}</ion-label>\n                        <p>{{returnText('office_id')}}</p>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"shipmentFirst.get('ship_date').value\">\n                        <ion-label color=\"medium\">{{_translate.instant('general.ship_date')}}</ion-label>\n                        <p>{{shipmentFirst.get('ship_date').value}}</p>\n                    </ion-col>\n                </ion-row>\n            </div>\n            <div class=\"data-grid\">\n                <h4>{{_translate.instant('general.shipment_details')}}</h4>\n                <h6>\n                    <ion-text color=\"primary\">\n                        {{_translate.instant('general.packages')}} ({{packages.length}})\n                    </ion-text>\n                </h6>\n                <ion-grid class=\"data-grid package-review\" *ngFor=\"let package of packages\">\n                    <ion-row>\n                        <ion-col><span class=\"title\">{{_translate.instant('general.package_type')}}</span\n              ><br />\n              {{getCatName(package.category_id)}}\n            </ion-col>\n            <ion-col\n              ><span class=\"title\"\n                >{{_translate.instant('general.quantity')}}</span\n              ><br />\n              {{package.quantity}}\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col\n              ><span class=\"title\"\n                >{{_translate.instant('general.weight')}}</span\n              ><br />\n              {{package.weight}} {{package.weight_unit}}</ion-col\n            >\n            <ion-col\n              ><span class=\"title\"\n                >{{_translate.instant('general.height')}}</span\n              ><br />\n              {{package.height}} {{package.height_unit}}</ion-col\n            >\n            <ion-col\n              ><span class=\"title\">{{_translate.instant('general.width')}}</span\n              ><br />\n              {{package.width}} {{package.width_unit}}</ion-col\n            >\n            <ion-col\n              ><span class=\"title\"\n                >{{_translate.instant('general.length')}}</span\n              ><br />\n              {{package.length}} {{package.length_unit}}</ion-col\n            >\n          </ion-row>\n          <ion-row>\n            <ion-col\n              ><span class=\"title\"\n                >{{_translate.instant('general.description')}}</span\n              >\n              {{package.description}}\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </div>\n    </ion-slide>\n    <ion-slide>\n      <div class=\"order-success\">\n        <ion-icon src=\"assets/img/success_logo.svg\"></ion-icon>\n        <p>{{_translate.instant('general.shipment_created_successfully')}}</p>\n        <p>{{_translate.instant('general.your_shipment_num')}}</p>\n        <p class=\"shipment-number\">{{orderDone?.number}}</p>\n        <ion-button\n          class=\"btn-full btn-gradient\"\n          expand=\"block\"\n          round\n          strong\n          routerLink=\"/tabs/home\"\n          routerDirection=\"root\"\n        >\n          {{_translate.instant('general.back_to_home')}}\n        </ion-button>\n      </div>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n<ion-footer class=\"has-action\" [ngStyle]=\"{'opacity': Opacity}\">\n  <ion-button\n    class=\"btn-full btn-gradient\"\n    expand=\"block\"\n    round\n    strong\n    (click)=\"nextStep()\"\n    *ngIf=\"step == 1\"\n    [disabled]=\"!shipmentFirst.valid\"\n  >\n    {{_translate.instant('general.next')}}\n  </ion-button>\n  <ion-button\n    class=\"btn-full btn-gradient\"\n    expand=\"block\"\n    round\n    strong\n    (click)=\"nextStep()\"\n    *ngIf=\"step == 2\"\n    [disabled]=\"packages.length > 0 ? false  : !packageForm.valid\"\n  >\n    {{_translate.instant('general.next')}}\n  </ion-button>\n  <ion-button\n    class=\"btn-full btn-gradient\"\n    expand=\"block\"\n    round\n    strong\n    (click)=\"nextStep()\"\n    *ngIf=\"step == 3\"\n  >\n    {{_translate.instant('general.submit_order')}}\n  </ion-button>\n</ion-footer>"

/***/ }),

/***/ "./src/app/new-order/new-order.module.ts":
/*!***********************************************!*\
  !*** ./src/app/new-order/new-order.module.ts ***!
  \***********************************************/
/*! exports provided: NewOrderPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewOrderPageModule", function() { return NewOrderPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _new_order_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./new-order.page */ "./src/app/new-order/new-order.page.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var ionic_selectable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ionic-selectable */ "./node_modules/ionic-selectable/esm2015/ionic-selectable.min.js");
/* harmony import */ var _logisticinfotech_ionic4_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @logisticinfotech/ionic4-datepicker */ "./node_modules/@logisticinfotech/ionic4-datepicker/fesm2015/logisticinfotech-ionic4-datepicker.js");











const routes = [
    {
        path: '',
        component: _new_order_page__WEBPACK_IMPORTED_MODULE_6__["NewOrderPage"]
    }
];
let NewOrderPageModule = class NewOrderPageModule {
};
NewOrderPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            ionic_selectable__WEBPACK_IMPORTED_MODULE_8__["IonicSelectableModule"],
            _logisticinfotech_ionic4_datepicker__WEBPACK_IMPORTED_MODULE_9__["Ionic4DatepickerModule"]
        ],
        declarations: [_new_order_page__WEBPACK_IMPORTED_MODULE_6__["NewOrderPage"]]
    })
], NewOrderPageModule);



/***/ }),

/***/ "./src/app/new-order/new-order.page.scss":
/*!***********************************************!*\
  !*** ./src/app/new-order/new-order.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-segment.order-steps {\n  background: var(--ion-color-tertiary);\n}\nion-segment.order-steps ion-segment-button {\n  color: rgba(255, 255, 255, 0.3);\n  --border-width: 0;\n  --indicator-color: transparent !important;\n  --indicator-color-checked: transparent !important;\n}\nion-segment.order-steps ion-segment-button ion-icon {\n  background: transparent;\n  border-radius: 100%;\n  font-size: 25px;\n  padding: 8px;\n}\nion-segment.order-steps ion-segment-button ion-label {\n  font-size: 10px;\n  margin-top: 5px;\n}\nion-segment.order-steps ion-segment-button .segment-button-indicator {\n  display: none !important;\n}\nion-segment.order-steps ion-segment-button.segment-button-checked {\n  opacity: 1 !important;\n  --opacity: 1 !important;\n}\nion-segment.order-steps ion-segment-button.segment-button-checked ion-icon {\n  background: #fff;\n  color: var(--ion-color-tertiary);\n  --indicator-color-checked: transparent;\n}\nion-segment.order-steps ion-segment-button.segment-button-checked:after {\n  opacity: 1;\n  border-top: 1px solid var(--ion-color-primary);\n}\nion-segment.order-steps ion-segment-button:before {\n  content: \"\";\n  width: 50%;\n  position: relative;\n  height: 0;\n  left: 70%;\n  border-top: 1px #fff dashed;\n  top: 35%;\n  display: block;\n  z-index: 1;\n  opacity: 0.15;\n}\nion-segment.order-steps ion-segment-button:after {\n  content: \"\";\n  width: 50%;\n  position: relative;\n  height: 0;\n  left: -20%;\n  border-top: 1px #fff dashed;\n  top: -64%;\n  display: block;\n  z-index: 1;\n  opacity: 0.15;\n}\nion-segment.order-steps ion-segment-button:first-child:after {\n  display: none;\n}\nion-segment.order-steps ion-segment-button:last-child:before {\n  display: none;\n}\nion-segment.order-steps ion-segment-button.success {\n  color: var(--ion-color-primary);\n  opacity: 1 !important;\n  visibility: visible !important;\n}\nion-segment.order-steps ion-segment-button.success ion-icon {\n  background: var(--ion-color-primary);\n  color: var(--ion-color-tertiary);\n  margin-bottom: 0;\n}\nion-segment.order-steps ion-segment-button.success:before, ion-segment.order-steps ion-segment-button.success:after {\n  opacity: 1;\n  border-top: 1px solid var(--ion-color-primary);\n}\n.has-grids {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n.has-grids .data-grid {\n  text-align: start;\n  font-size: 14px;\n  font-weight: 400;\n  margin-bottom: 10px;\n  width: 100%;\n}\n.has-grids .data-grid h4 {\n  color: var(--ion-color-primary);\n}\n.has-grids .data-grid ion-label {\n  text-transform: uppercase;\n}\n.has-grids .data-grid p span.dimmed {\n  color: var(--ion-color-medium);\n}\n.has-grids .data-grid.package {\n  background: #ffffff;\n  border: 1px solid #f1a221;\n  border-radius: 0 5px 5px 0;\n  font-size: 11px !important;\n  box-shadow: 0 0px 3px #fbe2b9;\n  margin: 10px 3px;\n  border-left-width: 5px;\n}\n.has-grids .data-grid.package ion-col.actions {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n.has-grids .data-grid.package ion-col.actions ion-button {\n  margin: 0;\n  display: -webkit-box;\n  display: flex;\n  --box-shadow: none;\n  --border-radius: 0;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n.has-grids .data-grid.package-review {\n  border: 1px solid #d3d3d3;\n  border-radius: 5px;\n}\n.has-grids .data-grid.package-review span.title {\n  color: var(--ion-color-medium);\n}\n.order-success ion-icon {\n  font-size: 130px;\n}\n.order-success p {\n  font-size: 14px;\n  font-weight: 400;\n}\n.order-success p.shipment-number {\n  font-weight: 900;\n  font-size: 18px;\n}\nhtml[lang=ar] ion-segment.order-steps ion-segment-button:before {\n  left: auto;\n  right: 70%;\n}\nhtml[lang=ar] ion-segment.order-steps ion-segment-button:after {\n  left: auto;\n  right: -20%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zcG90bGF5ZXIvRG93bmxvYWRzL2NhcmdvLWVtcGxveWVlL3NyYy9hcHAvbmV3LW9yZGVyL25ldy1vcmRlci5wYWdlLnNjc3MiLCJzcmMvYXBwL25ldy1vcmRlci9uZXctb3JkZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBO0VBQ0kscUNBQUE7QUNISjtBRElJO0VBQ0ksK0JBQUE7RUFDQSxpQkFBQTtFQUNBLHlDQUFBO0VBQ0EsaURBQUE7QUNGUjtBREdRO0VBQ0ksdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FDRFo7QURHUTtFQUNJLGVBQUE7RUFDQSxlQUFBO0FDRFo7QURHUTtFQUNJLHdCQUFBO0FDRFo7QURHUTtFQUNJLHFCQUFBO0VBQ0EsdUJBQUE7QUNEWjtBREVZO0VBQ0ksZ0JBQUE7RUFDQSxnQ0FBQTtFQUNBLHNDQUFBO0FDQWhCO0FERVk7RUFDSSxVQUFBO0VBQ0EsOENBQUE7QUNBaEI7QURHUTtFQUNJLFdBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtBQ0RaO0FER1E7RUFDSSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSwyQkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7QUNEWjtBRElZO0VBQ0ksYUFBQTtBQ0ZoQjtBRE1ZO0VBQ0ksYUFBQTtBQ0poQjtBRE9RO0VBQ0ksK0JBQUE7RUFDQSxxQkFBQTtFQUNBLDhCQUFBO0FDTFo7QURNWTtFQUNJLG9DQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtBQ0poQjtBRE1ZO0VBRUksVUFBQTtFQUNBLDhDQUFBO0FDTGhCO0FEV0E7RUFDSSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7QUNSSjtBRFNJO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUNQUjtBRFFRO0VBQ0ksK0JBQUE7QUNOWjtBRFFRO0VBQ0kseUJBQUE7QUNOWjtBRFNZO0VBQ0ksOEJBQUE7QUNQaEI7QURVUTtFQUNJLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSwwQkFBQTtFQUNBLDBCQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0FDUlo7QURTWTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtBQ1BoQjtBRFFnQjtFQUNJLFNBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0EsbUJBQUE7VUFBQSxPQUFBO0FDTnBCO0FEVVE7RUFDSSx5QkFBQTtFQUNBLGtCQUFBO0FDUlo7QURTWTtFQUNJLDhCQUFBO0FDUGhCO0FEY0k7RUFDSSxnQkFBQTtBQ1hSO0FEYUk7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7QUNYUjtBRFlRO0VBQ0ksZ0JBQUE7RUFDQSxlQUFBO0FDVlo7QURrQlk7RUFDSSxVQUFBO0VBQ0EsVUFBQTtBQ2ZoQjtBRGlCWTtFQUNJLFVBQUE7RUFDQSxXQUFBO0FDZmhCIiwiZmlsZSI6InNyYy9hcHAvbmV3LW9yZGVyL25ldy1vcmRlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpb24tc2xpZGVzIHtcbi8vICAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4vLyAgICAgaGVpZ2h0OiAxMDAlO1xuLy8gfVxuaW9uLXNlZ21lbnQub3JkZXItc3RlcHMge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG4gICAgaW9uLXNlZ21lbnQtYnV0dG9uIHtcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICAgICAgLS1ib3JkZXItd2lkdGg6IDA7XG4gICAgICAgIC0taW5kaWNhdG9yLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgICAtLWluZGljYXRvci1jb2xvci1jaGVja2VkOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgICAgICBmb250LXNpemU6IDI1cHg7XG4gICAgICAgICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICAgIH1cbiAgICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICAgICAgfVxuICAgICAgICAuc2VnbWVudC1idXR0b24taW5kaWNhdG9yIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAmLnNlZ21lbnQtYnV0dG9uLWNoZWNrZWQge1xuICAgICAgICAgICAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgLS1vcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcbiAgICAgICAgICAgICAgICAtLWluZGljYXRvci1jb2xvci1jaGVja2VkOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgICAgICBsZWZ0OiA3MCU7XG4gICAgICAgICAgICBib3JkZXItdG9wOiAxcHggI2ZmZiBkYXNoZWQ7XG4gICAgICAgICAgICB0b3A6IDM1JTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuMTU7XG4gICAgICAgIH1cbiAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgICAgICBsZWZ0OiAtMjAlO1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMXB4ICNmZmYgZGFzaGVkO1xuICAgICAgICAgICAgdG9wOiAtNjQlO1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICAgICAgb3BhY2l0eTogMC4xNTtcbiAgICAgICAgfVxuICAgICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICYuc3VjY2VzcyB7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICAgICAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJjpiZWZvcmUsXG4gICAgICAgICAgICAmOmFmdGVyIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi5oYXMtZ3JpZHMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgLmRhdGEtZ3JpZCB7XG4gICAgICAgIHRleHQtYWxpZ246IHN0YXJ0O1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoNCB7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICB9XG4gICAgICAgIGlvbi1sYWJlbCB7XG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICB9XG4gICAgICAgIHAge1xuICAgICAgICAgICAgc3Bhbi5kaW1tZWQge1xuICAgICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAmLnBhY2thZ2Uge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmMWEyMjE7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwIDVweCA1cHggMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFweCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAwcHggM3B4ICNmYmUyYjk7XG4gICAgICAgICAgICBtYXJnaW46IDEwcHggM3B4O1xuICAgICAgICAgICAgYm9yZGVyLWxlZnQtd2lkdGg6IDVweDtcbiAgICAgICAgICAgIGlvbi1jb2wuYWN0aW9ucyB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgIC0tYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgLS1ib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAmLnBhY2thZ2UtcmV2aWV3IHtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkM2QzZDM7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICBzcGFuLnRpdGxlIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi5vcmRlci1zdWNjZXNzIHtcbiAgICBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTMwcHg7XG4gICAgfVxuICAgIHAge1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICYuc2hpcG1lbnQtbnVtYmVyIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmh0bWxbbGFuZz0nYXInXSB7XG4gICAgaW9uLXNlZ21lbnQub3JkZXItc3RlcHMge1xuICAgICAgICBpb24tc2VnbWVudC1idXR0b24ge1xuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIGxlZnQ6IGF1dG87XG4gICAgICAgICAgICAgICAgcmlnaHQ6IDcwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgIGxlZnQ6IGF1dG87XG4gICAgICAgICAgICAgICAgcmlnaHQ6IC0yMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW9uLXNlZ21lbnQub3JkZXItc3RlcHMge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xufVxuaW9uLXNlZ21lbnQub3JkZXItc3RlcHMgaW9uLXNlZ21lbnQtYnV0dG9uIHtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgLS1ib3JkZXItd2lkdGg6IDA7XG4gIC0taW5kaWNhdG9yLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAtLWluZGljYXRvci1jb2xvci1jaGVja2VkOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuaW9uLXNlZ21lbnQub3JkZXItc3RlcHMgaW9uLXNlZ21lbnQtYnV0dG9uIGlvbi1pY29uIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgcGFkZGluZzogOHB4O1xufVxuaW9uLXNlZ21lbnQub3JkZXItc3RlcHMgaW9uLXNlZ21lbnQtYnV0dG9uIGlvbi1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuaW9uLXNlZ21lbnQub3JkZXItc3RlcHMgaW9uLXNlZ21lbnQtYnV0dG9uIC5zZWdtZW50LWJ1dHRvbi1pbmRpY2F0b3Ige1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG5pb24tc2VnbWVudC5vcmRlci1zdGVwcyBpb24tc2VnbWVudC1idXR0b24uc2VnbWVudC1idXR0b24tY2hlY2tlZCB7XG4gIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbiAgLS1vcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG59XG5pb24tc2VnbWVudC5vcmRlci1zdGVwcyBpb24tc2VnbWVudC1idXR0b24uc2VnbWVudC1idXR0b24tY2hlY2tlZCBpb24taWNvbiB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xuICAtLWluZGljYXRvci1jb2xvci1jaGVja2VkOiB0cmFuc3BhcmVudDtcbn1cbmlvbi1zZWdtZW50Lm9yZGVyLXN0ZXBzIGlvbi1zZWdtZW50LWJ1dHRvbi5zZWdtZW50LWJ1dHRvbi1jaGVja2VkOmFmdGVyIHtcbiAgb3BhY2l0eTogMTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cbmlvbi1zZWdtZW50Lm9yZGVyLXN0ZXBzIGlvbi1zZWdtZW50LWJ1dHRvbjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICB3aWR0aDogNTAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMDtcbiAgbGVmdDogNzAlO1xuICBib3JkZXItdG9wOiAxcHggI2ZmZiBkYXNoZWQ7XG4gIHRvcDogMzUlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgei1pbmRleDogMTtcbiAgb3BhY2l0eTogMC4xNTtcbn1cbmlvbi1zZWdtZW50Lm9yZGVyLXN0ZXBzIGlvbi1zZWdtZW50LWJ1dHRvbjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHdpZHRoOiA1MCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAtMjAlO1xuICBib3JkZXItdG9wOiAxcHggI2ZmZiBkYXNoZWQ7XG4gIHRvcDogLTY0JTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHotaW5kZXg6IDE7XG4gIG9wYWNpdHk6IDAuMTU7XG59XG5pb24tc2VnbWVudC5vcmRlci1zdGVwcyBpb24tc2VnbWVudC1idXR0b246Zmlyc3QtY2hpbGQ6YWZ0ZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuaW9uLXNlZ21lbnQub3JkZXItc3RlcHMgaW9uLXNlZ21lbnQtYnV0dG9uOmxhc3QtY2hpbGQ6YmVmb3JlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbmlvbi1zZWdtZW50Lm9yZGVyLXN0ZXBzIGlvbi1zZWdtZW50LWJ1dHRvbi5zdWNjZXNzIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XG59XG5pb24tc2VnbWVudC5vcmRlci1zdGVwcyBpb24tc2VnbWVudC1idXR0b24uc3VjY2VzcyBpb24taWNvbiB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5pb24tc2VnbWVudC5vcmRlci1zdGVwcyBpb24tc2VnbWVudC1idXR0b24uc3VjY2VzczpiZWZvcmUsIGlvbi1zZWdtZW50Lm9yZGVyLXN0ZXBzIGlvbi1zZWdtZW50LWJ1dHRvbi5zdWNjZXNzOmFmdGVyIHtcbiAgb3BhY2l0eTogMTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmhhcy1ncmlkcyB7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uaGFzLWdyaWRzIC5kYXRhLWdyaWQge1xuICB0ZXh0LWFsaWduOiBzdGFydDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB3aWR0aDogMTAwJTtcbn1cbi5oYXMtZ3JpZHMgLmRhdGEtZ3JpZCBoNCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG4uaGFzLWdyaWRzIC5kYXRhLWdyaWQgaW9uLWxhYmVsIHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5oYXMtZ3JpZHMgLmRhdGEtZ3JpZCBwIHNwYW4uZGltbWVkIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xufVxuLmhhcy1ncmlkcyAuZGF0YS1ncmlkLnBhY2thZ2Uge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjFhMjIxO1xuICBib3JkZXItcmFkaXVzOiAwIDVweCA1cHggMDtcbiAgZm9udC1zaXplOiAxMXB4ICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IDAgMHB4IDNweCAjZmJlMmI5O1xuICBtYXJnaW46IDEwcHggM3B4O1xuICBib3JkZXItbGVmdC13aWR0aDogNXB4O1xufVxuLmhhcy1ncmlkcyAuZGF0YS1ncmlkLnBhY2thZ2UgaW9uLWNvbC5hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5oYXMtZ3JpZHMgLmRhdGEtZ3JpZC5wYWNrYWdlIGlvbi1jb2wuYWN0aW9ucyBpb24tYnV0dG9uIHtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICAtLWJveC1zaGFkb3c6IG5vbmU7XG4gIC0tYm9yZGVyLXJhZGl1czogMDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMTtcbn1cbi5oYXMtZ3JpZHMgLmRhdGEtZ3JpZC5wYWNrYWdlLXJldmlldyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkM2QzZDM7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cbi5oYXMtZ3JpZHMgLmRhdGEtZ3JpZC5wYWNrYWdlLXJldmlldyBzcGFuLnRpdGxlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xufVxuXG4ub3JkZXItc3VjY2VzcyBpb24taWNvbiB7XG4gIGZvbnQtc2l6ZTogMTMwcHg7XG59XG4ub3JkZXItc3VjY2VzcyBwIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNDAwO1xufVxuLm9yZGVyLXN1Y2Nlc3MgcC5zaGlwbWVudC1udW1iZXIge1xuICBmb250LXdlaWdodDogOTAwO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbmh0bWxbbGFuZz1hcl0gaW9uLXNlZ21lbnQub3JkZXItc3RlcHMgaW9uLXNlZ21lbnQtYnV0dG9uOmJlZm9yZSB7XG4gIGxlZnQ6IGF1dG87XG4gIHJpZ2h0OiA3MCU7XG59XG5odG1sW2xhbmc9YXJdIGlvbi1zZWdtZW50Lm9yZGVyLXN0ZXBzIGlvbi1zZWdtZW50LWJ1dHRvbjphZnRlciB7XG4gIGxlZnQ6IGF1dG87XG4gIHJpZ2h0OiAtMjAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/new-order/new-order.page.ts":
/*!*********************************************!*\
  !*** ./src/app/new-order/new-order.page.ts ***!
  \*********************************************/
/*! exports provided: NewOrderPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewOrderPage", function() { return NewOrderPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shared_new_address_new_address_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/new-address/new-address.component */ "./src/app/shared/new-address/new-address.component.ts");
/* harmony import */ var _shared_new_receiver_new_receiver_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/new-receiver/new-receiver.component */ "./src/app/shared/new-receiver/new-receiver.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var ionic_selectable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ionic-selectable */ "./node_modules/ionic-selectable/esm2015/ionic-selectable.min.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");












let NewOrderPage = class NewOrderPage {
    constructor(modalController, loadingCtrl, toastCtrl, apiService, navCtrl, authService, formBuilder, _translate) {
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.apiService = apiService;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this._translate = _translate;
        this.step = 1;
        this.slideOpts = {
            setWrapperSize: true,
            slidesPerView: 1,
            preloadImages: true,
            spaceBetween: 50,
            autoHeight: true
        };
        this.Opacity = 1;
        this.receivers = [];
        this.packages = [];
        this.isReturnDefray = false;
        this.today = new Date();
        this.datePickerObj = {
            inputDate: new Date(),
            fromDate: new Date(),
            toDate: null,
            showTodayButton: false,
            closeOnSelect: true,
            mondayFirst: false,
            titleLabel: 'Select a Date',
            monthsList: [
                'Jan',
                'Feb',
                'March',
                'April',
                'May',
                'June',
                'July',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec'
            ],
            weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            dateFormat: 'YYYY-MM-DD',
            clearButton: false,
            momentLocale: 'en-US',
            yearInAscending: true,
            btnCloseSetInReverse: false,
            btnProperties: {
                expand: 'block',
                fill: '',
                size: '',
                disabled: '',
                strong: '',
                color: '' // Default ''
            }
        };
        this.keyboardOpen = false;
        this.shipmentFirst = formBuilder.group({
            shipment_type: [1, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            sender_address: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            receiver_id: [null],
            receiver_address: [null],
            return_defray: [false],
            return_package_fee: [null],
            packaging_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            office_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            ship_date: [moment__WEBPACK_IMPORTED_MODULE_9__(this.today).format('YYYY-MM-DD')],
            payment_type: [1, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            package_fee: ['']
        });
        this.packageForm = formBuilder.group({
            category_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            quantity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            weight: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            weight_unit: ['kg'],
            height: [''],
            height_unit: ['cm'],
            width: [''],
            width_unit: ['cm'],
            length: [''],
            length_unit: ['cm'],
            description: ['']
        });
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.slides.lockSwipes(true);
            window.addEventListener('keyboardDidShow', event => {
                // Describe your logic which will be run each time when keyboard is about to be shown.
                // console.log('Keyboard is visible');
                this.keyboardOpen = true;
            });
            window.addEventListener('keyboardDidHide', () => {
                // Describe your logic which will be run each time keyboard is closed.
                // console.log('Keyboard is hide');
                this.keyboardOpen = false;
            });
            yield this.getUserAddresses();
            yield this.getPackageTypes();
            yield this.getOffices();
            yield this.getCategories();
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: this._translate.instant('general.loading'),
                duration: 2000
            });
            yield loading.present();
            const { role, data } = yield loading.onDidDismiss();
            // console.log('Loading dismissed!');
        });
    }
    defrayChange(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (event.target.checked) {
                // Add a new control in the arrayForm
                this.isReturnDefray = true;
                this.shipmentFirst.get('return_package_fee').updateValueAndValidity();
                this.shipmentFirst.get('package_fee').updateValueAndValidity();
            }
            else {
                this.isReturnDefray = false;
                this.shipmentFirst.controls.return_package_fee.clearValidators();
                this.shipmentFirst.controls.package_fee.clearValidators();
                this.shipmentFirst.get('return_package_fee').updateValueAndValidity();
                this.shipmentFirst.get('package_fee').updateValueAndValidity();
            }
        });
    }
    returnText(inCase) {
        switch (inCase) {
            case 'sender_address':
                return this.userAddresses.filter(ele => ele.id === this.shipmentFirst.controls.sender_address.value)[0].name;
                break;
            case 'receiver_id':
                return this.shipmentFirst.controls.receiver_id.value.name;
                break;
            case 'receiver_address':
                return this.receiverAddresses.filter(ele => ele.id === this.shipmentFirst.controls.receiver_address.value)[0].name;
                break;
            case 'packaging_id':
                return this.packageTypes.filter(ele => ele.id === this.shipmentFirst.controls.packaging_id.value)[0].name;
                break;
            case 'office_id':
                return this.offices.filter(ele => ele.id === this.shipmentFirst.controls.office_id.value)[0].name;
                break;
            default:
                break;
        }
        // return (arr.filter((ele) => { return ele.id == form.controls[control].value}))[0].name;
    }
    getCatName(catID) {
        return this.categories.filter(ele => ele.id === catID)[0].name;
    }
    typeChange() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // if (this.shipmentFirst.get('shipment_type').value === 2) {
            //   this.shipmentFirst.controls.receiver_id.clearValidators();
            //   this.shipmentFirst.controls.receiver_address.clearValidators();
            //   this.shipmentFirst.get('receiver_id').updateValueAndValidity();
            //   this.shipmentFirst.get('receiver_address').updateValueAndValidity();
            // } else {
            //   this.shipmentFirst
            //     .get('sender_address')
            //     .setValidators([Validators.required]);
            //   this.shipmentFirst
            //     .get('receiver_address')
            //     .setValidators([Validators.required]);
            //   this.shipmentFirst.get('receiver_id').updateValueAndValidity();
            //   this.shipmentFirst.get('receiver_address').updateValueAndValidity();
            // }
            // console.log(this.shipmentFirst.get('shipment_type').value);
            // console.log(this.shipmentFirst.valid);
        });
    }
    requiredIfValidator(predicate) {
        return formControl => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required(formControl);
            }
            this.shipmentFirst.updateValueAndValidity();
            return null;
        };
    }
    receiverChange() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () { });
    }
    appendPackage() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log(this.packageForm.value);
            // this.packages.toArray();
            yield this.packages.push(this.packageForm.value);
            yield this.packageFormReset();
            setTimeout(() => {
                this.slides.updateAutoHeight(200);
                this.slides.update();
            }, 200);
        });
    }
    removePackage(indx) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log(indx);
            this.packages.splice(indx, 1);
        });
    }
    searchUsers(event) {
        // console.log(event.text);
        // console.log(this.receiversComp.hasSearchText);
        if (this.receiversComp.hasSearchText) {
            this.receiversComp.showLoading();
            this.apiService.searchForUser(event.text).subscribe((users) => {
                // console.log(users);
                this.receivers = users;
                this.receiversComp.hideLoading();
            }, error => {
                // console.log(error);
                this.receiversComp.hideLoading();
            });
        }
    }
    getPackageTypes() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.apiService.getPackages().subscribe((pTypes) => {
                this.packageTypes = pTypes;
                // console.log('Package Types: ', this.packageTypes);
            }, error => {
                // console.error(error);
            });
        });
    }
    getCategories() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.apiService.getCategories().subscribe((cats) => {
                this.categories = cats;
                // console.log('Categories: ', this.categories);
            }, error => {
                // console.error(error);
            });
        });
    }
    getOffices() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.apiService.getOffices().subscribe((rOffices) => {
                this.offices = rOffices;
                // console.log('Offices: ', this.offices);
            }, error => {
                // console.error(error);
            });
        });
    }
    rcvDoneSelect(event) {
        // console.log(event);
        this.apiService
            .getUserAddresses(event.item.id, this.authService.userToken)
            .subscribe(recAddress => {
            this.receiverAddresses = recAddress;
            // console.log(this.receiverAddresses);
        }, error => {
            // console.log(error);
        });
    }
    clearRcvAddr(event) {
        this.receiverAddresses = [];
        this.shipmentFirst.get('receiver_address').patchValue(null);
    }
    getReceiverAddress() {
        const recData = this.shipmentFirst.get('receiver_id').value;
        this.apiService
            .getUserAddresses(recData.id, this.authService.userToken)
            .subscribe(recAddress => {
            this.receiverAddresses = recAddress;
            // console.log(this.receiverAddresses);
        }, error => {
            // console.log(error);
        });
    }
    packageFormReset() {
        this.packageForm.reset();
        this.packageForm.patchValue({
            weight_unit: 'kg',
            height_unit: 'cm',
            width_unit: 'cm',
            length_unit: 'cm'
        });
    }
    nextStep() {
        switch (this.step) {
            case 1:
                // console.log(this.shipmentFirst.value);
                if (this.shipmentFirst.valid) {
                    this.step = this.step + 1;
                    this.slides.lockSwipes(false);
                    this.slides.slideNext();
                    this.slides.lockSwipes(true);
                    // console.log(this.step);
                }
                break;
            case 2:
                if (this.packages.length > 0) {
                    if (this.packageForm.valid) {
                        this.appendPackage().then(() => {
                            this.step = this.step + 1;
                            this.slides.lockSwipes(false);
                            this.slides.slideNext();
                            this.slides.lockSwipes(true);
                            // console.log(this.step);
                            // console.log(this.packages);
                            this.packageFormReset();
                        });
                    }
                    else {
                        this.step = this.step + 1;
                        this.slides.lockSwipes(false);
                        this.slides.slideNext();
                        this.slides.lockSwipes(true);
                        // console.log(this.step);
                        // console.log(this.packages);
                    }
                }
                else {
                    this.appendPackage().then(() => {
                        this.step = this.step + 1;
                        this.slides.lockSwipes(false);
                        this.slides.slideNext();
                        this.slides.lockSwipes(true);
                        // console.log(this.step);
                        // console.log(this.packages);
                        this.packageFormReset();
                    });
                }
                break;
            case 3:
                // if (this.shipmentFirst.valid) {
                //   this.step = this.step + 1;
                //   this.slides.lockSwipes(false);
                //   this.slides.slideNext();
                //   this.slides.lockSwipes(true);
                //   console.log(this.step);
                // }
                this.submitOrder();
                break;
            default:
                break;
        }
    }
    getUserAddresses() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.apiService
                .getUserAddresses(this.authService.userData.id, this.authService.userToken)
                .subscribe((addresses) => {
                if (addresses && addresses.length > 0) {
                    this.userAddresses = addresses;
                    // console.log(this.userAddresses);
                }
            });
        });
    }
    newAddressModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _shared_new_address_new_address_component__WEBPACK_IMPORTED_MODULE_3__["NewAddressComponent"],
                componentProps: { type: 'user', receiverID: null },
                showBackdrop: false,
                cssClass: 'myClass'
            });
            modal.onWillDismiss().then(data => {
                // console.log('Modal closedd');
                this.Opacity = 1;
                // console.log(data);
                if (data.role === 'done') {
                    this.getUserAddresses();
                }
            });
            this.Opacity = 0;
            return yield modal.present();
        });
    }
    newReceiverAddressModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.shipmentFirst.controls.receiver_id.valid) {
                // console.log('valid receiver');
                const desiredReceiver = this.shipmentFirst.get('receiver_id').value;
                // console.log(desiredReceiver.id);
                const modal = yield this.modalController.create({
                    component: _shared_new_address_new_address_component__WEBPACK_IMPORTED_MODULE_3__["NewAddressComponent"],
                    componentProps: {
                        type: 'receiver',
                        receiverID: desiredReceiver.id
                    },
                    showBackdrop: false,
                    cssClass: 'myClass'
                });
                modal.onWillDismiss().then(data => {
                    // console.log('Modal closedd');
                    this.Opacity = 1;
                    // console.log(data);
                    if (data.role === 'done') {
                        this.getUserAddresses();
                        this.getReceiverAddress();
                    }
                });
                this.Opacity = 0;
                return yield modal.present();
            }
            else {
                this.showToast(this._translate.instant('general.select_sender_first'), 3000, 'bottom', 'danger');
            }
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
    newReceiverModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _shared_new_receiver_new_receiver_component__WEBPACK_IMPORTED_MODULE_4__["NewReceiverComponent"],
                showBackdrop: false,
                cssClass: 'myClass'
            });
            modal.onWillDismiss().then(data => {
                // console.log('Modal closedd');
                this.Opacity = 1;
                // console.log(data);
                if (data.role === 'done') {
                    this.getUserAddresses();
                }
            });
            this.Opacity = 0;
            return yield modal.present();
        });
    }
    submitOrder() {
        let rDefray = 0;
        let recID = null;
        if (this.shipmentFirst.controls.return_defray.value) {
            rDefray = 1;
        }
        if (this.shipmentFirst.controls.receiver_id.value !== null) {
            recID = this.shipmentFirst.controls.receiver_id.value.id;
        }
        let orderData;
        if (this.shipmentFirst.controls.shipment_type.value === 1) {
            orderData = {
                type: this.shipmentFirst.controls.shipment_type.value,
                sender_address_id: this.shipmentFirst.controls.sender_address.value,
                return_defray: rDefray,
                return_package_fee: this.shipmentFirst.controls.return_package_fee
                    .value,
                packaging_id: this.shipmentFirst.controls.packaging_id.value,
                office_id: this.shipmentFirst.controls.office_id.value,
                ship_date: this.shipmentFirst.controls.ship_date.value,
                payment_type: this.shipmentFirst.controls.payment_type.value,
                package_fee: this.shipmentFirst.controls.package_fee.value,
                items: this.packages
            };
        }
        else {
            orderData = {
                type: this.shipmentFirst.controls.shipment_type.value,
                sender_address_id: this.shipmentFirst.controls.sender_address.value,
                receiver_id: recID,
                receiver_address_id: this.shipmentFirst.controls.receiver_address.value,
                return_defray: rDefray,
                return_package_fee: this.shipmentFirst.controls.return_package_fee
                    .value,
                packaging_id: this.shipmentFirst.controls.packaging_id.value,
                office_id: this.shipmentFirst.controls.office_id.value,
                ship_date: this.shipmentFirst.controls.ship_date.value,
                payment_type: this.shipmentFirst.controls.payment_type.value,
                package_fee: this.shipmentFirst.controls.package_fee.value,
                items: this.packages
            };
        }
        // console.log(orderData);
        // console.log(this.packages);
        this.presentLoading();
        this.apiService.addOrder(this.authService.userToken, orderData).subscribe((resOrder) => {
            // console.log(resOrder);
            this.loadingCtrl.dismiss();
            this.orderDone = resOrder;
            this.step = this.step + 1;
            this.slides.lockSwipes(false);
            this.slides.slideNext();
            this.slides.lockSwipes(true);
            // console.log(this.step);
        }, error => {
            this.loadingCtrl.dismiss();
            console.error(error);
        });
    }
};
NewOrderPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('stepSlider', null),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonSlides"])
], NewOrderPage.prototype, "slides", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('slide2', { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], NewOrderPage.prototype, "slide2", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('rcv', null),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ionic_selectable__WEBPACK_IMPORTED_MODULE_8__["IonicSelectableComponent"])
], NewOrderPage.prototype, "receiversComp", void 0);
NewOrderPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-new-order',
        template: __webpack_require__(/*! raw-loader!./new-order.page.html */ "./node_modules/raw-loader/index.js!./src/app/new-order/new-order.page.html"),
        styles: [__webpack_require__(/*! ./new-order.page.scss */ "./src/app/new-order/new-order.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        _services_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateService"]])
], NewOrderPage);



/***/ })

}]);
//# sourceMappingURL=new-order-new-order-module-es2015.js.map
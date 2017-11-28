"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WarrantyInfo_1 = require("../model/WarrantyInfo");
var PrintReceiptComponent = /** @class */ (function () {
    function PrintReceiptComponent(_changeDetector) {
        this._changeDetector = _changeDetector;
        this.dsMobilePhone = '0734.588.883';
        this.dateObj = Date.now();
    }
    PrintReceiptComponent.prototype.ngOnInit = function () {
        this.insertDataToRecipe();
    };
    PrintReceiptComponent.prototype.print = function () {
        this.insertDataToRecipe();
        if (!this._changeDetector['destroyed']) {
            this._changeDetector.detectChanges();
        }
        var formModel = this.clientPF.value;
        this.warrantyInfo.brandName = formModel.phoneList[0].phoneBrand;
        this.warrantyInfo.modelName = formModel.phoneList[0].phoneModel;
        if (!this._changeDetector['destroyed']) {
            this._changeDetector.detectChanges();
        }
        var popupWin;
        var innerContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n    <html>\n      <head>\n        <style>\n        .center-title {\n            text-align-last: center;\n          }\n          .title-epmhasis {\n            font-weight: bold;\n          }\n          .input-data {\n            font-style: italic;\n          }\n          .inner-container{\n            background: #9fdfbf;\n          }\n          th, td{\n            border:2px solid black !important;\n            padding: 4px !important;\n            text-align: left;\n          }\n          .table-bordered {\n            border: 2px solid black !important;\n          }\n          .footer {\n            font-size: 10px;\n          }\n          .dotted-border {\n            padding-top: 26px;\n            border-top: 2px black dashed;\n            margin-top: 24px;\n          }\n          * {\n            box-sizing: border-box;\n          }\n          @page { size: auto;  margin: 4mm; }\n          /*@media (min-width: 992px)*/\n          .col-md-3 {\n            width: 25%;\n          }\n          .col-md-4 {\n              width: 33.33333333%;\n          }\n          /*@media (min-width: 992px)*/\n          .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9 {\n            float: left;\n          }\n          .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {\n            position: relative;\n            min-height: 1px;\n          }\n          .table {\n            width: 100%;\n            max-width: 100%;\n            font-size: 8px;\n          }\n          table {\n            background-color: transparent;\n          }\n          table {\n            border-spacing: 0;\n            border-collapse: collapse;\n            margin-top: 20px;\n          }\n          .table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, .table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th {\n            border-top: 0;\n          }\n          .col-md-offset-5 {\n            margin-left: 25%;\n          }\n          .col-md-offset-6{\n            margin-left: 40%;\n          }\n        </style>\n      </head>\n  <body>" + innerContents + "</body>\n    </html>");
    };
    PrintReceiptComponent.prototype.insertDataToRecipe = function () {
        var _this = this;
        var formModel = this.clientPF.value;
        var problems = [];
        formModel.phoneList[0].problems.forEach(function (prbl) {
            var problemName = prbl.problem.toLowerCase() === 'altele' ? prbl.partName : prbl.problem;
            problems.push(problemName);
            _this.warrantyInfo = new WarrantyInfo_1.WarrantyInfo(formModel.lastname, formModel.firstname, formModel.phone, _this.totalPrice, formModel.phoneList[0].phoneColor, formModel.phoneList[0].imei, '', '', formModel.phoneList[0].observation, formModel.tested, formModel.aboutUs, problems, formModel.appointment, formModel.phoneList[0].phoneCode, _this.noOfClients);
        });
    };
    __decorate([
        core_1.Input('clientPF')
    ], PrintReceiptComponent.prototype, "clientPF", void 0);
    __decorate([
        core_1.Input('totalPrice')
    ], PrintReceiptComponent.prototype, "totalPrice", void 0);
    __decorate([
        core_1.Input('noOfClients')
    ], PrintReceiptComponent.prototype, "noOfClients", void 0);
    PrintReceiptComponent = __decorate([
        core_1.Component({
            selector: 'app-print-receipt',
            templateUrl: 'print-receipt.component.html',
            styleUrls: ['print-receipt.component.css']
        })
    ], PrintReceiptComponent);
    return PrintReceiptComponent;
}());
exports.PrintReceiptComponent = PrintReceiptComponent;

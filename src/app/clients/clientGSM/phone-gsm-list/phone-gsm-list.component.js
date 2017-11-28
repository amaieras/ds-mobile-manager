"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PhoneGSMListComponent = /** @class */ (function () {
    function PhoneGSMListComponent(fb) {
        this.fb = fb;
        this.isRequiredModel = false;
        this.isRequired = false;
        this.phoneModelsArray = [];
        this.phoneBrandsArray = [];
        this.mainArray = [];
    }
    PhoneGSMListComponent.prototype.ngOnInit = function () {
        this.newItem = {
            phoneId: 1,
            modelId: 1
        };
        this.mainArray.push((this.newItem));
        this.addProblem();
    };
    PhoneGSMListComponent.prototype.addProblem = function () {
        var problemArray = this.phoneListGroup.controls['problems'];
        var newProblem = this.initProblem();
        problemArray.push(newProblem);
    };
    PhoneGSMListComponent.prototype.removeProblem = function (idx) {
        var problemArray = this.phoneListGroup.controls['problems'];
        problemArray.removeAt(idx);
    };
    PhoneGSMListComponent.prototype.onSelect = function () {
    };
    PhoneGSMListComponent.prototype.onModelSelect = function () {
    };
    PhoneGSMListComponent.prototype.initProblem = function () {
        return this.fb.group({
            problem: '',
            pricePerPart: '',
            partName: ''
        });
    };
    __decorate([
        core_1.Input('group')
    ], PhoneGSMListComponent.prototype, "phoneListGroup", void 0);
    PhoneGSMListComponent = __decorate([
        core_1.Component({
            selector: 'phone-gsm-list',
            templateUrl: 'phone-gsm-list.component.html'
        })
    ], PhoneGSMListComponent);
    return PhoneGSMListComponent;
}());
exports.PhoneGSMListComponent = PhoneGSMListComponent;

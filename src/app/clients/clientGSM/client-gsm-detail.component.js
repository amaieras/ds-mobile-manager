"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Address_1 = require("../../model/Address");
var ClientGSM_1 = require("../../model/ClientGSM");
var ClientGSMDetailComponent = /** @class */ (function () {
    function ClientGSMDetailComponent(fb, clientGSMService, utilService) {
        this.fb = fb;
        this.clientGSMService = clientGSMService;
        this.utilService = utilService;
        this.msgs = [];
        this.clientGSM = new ClientGSM_1.ClientGSM();
        this.saveClientGSM = new ClientGSM_1.ClientGSM();
    }
    ClientGSMDetailComponent.prototype.ngOnInit = function () {
        this.clientGSMForm = new forms_1.FormGroup({
            'lastname': new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            'firstname': new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            'firm': new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            'phone': new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            'email': new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            'priceOffer': new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            'country': new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            phoneList: this.fb.array([]),
            'city': new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            'billingAddress': this.fb.array([]),
            'shipmentAddress': this.fb.array([])
        });
        this.addInPhoneList();
    };
    ClientGSMDetailComponent.prototype.addInPhoneList = function () {
        var phoneListArray = this.clientGSMForm.controls['phoneList'];
        var newPhone = this.initPhoneList();
        phoneListArray.push(newPhone);
    };
    ClientGSMDetailComponent.prototype.removeFromPhoneList = function (idx) {
        var phoneListArray = this.clientGSMForm.controls['phoneList'];
        phoneListArray.removeAt(idx);
    };
    ClientGSMDetailComponent.prototype.initPhoneList = function () {
        return this.fb.group({
            phoneBrand: '',
            phoneModel: '',
            phoneColor: '',
            phoneQuantity: '',
            problems: this.fb.array([]),
            observation: ''
        });
    };
    ClientGSMDetailComponent.prototype.onSubmit = function (event) {
        this.prepareSaveClientGSM();
        event.preventDefault();
        if (!this.utilService.isNullOrUndefined(this.clientGSM.firm)) {
            this.clientGSM.firm = null;
        }
        this.clientGSMService.addGSMClient(this.clientGSM);
        this.clientGSMForm.reset();
        this.clientGSM = new ClientGSM_1.ClientGSM();
        this.successMessage();
    };
    ClientGSMDetailComponent.prototype.prepareSaveClientGSM = function () {
        var formModel = this.clientGSMForm.value;
        var billingAddressDeepCopy = formModel.billingAddress.map(function (address) { return Object.assign({}, address); });
        var shipmentAddressDeepCopy = formModel.shipmentAddress.map(function (address) { return Object.assign({}, address); });
        this.saveClientGSM.billingAddress = billingAddressDeepCopy;
        this.saveClientGSM.shipmentAddress = shipmentAddressDeepCopy;
        this.saveClientGSM.addedDate.day = new Date().getUTCDate().toString();
        this.saveClientGSM.addedDate.month = (new Date().getUTCMonth() + 1).toString();
        this.saveClientGSM.addedDate.year = new Date().getUTCFullYear().toString();
        this.saveClientGSM.addedDate.timestamp = new Date().getTime().toString();
    };
    ClientGSMDetailComponent.prototype.addBillingAddress = function () {
        if (this.billingAddress.length == 0) {
            this.billingAddress.push(this.fb.group(new Address_1.Address()));
        }
    };
    ClientGSMDetailComponent.prototype.addShipmentAddress = function () {
        if (this.shipmentAddress.length == 0) {
            this.shipmentAddress.push(this.fb.group(new Address_1.Address()));
        }
    };
    ClientGSMDetailComponent.prototype.successMessage = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Adauga Client GSM', detail: 'Client GSM adaugat cu success.' });
    };
    Object.defineProperty(ClientGSMDetailComponent.prototype, "lastname", {
        get: function () { return this.clientGSMForm.get('lastname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "firstname", {
        get: function () { return this.clientGSMForm.get('firstname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "firm", {
        get: function () { return this.clientGSMForm.get('firm'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "phone", {
        get: function () { return this.clientGSMForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "email", {
        get: function () { return this.clientGSMForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "priceOffer", {
        get: function () { return this.clientGSMForm.get('priceOffer'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "country", {
        get: function () { return this.clientGSMForm.get('country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "city", {
        get: function () { return this.clientGSMForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "billingAddress", {
        get: function () {
            return this.clientGSMForm.get('billingAddress');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientGSMDetailComponent.prototype, "shipmentAddress", {
        get: function () {
            return this.clientGSMForm.get('shipmentAddress');
        },
        enumerable: true,
        configurable: true
    });
    ClientGSMDetailComponent = __decorate([
        core_1.Component({
            selector: 'client-gsm-detail',
            templateUrl: './client-gsm-detail.component.html'
        })
    ], ClientGSMDetailComponent);
    return ClientGSMDetailComponent;
}());
exports.ClientGSMDetailComponent = ClientGSMDetailComponent;

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
var phone_validator_directive_1 = require("../../shared/phone-validator.directive");
var ClientPF_1 = require("../../model/ClientPF");
var Observable_1 = require("rxjs/Observable");
var print_receipt_component_1 = require("../../print/print-receipt.component");
var ClientPfDetailComponent = /** @class */ (function () {
    function ClientPfDetailComponent(_clientPFService, fb, _utilService, _problemListService, _aboutUsService, _phoneListService) {
        this._clientPFService = _clientPFService;
        this.fb = fb;
        this._utilService = _utilService;
        this._problemListService = _problemListService;
        this._aboutUsService = _aboutUsService;
        this._phoneListService = _phoneListService;
        this.clientPF = new ClientPF_1.ClientPF();
        this.msgs = [];
        this.defaultDate = new Date();
        this.saveClientPF = new ClientPF_1.ClientPF();
        this.isOtherRequired = false;
        this.aboutUsValExists = false;
        this.aboutUsList = [];
        this.selectedAboutUs = '';
        this.selectedOtherName = '';
        this.totalPrice = 0;
        this.noOfClients = 0;
        this.existingPartPrices = [];
        this.tests = [];
        this.mainArray = [];
        this.tests.push({ label: 'NU', value: 'NU' });
        this.tests.push({ label: 'DA', value: 'DA' });
    }
    ClientPfDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._clientPFService.getAllClients().subscribe(function (client) {
            _this.noOfClients = client.length;
        });
        this.populateDropDowns();
        this.clientPF.tested = this.saveClientPF.tested;
        this.defaultDate.setHours(12, 0);
        this.clientPFForm = this.fb.group({
            'lastname': new forms_1.FormControl('', []),
            'firstname': new forms_1.FormControl('', []),
            'email': new forms_1.FormControl('', []),
            'firm': new forms_1.FormControl('', []),
            'phone': new forms_1.FormControl('', [
                forms_1.Validators.required,
                phone_validator_directive_1.isValidPhoneNumber
            ]),
            phoneList: this.fb.array([]),
            'tested': new forms_1.FormControl('NU', []),
            'priceOffer': new forms_1.FormControl({ value: 0, disabled: true }),
            'appointment': new forms_1.FormControl(this.defaultDate.getTime().toString(), []),
            'aboutUs': new forms_1.FormControl('FACEBOOK', [])
        });
        this.initForm();
    };
    ClientPfDetailComponent.prototype.onSubmit = function (event) {
        this.prepareSavePhoneList();
        this.clientPF = this.saveClientPF;
        this.checkInputForNullOrUndefined();
        this._clientPFService.addPFClient(this.clientPF);
        this.resetAfterSubumit();
        this.successMessage();
    };
    ClientPfDetailComponent.prototype.resetAfterSubumit = function () {
        this.clientPF = new ClientPF_1.ClientPF();
        this.clientPFForm.controls['phoneList'] = this.fb.array([]);
        this.clientPFForm.reset();
        this.ngOnInit();
    };
    ClientPfDetailComponent.prototype.calculateTotalPrice = function () {
        var formModel = this.clientPFForm.value;
        var totalPrice = 0;
        for (var i = 0; i < formModel.phoneList.length; i++) {
            for (var j = 0; j < formModel.phoneList[i].problems.length; j++) {
                var item = formModel.phoneList[i].problems[j];
                if (item.pricePerPart !== '') {
                    totalPrice = totalPrice + item.pricePerPart;
                }
            }
        }
        this.totalPrice = totalPrice;
    };
    ClientPfDetailComponent.prototype.prepareSavePhoneList = function () {
        var formModel = this.clientPFForm.value;
        var PhoneListDeepCopy = formModel.phoneList.map(function (phoneList) { return Object.assign({}, phoneList); });
        this.addNewPartPrice(formModel);
        this.addNewProblemSynced(formModel);
        if (this.selectedOtherName !== '') {
            this._aboutUsService.addNewAboutUs(this.selectedOtherName);
        }
        this.saveClientPF.addedDate = new Date().getTime().toString();
        this.saveClientPF.phoneList = PhoneListDeepCopy;
        this.removeCtrlForNewItems();
        this.addNewBrandModelSynced(formModel);
        this.addNewSingleModelSynced(formModel);
        this.saveClientPF.phone = formModel.phone;
        this.saveClientPF.tested = formModel.tested;
        this.saveClientPF.aboutUs = this.selectedOtherName !== '' ? this.selectedOtherName : formModel.aboutUs;
        this.saveClientPF.priceOffer = this.totalPrice === null ? '0' : this.totalPrice.toString();
        this.saveClientPF.appointmentDate = this.defaultDate.getTime().toString();
    };
    ClientPfDetailComponent.prototype.removeCtrlForNewItems = function () {
        this.saveClientPF.phoneList.forEach(function (phone) {
            phone.problems.forEach(function (problem) {
                if (problem.partName !== undefined) {
                    problem.problem = problem.partName;
                    delete problem.partName;
                }
            });
            if (phone.newBrand !== undefined) {
                phone.phoneBrand = phone.newBrand;
                delete phone.newBrand;
            }
            if (phone.newModel !== undefined) {
                phone.phoneModel = phone.newModel;
                delete phone.newModel;
            }
            if (phone.newSingleModel !== undefined) {
                phone.phoneModel = phone.newSingleModel;
                delete phone.newSingleModel;
            }
        });
    };
    ClientPfDetailComponent.prototype.addInPhoneList = function () {
        var phoneListArray = this.clientPFForm.controls['phoneList'];
        var newPhone = this.initPhoneList();
        phoneListArray.push(newPhone);
    };
    ClientPfDetailComponent.prototype.removeFromPhoneList = function (idx) {
        var phoneListArray = this.clientPFForm.controls['phoneList'];
        phoneListArray.removeAt(idx);
    };
    /**
     * Add a new problem to be listed in problems dropdown
     * @param formModel
     */
    ClientPfDetailComponent.prototype.addNewProblemSynced = function (formModel) {
        for (var i = 0; i < formModel.phoneList.length; i++) {
            for (var j = 0; j < formModel.phoneList[i].problems.length; j++) {
                var item = formModel.phoneList[i].problems[j];
                if (item.partName !== undefined) {
                    this._problemListService.addNewProblem(item.partName);
                }
            }
        }
    };
    /**
     * When the selected problem is 'Altele' this method will add new price for that problem given the selected phoneBrand + phoneModel
     * When the selected problem is not 'Altele' this method will update the price for the selected phoneBrand + phoneModel + problem
     * @param formModel
     */
    ClientPfDetailComponent.prototype.addNewPartPrice = function (formModel) {
        var _this = this;
        this._clientPFService.getPartPrices().take(1).subscribe(function (part) {
            for (var i = 0; i < formModel.phoneList.length; i++) {
                var _loop_1 = function (j) {
                    var phoneItem = formModel.phoneList[i];
                    var problemItem = formModel.phoneList[i].problems[j];
                    var phoneProblem = problemItem.partName === undefined || problemItem.partName === 'Altele' ? problemItem.problem.toLowerCase() : problemItem.partName.toLowerCase();
                    _this.existingPartPrices = part.filter(function (item) { return item.phoneBrand.toLowerCase() === phoneItem.phoneBrand.toLowerCase()
                        && item.phoneModel.toLowerCase() === phoneItem.phoneModel.toLowerCase()
                        && item.problemId.toLowerCase() === phoneProblem; });
                    if (_this.existingPartPrices.length > 0) {
                        _this._clientPFService.updateItem(_this.existingPartPrices[0].$key, problemItem.pricePerPart);
                    }
                    else {
                        var phoneBrand = phoneItem.phoneBrand.toLowerCase() === 'altele' ? phoneItem.newBrand.toLowerCase() : phoneItem.phoneBrand.toLowerCase();
                        var phoneModel = phoneItem.phoneModel.toLowerCase();
                        if (phoneItem.phoneModel.toLowerCase() === 'altele') {
                            phoneModel = _this._utilService.isNullOrUndefined(phoneItem.newSingleModel) ? phoneItem.newSingleModel : phoneItem.newModel;
                        }
                        _this._clientPFService.addNewPartPrice(phoneBrand, phoneModel, +problemItem.pricePerPart, phoneProblem);
                    }
                };
                for (var j = 0; j < formModel.phoneList[i].problems.length; j++) {
                    _loop_1(j);
                }
            }
        });
    };
    ClientPfDetailComponent.prototype.addNewBrandModelSynced = function (formModel) {
        for (var i = 0; i < formModel.phoneList.length; i++) {
            var item = formModel.phoneList[i];
            if (item.newBrand !== '' && this._utilService.isNullOrUndefined(item.newBrand)
                && item.newModel !== '' && this._utilService.isNullOrUndefined(item.newModel)) {
                this._phoneListService.addNewBrand(item.newBrand);
                this._phoneListService.addNewModel(item.newModel, item.newBrand.toLowerCase());
            }
        }
    };
    ClientPfDetailComponent.prototype.addNewSingleModelSynced = function (formModel) {
        for (var i = 0; i < formModel.phoneList.length; i++) {
            var item = formModel.phoneList[i];
            if (item.newSingleModel !== '' && this._utilService.isNullOrUndefined(item.newSingleModel)) {
                var brandId = item.phoneBrand.toLowerCase();
                this._phoneListService.addNewModel(item.newSingleModel, brandId);
            }
        }
    };
    ClientPfDetailComponent.prototype.initPhoneList = function () {
        return this.fb.group({
            phoneBrand: '',
            phoneModel: '',
            phoneColor: '',
            problems: this.fb.array([]),
            observation: '',
            phoneCode: new forms_1.FormControl('', [
                forms_1.Validators.required
            ]),
            imei: new forms_1.FormControl('', [
                forms_1.Validators.maxLength(14),
            ])
        });
    };
    ClientPfDetailComponent.prototype.getPhoneItem = function (val) {
        this.phoneItem = val;
    };
    ClientPfDetailComponent.prototype.initForm = function () {
        this.priceOffer.setValue(0);
        this.addInPhoneList();
        this.resetAboutAs();
    };
    ClientPfDetailComponent.prototype.populateDropDowns = function () {
        var _this = this;
        this._aboutUsService.getAboutUsList().subscribe(function (aboutUsList) {
            _this.aboutUsList = [];
            aboutUsList.forEach(function (snapshot) {
                _this.aboutUsList.push({ label: snapshot.name, value: snapshot.name });
            });
        });
    };
    ClientPfDetailComponent.prototype.checkInputForNullOrUndefined = function () {
        if (!this._utilService.isNullOrUndefined(this.clientPF.imei)) {
            this.clientPF.imei = null;
        }
        if (!this._utilService.isNullOrUndefined(this.clientPF.firm)) {
            this.clientPF.firm = null;
        }
        if (!this._utilService.isNullOrUndefined(this.clientPF.email)) {
            this.clientPF.email = null;
        }
        if (!this._utilService.isNullOrUndefined(this.clientPF.firstname)) {
            this.clientPF.firstname = null;
        }
        if (!this._utilService.isNullOrUndefined(this.clientPF.lastname)) {
            this.clientPF.lastname = null;
        }
    };
    ClientPfDetailComponent.prototype.resetAboutAs = function () {
        if (this.selectedAboutUs !== 'FACEBOOK') {
            this.selectedAboutUs = 'FACEBOOK';
        }
        this.clientPFForm.removeControl('aboutAsName');
        this.isOtherRequired = false;
    };
    ClientPfDetailComponent.prototype.aboutUsNameValidator = function () {
        var aboutUs = this.aboutUsList;
        return Observable_1.Observable
            .of(this._utilService.containsObject(this.selectedOtherName, aboutUs))
            .map(function (result) { return !result ? null : { invalid: true }; });
    };
    ClientPfDetailComponent.prototype.checkIsOther = function (val) {
        this.isOtherRequired = this._utilService.checkIsOther(val.value);
        if (this.isOtherRequired) {
            this.clientPFForm.addControl('aboutAsName', new forms_1.FormControl('', forms_1.Validators.required, this.aboutUsNameValidator.bind(this)));
        }
        else {
            this.clientPFForm.removeControl('aboutAsName');
        }
    };
    ClientPfDetailComponent.prototype.checkIfAboutUsExists = function (newValue) {
        if (this._utilService.isNullOrUndefined(newValue)) {
            this.aboutUsValExists = this._utilService.containsObject(newValue, this.aboutUsList);
        }
    };
    ClientPfDetailComponent.prototype.print = function () {
        this.clientPFForm.patchValue({ appointment: this.defaultDate.getTime().toString() });
        this.child.print();
    };
    ClientPfDetailComponent.prototype.searchClient = function (clientLastName) {
        var q = clientLastName.target.value;
    };
    ClientPfDetailComponent.prototype.successMessage = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Adauga Client PF', detail: 'Client adaugat cu success.' });
    };
    Object.defineProperty(ClientPfDetailComponent.prototype, "lastname", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('lastname');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "firstname", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('firstname');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "email", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('email');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "firm", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('firm');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "phone", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('phone');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "tested", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('tested');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "priceOffer", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('priceOffer');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "appointment", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('appointment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "aboutUs", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('aboutUs');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "aboutAsName", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.clientPFForm.get('aboutAsName');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "isRepaired", {
        get: function () {
            return this.clientPFForm.get('isRepaired');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "deliveredDate", {
        get: function () {
            return this.clientPFForm.get('deliveredDate');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientPfDetailComponent.prototype, "phoneCode", {
        get: function () {
            return this.clientPFForm.get('phoneCode');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(print_receipt_component_1.PrintReceiptComponent)
    ], ClientPfDetailComponent.prototype, "child", void 0);
    ClientPfDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-client-pf-detail',
            templateUrl: './client-pf-detail.component.html',
        })
    ], ClientPfDetailComponent);
    return ClientPfDetailComponent;
}());
exports.ClientPfDetailComponent = ClientPfDetailComponent;

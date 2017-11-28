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
var phone_cascade_service_1 = require("../../../shared/phone-cascade.service");
var Observable_1 = require("rxjs/Observable");
var forbiddenStringInput_1 = require("../../../shared/forbiddenStringInput");
var ProblemPrice_1 = require("../../../model/ProblemPrice");
var PhoneListComponent = /** @class */ (function () {
    function PhoneListComponent(fb, _utilService, _phoneListService) {
        this.fb = fb;
        this._utilService = _utilService;
        this._phoneListService = _phoneListService;
        this.phoneItem = new core_1.EventEmitter();
        this.mainArray = [];
        this.phoneBrandsArray = [];
        this.phoneModelsArray = [];
        this.modelsArray = [];
        this.problemsPriceList = [];
        this.isRequired = false;
        this.isRequiredModel = false;
        this.newBrandNameExists = false;
        this.newModelNameExists = false;
        this.selectedModel = 'iPhone 7 Plus';
        this.selectedBrand = 'Iphone';
    }
    PhoneListComponent.prototype.ngOnInit = function () {
        this.populateAllDropDowns();
        this.initBrandModelList();
        this.addProblem();
    };
    PhoneListComponent.prototype.populateAllDropDowns = function () {
        var _this = this;
        this._phoneListService.getBrandList().subscribe(function (phoneModels) {
            _this.phoneBrandsArray = [];
            phoneModels.forEach(function (snapshot) {
                _this.phoneBrandsArray.push({ label: snapshot.name, value: snapshot.name });
            });
        });
        this._phoneListService.getModelList().subscribe(function (phoneBrands) {
            _this.phoneModelsArray = [];
            phoneBrands.forEach(function (snapshot) {
                _this.phoneModelsArray.push({ label: snapshot.name, value: snapshot.name, phoneId: snapshot.phoneId });
                _this.modelsArray = _this.phoneModelsArray;
            });
            _this.phoneModelsArray = _this.phoneModelsArray.filter(function (item) { return item.phoneId === "iphone" || item.phoneId === 'altele'; });
        });
        this._phoneListService.getPartPrices().subscribe(function (parts) {
            _this.problemsPriceList = [];
            parts.forEach(function (snapshot) {
                _this.problemsPriceList.push(new ProblemPrice_1.ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
            });
        });
    };
    PhoneListComponent.prototype.initBrandModelList = function () {
        this.newItem = {
            phoneId: "iphone",
            modelId: "iPhone 7 Plus"
        };
        this.mainArray.push(this.newItem);
    };
    PhoneListComponent.prototype.addProblem = function () {
        var problemArray = this.phoneListGroup.controls['problems'];
        var newProblem = this.initProblem();
        problemArray.push(newProblem);
        this.setPriceForNewPart(newProblem);
    };
    /**
     * Method that set the price for the initial problem 'Sticla' on component init and when
     * new part is added from the GUI
     *
     * @param {FormArray} problemArray
     */
    PhoneListComponent.prototype.setPriceForNewPart = function (newProblem) {
        var _this = this;
        this._phoneListService.getPartPrices().subscribe(function (parts) {
            _this.problemsPriceList = [];
            parts.forEach(function (snapshot) {
                _this.problemsPriceList.push(new ProblemPrice_1.ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
            });
            var that = _this;
            var results = _this.problemsPriceList.filter(function (part) {
                return part._phoneBrand.toLowerCase() === that.selectedBrand.toLowerCase()
                    && part._phoneModel.toLowerCase() === that.selectedModel.toLowerCase()
                    && part._problemId.toLowerCase() === 'sticla';
            });
            if (results[0] !== undefined) {
                newProblem.patchValue({ pricePerPart: results[0]._price });
            }
        });
    };
    PhoneListComponent.prototype.removeProblem = function (idx) {
        var problemArray = this.phoneListGroup.controls['problems'];
        problemArray.removeAt(idx);
    };
    PhoneListComponent.prototype.initProblem = function () {
        return this.fb.group({
            problem: '',
            pricePerPart: new forms_1.FormControl('', [
                forms_1.Validators.required,
                forbiddenStringInput_1.forbiddenStringInput(/^\\d+$/)
            ]),
        });
    };
    PhoneListComponent.prototype.onSelect = function (phoneId) {
        var _this = this;
        var problemArray = this.phoneListGroup.controls['problems'];
        var firstModelOfBrandPrint = this.getFirstModelOfBrand();
        this.selectedModel = firstModelOfBrandPrint;
        this.checkIsOtherBrandModel(phoneId);
        if (this.newModel !== null) {
            this.checkIfNewModelExists(this.newModel.value);
        }
        this._phoneListService.getModelList().subscribe(function (phoneBrands) {
            _this._phoneListService.getPartPrices().subscribe(function (parts) {
                _this.problemsPriceList = [];
                parts.forEach(function (snapshot) {
                    _this.problemsPriceList.push(new ProblemPrice_1.ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
                });
                _this.phoneModelsArray = [];
                phoneBrands.forEach(function (snapshot) {
                    _this.phoneModelsArray.push({ label: snapshot.name, value: snapshot.name, phoneId: snapshot.phoneId });
                });
                _this.onModelSelect(firstModelOfBrandPrint);
                _this.phoneModelsArray = _this.phoneModelsArray.filter(function (item) { return item.phoneId.toLowerCase() === phoneId.toLowerCase() || item.phoneId === 'altele'; });
                var _loop_1 = function (i) {
                    var that = _this;
                    var itemInput = problemArray.at(i);
                    if (firstModelOfBrandPrint !== null) {
                        var results = _this.problemsPriceList.filter(function (part) {
                            return part._phoneBrand.toLowerCase() === that.selectedBrand.toLowerCase()
                                && part._phoneModel.toLowerCase() === firstModelOfBrandPrint.toLowerCase()
                                && part._problemId.toLowerCase() === itemInput.controls['problem'].value.toLowerCase();
                        });
                        if (results.length > 0) {
                            if (results[0] !== undefined) {
                                itemInput.controls['pricePerPart'].setValue(results[0]._price);
                            }
                            else {
                                itemInput.controls['pricePerPart'].setValue(0);
                            }
                        }
                        else {
                            itemInput.controls['pricePerPart'].setValue(0);
                        }
                    }
                };
                for (var i = 0; i < problemArray.length; i++) {
                    _loop_1(i);
                }
                _this.phoneItem.emit(_this.phoneListGroup);
            });
        });
    };
    PhoneListComponent.prototype.getFirstModelOfBrand = function () {
        var _this = this;
        var firstModelId = this.modelsArray.filter(function (phone) { return phone.phoneId.toLowerCase() === _this.selectedBrand.toLowerCase(); });
        var firsModelOfBrand = firstModelId[0] === undefined ? null : firstModelId[0].label;
        return firsModelOfBrand;
    };
    PhoneListComponent.prototype.onModelSelect = function (modelId) {
        var _this = this;
        var problemArray = this.phoneListGroup.controls['problems'];
        this.checkIsOtherModel(modelId);
        var that = this;
        this._phoneListService.getPartPrices().subscribe(function (parts) {
            _this.problemsPriceList = [];
            parts.forEach(function (snapshot) {
                _this.problemsPriceList.push(new ProblemPrice_1.ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
            });
            var _loop_2 = function (i) {
                var itemInput = problemArray.at(i);
                var items = _this.problemsPriceList.filter(function (phone) {
                    return phone._phoneBrand.toLowerCase() === that.selectedBrand.toLowerCase()
                        && phone._phoneModel.toLowerCase() === modelId.toLowerCase()
                        && phone._problemId.toLowerCase() === itemInput.controls['problem'].value.toLowerCase();
                });
                if (items[0] !== undefined) {
                    itemInput.controls['pricePerPart'].setValue(items[0]._price);
                }
                else {
                    itemInput.controls['pricePerPart'].setValue(0);
                }
            };
            for (var i = 0; i < problemArray.length; i++) {
                _loop_2(i);
            }
        });
    };
    PhoneListComponent.prototype.checkIfNewBrandExists = function (newBrandName) {
        if (this._utilService.isNullOrUndefined(newBrandName)) {
            this.newBrandNameExists = this._utilService.containsObject(newBrandName, this.phoneBrandsArray);
        }
    };
    PhoneListComponent.prototype.checkIfNewModelExists = function (newModelName) {
        var _this = this;
        if (this._utilService.isNullOrUndefined(newModelName)) {
            this._phoneListService.getModelList().subscribe(function (phoneBrands) {
                _this.phoneModelsArray = [];
                phoneBrands.forEach(function (snapshot) {
                    _this.phoneModelsArray.push({ label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId });
                });
                _this.newModelNameExists = _this._utilService.containsObject(newModelName, _this.phoneModelsArray);
                if (!_this.newModelNameExists) {
                    _this.phoneModelsArray = _this.phoneModelsArray.filter(function (item) { return item.phoneId === 0; });
                }
            });
        }
    };
    PhoneListComponent.prototype.checkIsOtherBrandModel = function (val) {
        this.isRequired = this._utilService.checkIsOther(val);
        if (this.isRequired) {
            this.isRequiredModel = false;
            this.phoneListGroup.addControl('newBrand', new forms_1.FormControl('', forms_1.Validators.required, this.newBrandNameValidator.bind(this)));
            this.phoneListGroup.addControl('newModel', new forms_1.FormControl('', forms_1.Validators.required, this.newModelNameValidator.bind(this)));
        }
        else {
            this.phoneListGroup.removeControl('newBrand');
            this.phoneListGroup.removeControl('newModel');
        }
    };
    PhoneListComponent.prototype.checkIsOtherModel = function (val) {
        if (!this.isRequired) {
            this.isRequiredModel = this._utilService.checkIsOther(val);
        }
        if (this.isRequiredModel) {
            this.phoneListGroup.addControl('newSingleModel', new forms_1.FormControl('', forms_1.Validators.required, this.newSingleModelNameValidator.bind(this)));
        }
        else {
            this.phoneListGroup.removeControl('newSingleModel');
        }
    };
    PhoneListComponent.prototype.newBrandNameValidator = function () {
        var brandNames = this.phoneBrandsArray;
        return Observable_1.Observable
            .of(this._utilService.containsObject(this.newBrand.value, brandNames))
            .map(function (result) { return !result ? null : { invalid: true }; });
    };
    PhoneListComponent.prototype.newModelNameValidator = function () {
        var modelNames = this.phoneModelsArray;
        var modelName = this.newModel.value;
        return Observable_1.Observable
            .of(this._utilService.containsObject(modelName, modelNames))
            .map(function (result) { return !result ? null : { invalid: true }; });
    };
    PhoneListComponent.prototype.newSingleModelNameValidator = function () {
        var modelNames = this.phoneModelsArray;
        var modelName = this.newSingleModel.value;
        return Observable_1.Observable
            .of(this._utilService.containsObject(modelName, modelNames))
            .map(function (result) { return !result ? null : { invalid: true }; });
    };
    PhoneListComponent.prototype.setPartName = function (val) {
        this.partName = val;
    };
    Object.defineProperty(PhoneListComponent.prototype, "newBrand", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.phoneListGroup.get('newBrand');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhoneListComponent.prototype, "newModel", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.phoneListGroup.get('newModel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhoneListComponent.prototype, "newSingleModel", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.phoneListGroup.get('newSingleModel');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('group')
    ], PhoneListComponent.prototype, "phoneListGroup", void 0);
    __decorate([
        core_1.Input('clientPFForm')
    ], PhoneListComponent.prototype, "clientPFForm", void 0);
    __decorate([
        core_1.Output('change')
    ], PhoneListComponent.prototype, "phoneItem", void 0);
    PhoneListComponent = __decorate([
        core_1.Component({
            selector: 'app-phone-list',
            templateUrl: 'phone-list.component.html',
            providers: [phone_cascade_service_1.PhoneCascadeService]
        })
    ], PhoneListComponent);
    return PhoneListComponent;
}());
exports.PhoneListComponent = PhoneListComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var DropdownModel_1 = require("../../../../model/DropdownModel");
var Observable_1 = require("rxjs/Observable");
var ProblemPrice_1 = require("../../../../model/ProblemPrice");
var ProblemListComponent = /** @class */ (function () {
    function ProblemListComponent(_problemListService, _utilService, _changeDetector, _phoneListService) {
        this._problemListService = _problemListService;
        this._utilService = _utilService;
        this._changeDetector = _changeDetector;
        this._phoneListService = _phoneListService;
        this.selectedPartName = new core_1.EventEmitter();
        this.problemsList = [];
        this.selectedProblem = 'Sticla';
        this.problemsPriceList = [];
        this.isRequired = false;
        this.isPresent = false;
    }
    ProblemListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._problemListService.getProblemList().subscribe(function (problemsList) {
            _this.problemsList = [];
            problemsList.forEach(function (snapshot) {
                _this.problemsList.push(new DropdownModel_1.DropdownModel(snapshot.name, snapshot.name));
            });
            _this.problems = _this.problemsList;
        });
    };
    ProblemListComponent.prototype.newPartNameValidator = function () {
        var problems = this.problemsList;
        return Observable_1.Observable
            .of(this._utilService.containsObject(this.partName.value, problems))
            .map(function (result) { return !result ? null : { invalid: true }; });
    };
    ProblemListComponent.prototype.checkIfPartExists = function (newValue) {
        this.isPresent = this._utilService.containsObject(newValue, this.problemsList);
    };
    ProblemListComponent.prototype.checkIsOther = function (val) {
        var _this = this;
        this.setPriceForPart();
        this.selectedPartName.emit(val.selectedProblem);
        this._problemListService.getProblemPriceList().subscribe(function (problemsPriceList) {
            _this.problemsPriceList = [];
            problemsPriceList.forEach(function (snapshot) {
                _this.problemsPriceList.push(new ProblemPrice_1.ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
            });
            _this.problemsPriceList = _this.problemsPriceList.filter(function (item) { return item._problemId === val.selectedProblem; });
        });
        this.isRequired = this._utilService.checkIsOther(val.selectedProblem);
        if (this.isRequired) {
            this.problemListGroup.addControl('partName', new forms_1.FormControl('', forms_1.Validators.required, this.newPartNameValidator.bind(this)));
        }
        else {
            this.problemListGroup.removeControl('partName');
        }
        if (!this._changeDetector['destroyed']) {
            this._changeDetector.detectChanges();
        }
    };
    ProblemListComponent.prototype.setPriceForPart = function () {
        var phoneBrand = this.phoneGroup.controls['phoneBrand'].value.toLowerCase();
        var phoneModel = this.phoneGroup.controls['phoneModel'].value.toLowerCase();
        this.setPriceOnGUI(phoneBrand, phoneModel);
    };
    ProblemListComponent.prototype.setPriceOnGUI = function (phoneBrand, phoneModel) {
        var _this = this;
        this._phoneListService.getPartPrices().subscribe(function (parts) {
            _this.problemsPriceList = [];
            parts.forEach(function (snapshot) {
                _this.problemsPriceList.push(new ProblemPrice_1.ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
            });
            var items = _this.problemsPriceList.filter(function (phone) {
                return phone._phoneBrand.toLowerCase() === phoneBrand
                    && phone._phoneModel.toLowerCase() === phoneModel
                    && phone._problemId.toLowerCase() === _this.selectedProblem.toLowerCase();
            });
            if (items[0] !== undefined) {
                _this.problemListGroup.controls['pricePerPart'].setValue(items[0]._price);
            }
            else {
                _this.problemListGroup.controls['pricePerPart'].setValue(0);
            }
        });
    };
    Object.defineProperty(ProblemListComponent.prototype, "partName", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.problemListGroup.get('partName');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProblemListComponent.prototype, "phoneBrand", {
        get: function () {
            //noinspection TypeScriptUnresolvedFunction
            return this.phoneGroup.get('phoneBrand');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('group')
    ], ProblemListComponent.prototype, "problemListGroup", void 0);
    __decorate([
        core_1.Input('phoneGroup')
    ], ProblemListComponent.prototype, "phoneGroup", void 0);
    __decorate([
        core_1.Output()
    ], ProblemListComponent.prototype, "selectedPartName", void 0);
    ProblemListComponent = __decorate([
        core_1.Component({
            selector: 'app-problem-list',
            templateUrl: 'problem-list.component.html'
        })
    ], ProblemListComponent);
    return ProblemListComponent;
}());
exports.ProblemListComponent = ProblemListComponent;

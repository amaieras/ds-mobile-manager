"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/take");
var PhoneListService = /** @class */ (function () {
    function PhoneListService(db, _utilService) {
        this.db = db;
        this._utilService = _utilService;
        this.brandList = null;
        this.modelList = null;
        this.partsPrices = null;
        this.brandList = this.db.list('phones/phoneBrands');
        this.modelList = this.db.list('phones/phoneModels');
        this.partsPrices = this.db.list('parts-pf');
    }
    PhoneListService.prototype.ngOnInit = function () {
    };
    PhoneListService.prototype.getBrandList = function () {
        return this.brandList.snapshotChanges().map(function (arr) {
            //noinspection TypeScriptUnresolvedVariable
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
    };
    PhoneListService.prototype.getModelList = function () {
        return this.modelList.snapshotChanges().map(function (arr) {
            //noinspection TypeScriptUnresolvedVariable
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
    };
    PhoneListService.prototype.getBrandNameById = function (id) {
        var _this = this;
        return this.getBrandList().take(1).map(function (items) {
            items.filter(function (a) { return +a.$key === +id; })
                .map(function (cs) {
                return _this.item = cs.name;
            });
            return _this.item;
        });
    };
    PhoneListService.prototype.getModelNameById = function (id) {
        var _this = this;
        return this.getModelList().take(1).map(function (items) {
            items.filter(function (a) { return +a.$key === +id; })
                .map(function (cs) {
                return _this.item = cs.name;
            });
            return _this.item;
        });
    };
    PhoneListService.prototype.getMaxIdFromBrands = function () {
        var _this = this;
        return this.getBrandList().take(1).map(function (item) {
            return _this._utilService.getMaxIdNewItems(item);
        });
    };
    PhoneListService.prototype.getMaxIdFromModels = function () {
        var _this = this;
        return this.getModelList().take(1).map(function (item) {
            return _this._utilService.getMaxIdNewItems(item);
        });
    };
    PhoneListService.prototype.getPartPrices = function () {
        return this.partsPrices.snapshotChanges().map(function (arr) {
            //noinspection TypeScriptUnresolvedVariable
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
    };
    PhoneListService.prototype.addNewBrand = function (brandName) {
        this.brandList.push({ name: brandName });
    };
    PhoneListService.prototype.addNewModel = function (modelName, brandId) {
        this.modelList.push({ name: modelName, phoneId: brandId });
    };
    PhoneListService = __decorate([
        core_1.Injectable()
    ], PhoneListService);
    return PhoneListService;
}());
exports.PhoneListService = PhoneListService;

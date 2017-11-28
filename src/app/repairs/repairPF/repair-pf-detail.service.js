"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RepairPFDetailService = /** @class */ (function () {
    function RepairPFDetailService(db) {
        this.db = db;
        this.repairsPF = null;
        this.repairsPF = db.list('/clients/pf');
    }
    RepairPFDetailService.prototype.getClientsPFList = function () {
        this.repairsPF = this.db.list('/clients/pf');
        //noinspection TypeScriptUnresolvedFunction
        return this.repairsPF.snapshotChanges().map(function (arr) {
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
    };
    RepairPFDetailService.prototype.updateItem = function (key, value) {
        var _this = this;
        this.repairsPF.update(key, value)
            .catch(function (error) { return _this.handleError(error); });
    };
    RepairPFDetailService.prototype.handleError = function (error) {
        console.log(error);
    };
    RepairPFDetailService = __decorate([
        core_1.Injectable()
    ], RepairPFDetailService);
    return RepairPFDetailService;
}());
exports.RepairPFDetailService = RepairPFDetailService;

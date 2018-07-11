"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RepairGSMDetailService = /** @class */ (function () {
    function RepairGSMDetailService(db) {
        this.db = db;
        this.repairsGSM = null;
        this.repairsGSM = db.list('/clients/gsm');
    }
    RepairGSMDetailService.prototype.getClientsGSMList = function () {
        this.repairsGSM = this.db.list('/clients/gsm');
        return this.repairsGSM.snapshotChanges().map(function (arr) {
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
        ;
    };
    RepairGSMDetailService.prototype.updateItem = function (key, value) {
        var _this = this;
        this.repairsGSM.update(key, value)
            .catch(function (error) { return _this.handleError(error); });
    };
    RepairGSMDetailService.prototype.handleError = function (error) {
        console.log(error);
    };
    RepairGSMDetailService = __decorate([
        core_1.Injectable()
    ], RepairGSMDetailService);
    return RepairGSMDetailService;
}());
exports.RepairGSMDetailService = RepairGSMDetailService;

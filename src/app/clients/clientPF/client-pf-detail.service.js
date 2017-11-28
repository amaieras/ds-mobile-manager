"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ClientPFService = /** @class */ (function () {
    function ClientPFService(db) {
        this.db = db;
        this.clientsPF = null;
        this.partPrices = null;
        this.clients = null;
        this.clientsPF = db.list('/clients/pf');
        this.partPrices = db.list('parts-pf');
    }
    ClientPFService.prototype.getAllClients = function () {
        return this.clientsPF.snapshotChanges().map(function (arr) {
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
    };
    ClientPFService.prototype.addPFClient = function (clientPF) {
        this.clientsPF.push(clientPF);
    };
    ClientPFService.prototype.updateItem = function (key, value) {
        this.partPrices.update(key, { price: value });
    };
    ClientPFService.prototype.addNewPartPrice = function (phoneBrand, phoneModel, price, problemId) {
        this.partPrices.push({ phoneBrand: phoneBrand, phoneModel: phoneModel, price: price, problemId: problemId });
    };
    ClientPFService.prototype.getPartPrices = function () {
        return this.partPrices.snapshotChanges().map(function (arr) {
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
    };
    ClientPFService.prototype.getClients = function (start, end) {
    };
    ClientPFService = __decorate([
        core_1.Injectable()
    ], ClientPFService);
    return ClientPFService;
}());
exports.ClientPFService = ClientPFService;

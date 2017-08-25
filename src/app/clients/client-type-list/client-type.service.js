"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var of_1 = require("rxjs/observable/of");
require("rxjs/add/operator/delay");
var ClientType = (function () {
    function ClientType(id, type) {
        this.id = id;
        this.type = type;
    }
    return ClientType;
}());
exports.ClientType = ClientType;
exports.clientTypes = [
    {
        id: 1,
        type: 'PF'
    },
    {
        id: 2,
        type: 'GSM'
    }
];
var ClientTypeService = (function () {
    function ClientTypeService() {
    }
    ClientTypeService.prototype.getClientTypes = function () {
        return of_1.of(exports.clientTypes);
    };
    return ClientTypeService;
}());
ClientTypeService = __decorate([
    core_1.Injectable()
], ClientTypeService);
exports.ClientTypeService = ClientTypeService;
//# sourceMappingURL=client-type.service.js.map
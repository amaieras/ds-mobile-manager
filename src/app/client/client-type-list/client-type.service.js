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
var data_model_1 = require("../data-model");
var ClientTypeService = (function () {
    function ClientTypeService() {
        this.delayMs = 500;
        // Fake server update; assume nothing can go wrong
        // updateClienttype(clientType: ClientType): Observable<ClientType>  {
        //   const oldHero = clientTypes.find(c => c.id === clientType.id);
        //   const newHero = Object.assign(oldHero, clientType); // Demo: mutate cached hero
        //   return of(newHero).delay(this.delayMs); // simulate latency with delay
        // }
    }
    // Fake server get; assume nothing can go wrong
    ClientTypeService.prototype.getClientTypes = function () {
        return of_1.of(data_model_1.clientTypes).delay(this.delayMs); // simulate latency with delay
    };
    return ClientTypeService;
}());
ClientTypeService = __decorate([
    core_1.Injectable()
], ClientTypeService);
exports.ClientTypeService = ClientTypeService;
/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=client-type.service.js.map

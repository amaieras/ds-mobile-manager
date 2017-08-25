"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/finally");
var ClientTypeListComponent = (function () {
    function ClientTypeListComponent(clientTypeService) {
        this.clientTypeService = clientTypeService;
        this.isLoading = false;
    }
    ClientTypeListComponent.prototype.ngOnInit = function () { this.getClientTypes(); };
    ClientTypeListComponent.prototype.getClientTypes = function () {
        var _this = this;
        this.isLoading = true;
        this.clientTypes = this.clientTypeService.getClientTypes()
            .finally(function () { return _this.isLoading = false; });
        this.selectedClientType = undefined;
    };
    ClientTypeListComponent.prototype.select = function (clientType) { this.selectedClientType = clientType; };
    return ClientTypeListComponent;
}());
ClientTypeListComponent = __decorate([
    core_1.Component({
        selector: 'client-type-list',
        templateUrl: './client-type-list.component.html'
    })
], ClientTypeListComponent);
exports.ClientTypeListComponent = ClientTypeListComponent;
//# sourceMappingURL=client-type-list.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/finally");
var ClientTypeListComponent = /** @class */ (function () {
    function ClientTypeListComponent(clientTypeService, route, router) {
        this.clientTypeService = clientTypeService;
        this.route = route;
        this.router = router;
        this.isLoading = false;
    }
    ClientTypeListComponent.prototype.ngOnInit = function () {
        this.getClientTypes();
        this.selectedClientType = null;
    };
    ClientTypeListComponent.prototype.getClientTypes = function () {
        var _this = this;
        this.isLoading = true;
        this.clientTypes = this.clientTypeService.getClientTypes()
            .finally(function () { return _this.isLoading = false; });
        this.clientTypes.subscribe(function (data) { return ''; }, function (err) { return console.log(err + ' Error fetching client types.'); });
        this.selectedClientType = undefined;
    };
    ClientTypeListComponent.prototype.select = function (clientType) {
        this.selectedId = clientType.id;
        this.router.navigate([clientType.id], { relativeTo: this.route });
    };
    ClientTypeListComponent = __decorate([
        core_1.Component({
            selector: 'app-client-type-list',
            templateUrl: './client-type-list.component.html'
        })
    ], ClientTypeListComponent);
    return ClientTypeListComponent;
}());
exports.ClientTypeListComponent = ClientTypeListComponent;
//# sourceMappingURL=client-type-list.component.js.map
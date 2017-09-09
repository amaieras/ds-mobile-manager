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
var RepairTypeListComponent = /** @class */ (function () {
    function RepairTypeListComponent(repairTypeService, route, router) {
        this.repairTypeService = repairTypeService;
        this.route = route;
        this.router = router;
        this.isLoading = false;
    }
    RepairTypeListComponent.prototype.ngOnInit = function () {
        this.getRepairTypes();
        this.selectedClientType = null;
    };
    RepairTypeListComponent.prototype.getRepairTypes = function () {
        var _this = this;
        this.isLoading = true;
        this.repairTypes = this.repairTypeService.getRepairTypes()
            .finally(function () { return _this.isLoading = false; });
        this.selectedClientType = undefined;
    };
    RepairTypeListComponent.prototype.select = function (repairType) {
        this.selectedId = repairType.id;
        this.router.navigate([repairType.id], { relativeTo: this.route });
    };
    RepairTypeListComponent = __decorate([
        core_1.Component({
            selector: 'repair-type-list',
            templateUrl: './repair-type-list.component.html'
        })
    ], RepairTypeListComponent);
    return RepairTypeListComponent;
}());
exports.RepairTypeListComponent = RepairTypeListComponent;

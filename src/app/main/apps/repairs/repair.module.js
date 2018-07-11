"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var repair_type_list_component_1 = require("./repair-type-list/repair-type-list.component");
var repair_pf_detail_component_1 = require("./repairPF/repair-pf-detail.component");
var repair_gsm_detail_component_1 = require("./repairGSM/repair-gsm-detail.component");
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var repair_pf_detail_service_1 = require("./repairPF/repair-pf-detail.service");
var repair_gsm_detail_service_1 = require("./repairGSM/repair-gsm-detail.service");
var RepairModule = /** @class */ (function () {
    function RepairModule() {
    }
    RepairModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                primeng_1.DataTableModule,
                primeng_1.SharedModule,
                primeng_2.DialogModule,
                primeng_2.CheckboxModule,
                primeng_1.MultiSelectModule,
                primeng_1.DropdownModule,
                primeng_1.CalendarModule,
                //primeng
                primeng_1.GrowlModule
            ],
            declarations: [
                repair_type_list_component_1.RepairTypeListComponent,
                repair_pf_detail_component_1.RepairPFDetailComponent,
                repair_gsm_detail_component_1.RepairGSMDetailComponent
            ],
            providers: [
                repair_pf_detail_service_1.RepairPFDetailService,
                repair_gsm_detail_service_1.RepairGSMDetailService
            ]
        })
    ], RepairModule);
    return RepairModule;
}());
exports.RepairModule = RepairModule;

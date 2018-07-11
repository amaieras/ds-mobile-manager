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
var primeng_1 = require("primeng/primeng");
var client_type_list_component_1 = require("./client-type-list/client-type-list.component");
var client_type_service_1 = require("./client-type-list/client-type.service");
var client_pf_detail_component_1 = require("./clientPF/client-pf-detail.component");
var client_pf_detail_service_1 = require("./clientPF/client-pf-detail.service");
var client_gsm_detail_component_1 = require("./clientGSM/client-gsm-detail.component");
var client_gsm_detail_service_1 = require("./clientGSM/client-gsm-detail.service");
var util_service_1 = require("../../../utils/util.service");
var phone_list_component_1 = require("./clientPF/phone-list/phone-list.component");
var problem_list_component_1 = require("./clientPF/phone-list/problem-list/problem-list.component");
var problem_gsm_list_component_1 = require("./clientGSM/phone-gsm-list/problem-gsm-list/problem-gsm-list.component");
var phone_gsm_list_component_1 = require("./clientGSM/phone-gsm-list/phone-gsm-list.component");
var problem_list_service_1 = require("./clientPF/phone-list/problem-list/problem-list.service");
var phone_cascade_service_1 = require("../../../shared/phone-cascade.service");
var about_us_service_1 = require("app/clients/clientPF/phone-list/about-us/about-us.service");
var client_gsm_display_component_1 = require("../../../clients/clientGSMDisplay/client-gsm-display.component");
var phone_list_service_1 = require("./clientPF/phone-list/phone-list.service");
var print_receipt_component_1 = require("../print/print-receipt.component");
var ClientModule = /** @class */ (function () {
    function ClientModule() {
    }
    ClientModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                //primeng
                primeng_1.GrowlModule,
                primeng_1.DropdownModule,
                primeng_1.CalendarModule,
                primeng_1.SpinnerModule,
                primeng_1.TooltipModule
            ],
            declarations: [
                client_type_list_component_1.ClientTypeListComponent,
                client_pf_detail_component_1.ClientPfDetailComponent,
                client_gsm_detail_component_1.ClientGSMDetailComponent,
                phone_list_component_1.PhoneListComponent,
                problem_list_component_1.ProblemListComponent,
                problem_gsm_list_component_1.ProblemGSMListComponent,
                phone_gsm_list_component_1.PhoneGSMListComponent,
                client_gsm_display_component_1.ClientGSMDisplayComponent,
                print_receipt_component_1.PrintReceiptComponent
            ],
            providers: [
                client_type_service_1.ClientTypeService,
                client_pf_detail_service_1.ClientPFService,
                client_gsm_detail_service_1.ClientGSMService,
                util_service_1.UtilService,
                problem_list_service_1.ProblemListService,
                client_type_service_1.ClientTypeService,
                phone_cascade_service_1.PhoneCascadeService,
                about_us_service_1.AboutUsService,
                phone_list_service_1.PhoneListService
            ]
        })
    ], ClientModule);
    return ClientModule;
}());
exports.ClientModule = ClientModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var client_type_list_component_1 = require("./client-type-list/client-type-list.component");
var client_pf_detail_component_1 = require("./clientPF/client-pf-detail.component");
var client_gsm_detail_component_1 = require("./clientGSM/client-gsm-detail.component");
var client_gsm_display_component_1 = require("../../../clients/clientGSMDisplay/client-gsm-display.component");
var clientsCenterRoutes = [
    {
        path: 'clients',
        component: client_type_list_component_1.ClientTypeListComponent,
        children: [
            {
                path: '',
                redirectTo: 'clients',
                pathMatch: 'full'
            },
            {
                path: 'pf',
                component: client_pf_detail_component_1.ClientPfDetailComponent
            },
            {
                path: 'gsm',
                component: client_gsm_detail_component_1.ClientGSMDetailComponent
            },
            {
                path: 'gsm-display',
                component: client_gsm_display_component_1.ClientGSMDisplayComponent
            }
        ],
        data: {
            title: 'Client'
        }
    }
];
var ClientCenterRoutingModule = /** @class */ (function () {
    function ClientCenterRoutingModule() {
    }
    ClientCenterRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(clientsCenterRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: []
        })
    ], ClientCenterRoutingModule);
    return ClientCenterRoutingModule;
}());
exports.ClientCenterRoutingModule = ClientCenterRoutingModule;

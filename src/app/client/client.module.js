"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var client_routing_module_1 = require("./client-routing.module");
var client_page_component_1 = require("./client-page/client-page.component");
var client_list_component_1 = require("./client-type-list/client-list.component");
var client_type_service_1 = require("./client-type-list/client-type.service");
var ClientModule = (function () {
    function ClientModule() {
    }
    return ClientModule;
}());
ClientModule = __decorate([
    core_1.NgModule({
        exports: [
            client_list_component_1.ClientTypeListComponent
        ],
        imports: [
            common_1.CommonModule,
            client_routing_module_1.ClientRoutingModule
        ],
        declarations: [
            client_page_component_1.ClientPageComponent,
            client_list_component_1.ClientTypeListComponent
        ],
        providers: [
            client_type_service_1.ClientTypeService
        ]
    })
], ClientModule);
exports.ClientModule = ClientModule;

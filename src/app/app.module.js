"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
var app_common_module_1 = require("./app-common/app-common.module");
var router_1 = require("@angular/router");
var angularfire2_1 = require("angularfire2");
var database_1 = require("angularfire2/database");
var auth_1 = require("angularfire2/auth");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var app_toolbar_service_1 = require("./app-toolbar/app-toolbar.service");
var client_module_1 = require("./clients/client.module");
var client_center_routing_module_1 = require("./clients/client-center-routing.module");
require("hammerjs");
var repair_module_1 = require("./repairs/repair.module");
var repair_center_routing_module_1 = require("./repairs/repair-center-routing.module");
var firestore_1 = require("angularfire2/firestore");
var checkout_module_1 = require("./checkout/checkout.module");
exports.environment = {
    production: false,
    firebaseConfig: {
        apiKey: 'AIzaSyDL-_f_lQb4dnkx6GRrL7O7L7sp2A1Kj1w',
        authDomain: 'ds-mobile-dev.firebaseapp.com',
        databaseURL: 'https://ds-mobile-dev.firebaseio.com',
        projectId: 'ds-mobile-dev',
        storageBucket: 'ds-mobile-dev.appspot.com',
        messagingSenderId: '931169905269'
    },
    firebaseConfigProd: {
        apiKey: 'AIzaSyAexP1Haz3RsxHqPX--XncgC1Rxef_wMDA',
        authDomain: 'ds-mobile-prod.firebaseapp.com',
        databaseURL: 'https://ds-mobile-prod.firebaseio.com',
        projectId: 'ds-mobile-prod',
        storageBucket: '',
        messagingSenderId: '662623055885'
    }
};
exports.firebaseConfig = exports.environment.firebaseConfig;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                animations_1.BrowserAnimationsModule,
                app_common_module_1.AppCommonModule,
                app_routing_module_1.AppRoutingModule,
                router_1.RouterModule,
                client_module_1.ClientModule,
                repair_module_1.RepairModule,
                checkout_module_1.CheckoutModule,
                client_center_routing_module_1.ClientCenterRoutingModule,
                repair_module_1.RepairModule,
                repair_center_routing_module_1.RepairCenterRoutingModule,
                router_1.RouterModule.forRoot([{
                        path: '', redirectTo: '/client', pathMatch: 'full'
                    }]),
                //firebase
                angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig),
                database_1.AngularFireDatabaseModule,
                auth_1.AngularFireAuthModule,
                firestore_1.AngularFirestoreModule
            ],
            providers: [app_toolbar_service_1.AppToolbarService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

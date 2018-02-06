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
var offer_option_list_component_1 = require("./offer-option-list/offer-option-list.component");
var add_offer_component_1 = require("./offer-add/add-offer.component");
var view_offer_component_1 = require("./offer-view/view-offer.component");
var offerCenterRoutes = [
    {
        path: 'offer',
        component: offer_option_list_component_1.OfferOptionListComponent,
        children: [
            {
                path: '',
                redirectTo: 'offer',
                pathMatch: 'full'
            },
            {
                path: 'add',
                component: add_offer_component_1.AddOfferComponent
            },
            {
                path: 'view',
                component: view_offer_component_1.ViewOfferComponent
            }
        ],
        data: {
            title: 'Adaugă ofertă'
        }
    }
];
var OfferCenterRouting = /** @class */ (function () {
    function OfferCenterRouting() {
    }
    OfferCenterRouting = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(offerCenterRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: []
        })
    ], OfferCenterRouting);
    return OfferCenterRouting;
}());
exports.OfferCenterRouting = OfferCenterRouting;

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
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
var MenuItem = /** @class */ (function () {
    function MenuItem() {
    }
    return MenuItem;
}());
exports.MenuItem = MenuItem;
var AppToolbarService = /** @class */ (function () {
    function AppToolbarService(router, titleService) {
        var _this = this;
        this.router = router;
        this.titleService = titleService;
        this.activeMenuItem$ = this.router.events
            .filter(function (e) { return e instanceof router_1.NavigationEnd; })
            .map(function (_) { return _this.router.routerState.root; })
            .map(function (route) {
            var active = _this.lastRouteWithMenuItem(route.root);
            _this.titleService.setTitle(active.title);
            return active;
        });
    }
    AppToolbarService.prototype.getMenuItems = function () {
        return this.router.config
            .filter(function (route) { return route.data && route.data.title; })
            .map(function (route) {
            if (!route.data.title) {
                throw new Error('Missing title for toolbar menu route ' + route.path);
            }
            return {
                path: route.path,
                title: route.data.title,
                icon: route.data.icon
            };
        });
    };
    AppToolbarService.prototype.lastRouteWithMenuItem = function (route) {
        var lastMenu = undefined;
        do {
            lastMenu = this.extractMenu(route) || lastMenu;
        } while ((route = route.firstChild));
        return lastMenu;
    };
    AppToolbarService.prototype.extractMenu = function (route) {
        var cfg = route.routeConfig;
        return cfg && cfg.data && cfg.data.title
            ? { path: cfg.path, title: cfg.data.title, icon: cfg.data.icon }
            : undefined;
    };
    AppToolbarService = __decorate([
        core_1.Injectable()
    ], AppToolbarService);
    return AppToolbarService;
}());
exports.AppToolbarService = AppToolbarService;

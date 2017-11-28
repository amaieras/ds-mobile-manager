"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UtilService = /** @class */ (function () {
    function UtilService() {
    }
    /**
     * Check if a given value is null or Undefined
     * TODO - replace usage with isUndefined and isNullOrUndefined
     * @param x
     * @returns {boolean}
     */
    UtilService.prototype.isNullOrUndefined = function (x) {
        if (x == null) {
            return false;
        }
        if (x === null) {
            return false;
        }
        if (typeof x === 'undefined') {
            return false;
        }
        return true;
    };
    /**
     * Check if the users selects 'Altele' from the dropdown
     * @param part
     * @returns {boolean}
     */
    UtilService.prototype.checkIsOther = function (part) {
        if (part.toLowerCase() !== 'altele') {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Check if a string is present in a property of a given object
     * @param partName
     * @param list
     * @returns {any}
     */
    UtilService.prototype.containsObject = function (newName, list) {
        var found = list.some(function (el) {
            return el.label.toUpperCase().trim() === newName.toUpperCase().trim();
        });
        return found;
    };
    /**
     * Return the max id for a given array of objects
     * @param itemsList
     * @returns {any}
     */
    UtilService.prototype.getMaxIdNewItems = function (itemsList) {
        var maxId = Math.max.apply(Math, itemsList.map(function (o) {
            return o.id;
        }));
        return maxId;
    };
    UtilService = __decorate([
        core_1.Injectable()
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;

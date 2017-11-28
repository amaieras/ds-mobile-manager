"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Spacaru on 10/22/2017.
 */
var DropdownModel = /** @class */ (function () {
    function DropdownModel(label, value) {
        this._label = label;
        this._value = value;
    }
    Object.defineProperty(DropdownModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownModel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    return DropdownModel;
}());
exports.DropdownModel = DropdownModel;

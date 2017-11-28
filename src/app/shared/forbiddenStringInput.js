"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function forbiddenStringInput(priceRe) {
    return function (control) {
        var forbidden = priceRe.test(control.value);
        return forbidden ? { 'forbiddenStringInput': { value: control.value } } : null;
    };
}
exports.forbiddenStringInput = forbiddenStringInput;

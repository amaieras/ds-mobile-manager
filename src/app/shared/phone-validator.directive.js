"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidPhoneNumber(input) {
    var isValidPhoneFormat = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/.test(input.value);
    return isValidPhoneFormat ? null : { formatIsOk: true };
}
exports.isValidPhoneNumber = isValidPhoneNumber;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WarrantyInfo = /** @class */ (function () {
    function WarrantyInfo(lastname, firstname, phoneNumber, price, phoneColor, imei, brandName, modelName, observation, tested, aboutUs, parts, deliveredTime, phoneCode, noOfClients) {
        this._lastname = lastname;
        this._firstname = firstname;
        this._phoneNumber = phoneNumber;
        this._price = price;
        this._phoneColor = phoneColor;
        this._imei = imei;
        this._brandName = brandName;
        this._modelName = modelName;
        this._observation = observation;
        this._tested = tested;
        this._aboutUs = aboutUs;
        this._parts = parts;
        this._deliveredTime = deliveredTime;
        this._phoneCode = phoneCode;
        this._noOfClients = noOfClients;
    }
    Object.defineProperty(WarrantyInfo.prototype, "noOfClients", {
        get: function () {
            return this._noOfClients;
        },
        set: function (value) {
            this._noOfClients = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "phoneCode", {
        get: function () {
            return this._phoneCode;
        },
        set: function (value) {
            this._phoneCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "deliveredTime", {
        get: function () {
            return this._deliveredTime;
        },
        set: function (value) {
            this._deliveredTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "parts", {
        get: function () {
            return this._parts;
        },
        set: function (value) {
            this._parts = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "tested", {
        get: function () {
            return this._tested;
        },
        set: function (value) {
            this._tested = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "aboutUs", {
        get: function () {
            return this._aboutUs;
        },
        set: function (value) {
            this._aboutUs = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "observation", {
        get: function () {
            return this._observation;
        },
        set: function (value) {
            this._observation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "lastname", {
        get: function () {
            return this._lastname;
        },
        set: function (value) {
            this._lastname = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "firstname", {
        get: function () {
            return this._firstname;
        },
        set: function (value) {
            this._firstname = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "phoneNumber", {
        get: function () {
            return this._phoneNumber;
        },
        set: function (value) {
            this._phoneNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "phoneColor", {
        get: function () {
            return this._phoneColor;
        },
        set: function (value) {
            this._phoneColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "imei", {
        get: function () {
            return this._imei;
        },
        set: function (value) {
            this._imei = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "brandName", {
        get: function () {
            return this._brandName;
        },
        set: function (value) {
            this._brandName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarrantyInfo.prototype, "modelName", {
        get: function () {
            return this._modelName;
        },
        set: function (value) {
            this._modelName = value;
        },
        enumerable: true,
        configurable: true
    });
    return WarrantyInfo;
}());
exports.WarrantyInfo = WarrantyInfo;

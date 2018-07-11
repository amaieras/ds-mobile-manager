"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RepairGSMDetailComponent = /** @class */ (function () {
    function RepairGSMDetailComponent(repairGSMService) {
        this.repairGSMService = repairGSMService;
        this.msgs = [];
    }
    RepairGSMDetailComponent.prototype.ngOnInit = function () {
        this.getClientsGSMList();
        this.cols = [
            { field: 'addedDate.day', header: 'Data introducerii', filter: true },
            { field: 'lastname', header: 'Nume', filter: true },
            { field: 'firstname', header: 'Prenume', filter: true },
            { field: 'firm', header: 'Firma', filter: true },
            { field: 'phone', header: 'Numar telefon', filter: true },
            { field: 'email', header: 'E-mail', filter: true },
            { field: 'country', header: 'Tara', filter: true },
            { field: 'city', header: 'Orasul', filter: true },
            { field: 'billingAddress.0.country', header: 'Adresa de facturare', filter: true },
            { field: 'shipmentAddress.0.country', header: 'Adresa de livrare', filter: true }
        ];
        this.columnOptions = [];
        for (var i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
    };
    RepairGSMDetailComponent.prototype.updateField = function (event) {
        this.repairGSMService.updateItem(event.data.$key, { lastname: event.data.lastname });
        this.repairGSMService.updateItem(event.data.$key, { firstname: event.data.firstname });
        if (this.check(event.data.firm)) {
            this.repairGSMService.updateItem(event.data.$key, { firm: event.data.firm });
        }
        this.repairGSMService.updateItem(event.data.$key, { phone: event.data.phone });
        this.repairGSMService.updateItem(event.data.$key, { email: event.data.email });
        this.repairGSMService.updateItem(event.data.$key, { country: event.data.country });
        this.repairGSMService.updateItem(event.data.$key, { city: event.data.city });
        this.successMessage(event.data.lastname, event.data.firstname);
    };
    RepairGSMDetailComponent.prototype.getClientsGSMList = function () {
        this.repairsGSM = this.repairGSMService
            .getClientsGSMList();
    };
    RepairGSMDetailComponent.prototype.successMessage = function (lastname, firstname) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Valoare modificata pentru clientul: ' + lastname + ' ' + firstname, detail: 'Date modificate.' });
    };
    RepairGSMDetailComponent.prototype.check = function (x) {
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
    RepairGSMDetailComponent = __decorate([
        core_1.Component({
            selector: 'repair-gsm-detail',
            templateUrl: './repair-gsm-detail.component.html'
        })
    ], RepairGSMDetailComponent);
    return RepairGSMDetailComponent;
}());
exports.RepairGSMDetailComponent = RepairGSMDetailComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RepairPFDetailComponent = /** @class */ (function () {
    function RepairPFDetailComponent(repairPFService, _utilService, _el) {
        var _this = this;
        this.repairPFService = repairPFService;
        this._utilService = _utilService;
        this._el = _el;
        this.loading = true;
        this.msgs = [];
        this.defaultDate = new Date();
        this.scroll = function () {
            var tableOffset = _this._el.nativeElement.querySelector('table').getBoundingClientRect().top;
            if (tableOffset < 0) {
                _this._el.nativeElement.querySelector('thead').classList.add('sticky-head');
            }
            else {
                _this._el.nativeElement.querySelector('thead').classList.remove('sticky-head');
            }
        };
    }
    RepairPFDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        window.addEventListener('scroll', this.scroll, true); //third parameter
        this.defaultDate.setHours(12, 0);
        setTimeout(function () {
            _this.loading = true;
            _this.getClientsPFList().subscribe(function (item) {
                _this.dataSource = item;
                _this.totalRecords = _this.dataSource.length;
                _this.repairsPF = _this.dataSource;
                _this.loading = false;
                _this.testingValues = [{ label: 'DA', value: 'DA' }, { label: 'NU', value: 'NU' }];
                _this.cols = [
                    { field: 'addedDate', header: 'Data introducerii', filter: true, sortable: true },
                    { field: 'lastname', header: 'Nume', filter: true, editable: true, sortable: true },
                    { field: 'firstname', header: 'Prenume', filter: true, editable: true, sortable: true },
                    { field: 'email', header: 'Email', filter: true, editable: true, sortable: true },
                    { field: 'firm', header: 'Firma', filter: true, editable: true, sortable: true },
                    { field: 'phone', header: 'Telefon', filter: true, editable: true, sortable: true },
                    { field: 'phoneList', header: 'Model', filter: true, sortable: true },
                    { field: 'problem', header: 'Problema', filter: true, sortable: true },
                    { field: 'imei', header: 'IMEI', filter: true, sortable: true },
                    { field: 'priceOffer', header: 'Oferta pret', filter: true, editable: true, sortable: true },
                    { field: 'appointmentDate', header: 'Data si ora programarii', filter: true, editable: true, sortable: true },
                    { field: 'tested', header: 'Testat?', filter: true, editable: true, sortable: true },
                    { field: 'aboutUs', header: 'Cum a aflat de noi?', filter: true, editable: false, sortable: true },
                    { field: 'deliveredDate', header: 'Data Predarii', filter: true, editable: false, sortable: true },
                    { field: 'isRepaired', header: 'Finalizat?', filter: true, editable: false, sortable: true }
                ];
                _this.columnOptions = [];
                for (var i = 0; i < _this.cols.length; i++) {
                    _this.columnOptions.push({ label: _this.cols[i].header, value: _this.cols[i] });
                }
            }, function (err) {
                _this.loading = false;
            });
        }, 0);
    };
    RepairPFDetailComponent.prototype.ngOnDestroy = function () {
        window.removeEventListener('scroll', this.scroll, true);
    };
    RepairPFDetailComponent.prototype.updateField = function (event) {
        if (this._utilService.isNullOrUndefined(event.data.lastname)) {
            this.repairPFService.updateItem(event.data.$key, { lastname: event.data.lastname });
        }
        if (this._utilService.isNullOrUndefined(event.data.firstname)) {
            this.repairPFService.updateItem(event.data.$key, { firstname: event.data.firstname });
        }
        if (this._utilService.isNullOrUndefined(event.data.firm)) {
            this.repairPFService.updateItem(event.data.$key, { firm: event.data.firm });
        }
        if (this._utilService.isNullOrUndefined(event.data.phoneModel)) {
            this.repairPFService.updateItem(event.data.$key, { phoneModel: event.data.phoneModel });
        }
        if (this._utilService.isNullOrUndefined(event.data.problem)) {
            this.repairPFService.updateItem(event.data.$key, { problem: event.data.problem });
        }
        if (this._utilService.isNullOrUndefined(event.data.imei)) {
            this.repairPFService.updateItem(event.data.$key, { imei: event.data.imei });
        }
        this.repairPFService.updateItem(event.data.$key, { phone: event.data.phone });
        this.repairPFService.updateItem(event.data.$key, { priceOffer: event.data.priceOffer });
        this.repairPFService.updateItem(event.data.$key, { aboutUs: event.data.aboutUs });
        this.successMessage(event.data.lastname, event.data.firstname, 'Valoare');
    };
    RepairPFDetailComponent.prototype.getClientsPFList = function () {
        return this.repairPFService.getClientsPFList();
    };
    RepairPFDetailComponent.prototype.updateCheckedItem = function (row) {
        this.repairPFService.updateItem(row.$key, { isRepaired: row.isRepaired });
        if (row.isRepaired == true) {
            var date = new Date().getTime().toString();
            this.repairPFService.updateItem(row.$key, { deliveredDate: date });
        }
    };
    RepairPFDetailComponent.prototype.updateAppointmentDate = function (row, time) {
        var date = new Date(time).getTime().toString();
        this.repairPFService.updateItem(row.$key, { appointmentDate: date });
        this.defaultDate = new Date();
        this.defaultDate.setHours(12, 0);
        this.successMessage(row.lastname, row.firstname, 'Data programarii');
    };
    RepairPFDetailComponent.prototype.updateTestedItem = function (row) {
        this.repairPFService.updateItem(row.$key, { tested: row.tested });
        this.successMessage(row.lastname, row.firstname, 'Valoarea `testat` a fost');
    };
    RepairPFDetailComponent.prototype.successMessage = function (lastname, firstname, msg) {
        this.msgs = [];
        this.msgs.push({
            severity: 'success',
            summary: msg + ' modificata pentru clientul: ' + lastname + ' ' + firstname,
            detail: 'Date modificate.'
        });
    };
    RepairPFDetailComponent.prototype.disabledRow = function (rowData) {
        return rowData.isRepaired ? 'disabled-account-row' : '';
    };
    RepairPFDetailComponent = __decorate([
        core_1.Component({
            selector: 'repair-pf-detail',
            templateUrl: './repair-pf-detail.component.html'
        })
    ], RepairPFDetailComponent);
    return RepairPFDetailComponent;
}());
exports.RepairPFDetailComponent = RepairPFDetailComponent;

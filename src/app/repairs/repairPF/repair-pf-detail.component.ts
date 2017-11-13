import { Component, OnInit } from '@angular/core';
import { RepairPFDetailService } from "./repair-pf-detail.service"
import { SelectItem, Message } from "primeng/primeng";
import {Observable} from "rxjs/Observable";
import {ClientPF} from "../../model/ClientPF";
import {UtilService} from "../../utils/util.service";
import {AboutUsService} from "../../clients/clientPF/phone-list/about-us/about-us.service";

@Component({
  selector: 'repair-pf-detail',
  templateUrl: './repair-pf-detail.component.html'
})
export class RepairPFDetailComponent implements OnInit {
  repairsPF: Observable<ClientPF[]>;
  cols:any[];
  msgs:Message[] = [];
  columnOptions:SelectItem[];
  testingValues: any[];
  defaultDate: Date = new Date();
  selectedTestingValue: string;
  //isRepaired :boolean = false;
  datePicked : Date;

  constructor(private repairPFService:RepairPFDetailService, private _utilService: UtilService, private _aboutUsService: AboutUsService) {
  }

  ngOnInit() {
    this.repairsPF = this.getClientsPFList();
    this.defaultDate.setHours(12,0);

    this.testingValues = [{label:'Testat', value: null},{label: 'DA', value: 'DA'},{label: 'NU', value: 'NU'}];

    this.cols = [
      {field: 'addedDate', header: 'Data introducerii', filter: true, editable: true, sortable: true},
      {field: 'lastname', header: 'Nume', filter: true, editable: true, sortable: true},
      {field: 'firstname', header: 'Prenume', filter: true, editable: true, sortable: true},
      {field: 'email', header: 'Email', filter: true, editable: true, sortable: true},
      {field: 'firm', header: 'Firma', filter: true, editable: true, sortable: true},
      {field: 'phone', header: 'Numar telefon', filter: true, editable: true, sortable: true},
      {field: 'phoneModel', header: 'Model Telefon', filter: true, editable: true, sortable: true},
      {field: 'problem', header: 'Solicitare/Problema', filter: true, editable: true, sortable: true},
      {field: 'imei', header: 'IMEI', filter: true, editable: true, sortable: true},
      {field: 'priceOffer', header: 'Oferta pret', filter: true, editable: true, sortable: true},
      {field: 'appointmentDate', header: 'Data si ora programarii', filter: true, editable: true, sortable: true},
      {field: 'tested', header: 'Testat?', filter: true, editable: true, sortable: true},
      {field: 'aboutUs', header: 'Cum a aflat de noi?', filter: true, editable: true, sortable: true},
      {field: 'deliveredDate', header: 'Data Predarii', filter: true, editable: false, sortable: true},
      {field: 'isRepaired', header: 'Finalizat?', filter: true, editable: false , sortable: true}
    ];

    this.columnOptions = [];

    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }
  }

  updateField(event) {
    if (this._utilService.isNullOrUndefined(event.data.lastname)) {
      this.repairPFService.updateItem(event.data.$key, {lastname: event.data.lastname});
    }
    if (this._utilService.isNullOrUndefined(event.data.firstname)) {
      this.repairPFService.updateItem(event.data.$key, {firstname: event.data.firstname});
    }
    if (this._utilService.isNullOrUndefined(event.data.firm)) {
      this.repairPFService.updateItem(event.data.$key, {firm: event.data.firm});
    }
    this.repairPFService.updateItem(event.data.$key, {phone: event.data.phone});
    if (this._utilService.isNullOrUndefined(event.data.phoneModel)) {
      this.repairPFService.updateItem(event.data.$key, {phoneModel: event.data.phoneModel});
    }
    this.repairPFService.updateItem(event.data.$key, {problem: event.data.problem});
    if (this._utilService.isNullOrUndefined(event.data.imei)) {
      this.repairPFService.updateItem(event.data.$key, {imei: event.data.imei});
    }
    this.repairPFService.updateItem(event.data.$key, {priceOffer: event.data.priceOffer});
    this.repairPFService.updateItem(event.data.$key, {aboutUs: event.data.aboutUs});
    this.successMessage(event.data.lastname, event.data.firstname)
  }

  getClientsPFList(): Observable<any> {
    return this.repairPFService.getClientsPFList();
  }

  updateCheckedItem(row){
    this.repairPFService.updateItem(row.$key, {isRepaired: row.isRepaired});

    if(row.isRepaired == true){
      let date = new Date();
      this.repairPFService.updateItem(row.$key, {deliveredDate: date});
    }
  }

  updateAppointmentDate(row, time){
    let date = new Date(time).getTime();
    this.repairPFService.updateItem(row.$key, {appointmentDate: date});
    this.defaultDate = new Date();
    this.defaultDate.setHours(12,0);
  }

  updateTestedItem(row){
    this.repairPFService.updateItem(row.$key, {tested: row.tested})
  }


  successMessage(lastname, firstname) {
    this.msgs = [];
    this.msgs.push({
      severity: 'success',
      summary: 'Valoare modificata pentru clientul: ' + lastname + ' ' + firstname,
      detail: 'Date modificate.'
    });
  }

  disabledRow(rowData: ClientPF){
    return rowData.isRepaired ? 'disabled-account-row' : '';
  }


}

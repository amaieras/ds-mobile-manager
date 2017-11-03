import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
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
  repairsPF:Observable<ClientPF[]>;
  cols:any[];
  msgs:Message[] = [];
  columnOptions:SelectItem[];

  constructor(private repairPFService:RepairPFDetailService, private _utilService: UtilService, private _aboutUsService: AboutUsService) {
  }

  ngOnInit() {
    this.getClientsPFList();

    this.cols = [
      {field: 'addedDate', header: 'Data introducerii', filter: true},
      {field: 'lastname', header: 'Nume', filter: true},
      {field: 'firstname', header: 'Prenume', filter: true},
      {field: 'firm', header: 'Firma', filter: true},
      {field: 'phone', header: 'Numar telefon', filter: true},
      {field: 'phoneModel', header: 'Model Telefon', filter: true},
      {field: 'problem', header: 'Solicitare/Problema', filter: true},
      {field: 'imei', header: 'IMEI', filter: true},
      {field: 'priceOffer', header: 'Oferta pret', filter: true},
      {field: 'appointmentDate', header: 'Data si ora programarii', filter: true},
      {field: 'aboutUs', header: 'Cum a aflat de noi', filter: true}
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

  getClientsPFList() {
    this.repairPFService.getClientsPFList().subscribe(a => {
      a.forEach(bc => {
        this._aboutUsService.getAboutUsById(+bc.aboutUs).subscribe(as => {
          return bc.aboutUs = as;
        })
      });
      this.repairsPF = Observable.of(a);
      return this.repairsPF;
    });
  }

  successMessage(lastname, firstname) {
    this.msgs = [];
    this.msgs.push({
      severity: 'success',
      summary: 'Valoare modificata pentru clientul: ' + lastname + ' ' + firstname,
      detail: 'Date modificate.'
    });
  }


}

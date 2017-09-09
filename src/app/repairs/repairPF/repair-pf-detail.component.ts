import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ClientPF } from "../../clients/clientPF/client-pf-detail.service";
import { RepairPFDetailService } from "./repair-pf-detail.service"
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'repair-pf-detail',
  templateUrl: './repair-pf-detail.component.html'
})
export class RepairPFDetailComponent implements OnInit {
  repairsPF: FirebaseListObservable<ClientPF[]>;
  cols: any[];
  columnOptions: SelectItem[];

  constructor(private repairPFService: RepairPFDetailService) { }

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
        {field: 'appointment.timestamp', header: 'Data si ora programarii', filter: true},
        {field: 'aboutUs', header: 'Cum a aflat de noi', filter: true}
      ];

      this.columnOptions = [];

      for(let i = 0; i < this.cols.length; i++) {
        this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
      }
  }

  getClientsPFList() {
      this.repairsPF = this.repairPFService
        .getClientsPFList({limitToLast: 5});
  }
}

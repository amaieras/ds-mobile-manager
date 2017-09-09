import { Component, OnInit } from "@angular/core";
import { FirebaseListObservable } from 'angularfire2/database';
import { ClientGSM } from "../../clients/clientGSM/client-gsm-detail.service"
import { SelectItem } from "primeng/primeng";
import { RepairGSMDetailService } from "./repair-gsm-detail.service";

@Component({
  selector: 'repair-gsm-detail',
  templateUrl: './repair-gsm-detail.component.html'
})
export class RepairGSMDetailComponent implements OnInit{
  repairsGSM: FirebaseListObservable<ClientGSM[]>;
  cols: any[];
  columnOptions: SelectItem[];

  constructor(private repairGSMService: RepairGSMDetailService) { }

  ngOnInit() {
    this.getClientsGSMList();
    this.cols = [
      {field: 'addedDate.day', header: 'Data introducerii', filter: true},
      {field: 'lastname', header: 'Nume', filter: true},
      {field: 'firstname', header: 'Prenume', filter: true},
      {field: 'firm', header: 'Firma', filter: true},
      {field: 'phone', header: 'Numar telefon', filter: true},
      {field: 'email', header: 'E-mail', filter: true},
      {field: 'country', header: 'Tara', filter: true},
      {field: 'city', header: 'Orasul', filter: true},
      {field: 'billingAddress.0.country', header: 'Adresa de facturare', filter: true},
      {field: 'shipmentAddress.0.country', header: 'Adresa de livrare', filter: true}
    ];

    this.columnOptions = [];

    for(let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }
  }
  getClientsGSMList() {
    this.repairsGSM = this.repairGSMService
      .getClientsGSMList({limitToLast: 5});
  }

}

import { Component, OnInit } from "@angular/core";
import { AngularFireList } from 'angularfire2/database';
import { ClientGSM } from "../../clients/clientGSM/client-gsm-detail.service"
import { SelectItem,Message } from "primeng/primeng";
import { RepairGSMDetailService } from "./repair-gsm-detail.service";

@Component({
  selector: 'repair-gsm-detail',
  templateUrl: './repair-gsm-detail.component.html'
})
export class RepairGSMDetailComponent implements OnInit{
  repairsGSM: AngularFireList<ClientGSM[]>;
  cols: any[];
  columnOptions: SelectItem[];
  msgs: Message[] = [];
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

  updateField(event) {
    this.repairGSMService.updateItem(event.data.$key, { lastname: event.data.lastname});
    this.repairGSMService.updateItem(event.data.$key, { firstname: event.data.firstname});
    if (this.check(event.data.firm)) {
      this.repairGSMService.updateItem(event.data.$key, {firm: event.data.firm});
    }
    this.repairGSMService.updateItem(event.data.$key, { phone: event.data.phone});
    this.repairGSMService.updateItem(event.data.$key, { email: event.data.email});
    this.repairGSMService.updateItem(event.data.$key, { country: event.data.country});
    this.repairGSMService.updateItem(event.data.$key, { city: event.data.city});
    this.successMessage(event.data.lastname, event.data.firstname)
  }
  getClientsGSMList() {
    this.repairsGSM = this.repairGSMService
      .getClientsGSMList();
  }
  successMessage(lastname, firstname) {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Valoare modificata pentru clientul: ' + lastname + ' ' + firstname, detail:'Date modificate.'});
  }
  check(x) {
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
  }
}

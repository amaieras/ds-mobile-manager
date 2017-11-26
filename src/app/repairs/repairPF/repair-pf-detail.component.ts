import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import { RepairPFDetailService } from "./repair-pf-detail.service"
import {SelectItem, Message, LazyLoadEvent} from "primeng/primeng";
import {Observable} from "rxjs/Observable";
import {ClientPF} from "../../model/ClientPF";
import {UtilService} from "../../utils/util.service";

@Component({
  selector: 'repair-pf-detail',
  templateUrl: './repair-pf-detail.component.html',
  host: {
    '(window:scroll)': 'updateHeader($event)'
  }
})
export class RepairPFDetailComponent implements OnInit {
  repairsPF: ClientPF[];
  dataSource: ClientPF[];
  loading = true;
  cols:any[];
  msgs:Message[] = [];
  columnOptions:SelectItem[];
  testingValues: any[];
  defaultDate: Date = new Date();
  totalRecords: number;
  isScrolled = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 100;
  constructor(private repairPFService:RepairPFDetailService, private _utilService: UtilService, private _renderer: Renderer2) {
  }

  ngOnInit() {
    this.defaultDate.setHours(12,0);
    setTimeout(() => {
      this.loading = true;
      this.getClientsPFList().subscribe(item => {
        this.dataSource = item;
        this.totalRecords = this.dataSource.length;
        this.repairsPF = this.dataSource;
        this.loading = false;
        this.testingValues = [{label: 'DA', value: 'DA'},{label: 'NU', value: 'NU'}];
        this.cols = [
          {field: 'addedDate', header: 'Data introducerii', filter: true, sortable: true},
          {field: 'lastname', header: 'Nume', filter: true, editable: true, sortable: true},
          {field: 'firstname', header: 'Prenume', filter: true, editable: true, sortable: true},
          {field: 'email', header: 'Email', filter: true, editable: true, sortable: true},
          {field: 'firm', header: 'Firma', filter: true, editable: true, sortable: true},
          {field: 'phone', header: 'Numar telefon', filter: true, editable: true, sortable: true},
          {field: 'phoneList', header: 'Model Telefon', filter: true, sortable: true},
          {field: 'problem', header: 'Solicitare/Problema', filter: true, sortable: true},
          {field: 'imei', header: 'IMEI', filter: true, sortable: true},
          {field: 'priceOffer', header: 'Oferta pret', filter: true, editable: true, sortable: true},
          {field: 'appointmentDate', header: 'Data si ora programarii', filter: true, editable: true, sortable: true},
          {field: 'tested', header: 'Testat?', filter: true, editable: true, sortable: true},
          {field: 'aboutUs', header: 'Cum a aflat de noi?', filter: true, editable: false, sortable: true},
          {field: 'deliveredDate', header: 'Data Predarii', filter: true, editable: false, sortable: true},
          {field: 'isRepaired', header: 'Finalizat?', filter: true, editable: false , sortable: true}
        ];

        this.columnOptions = [];

        for (let i = 0; i < this.cols.length; i++) {
          this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
        }
      }, err => {
        this.loading = false;
      });
    }, 0)

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
    if (this._utilService.isNullOrUndefined(event.data.phoneModel)) {
      this.repairPFService.updateItem(event.data.$key, {phoneModel: event.data.phoneModel});
    }
    if (this._utilService.isNullOrUndefined(event.data.problem)) {
      this.repairPFService.updateItem(event.data.$key, {problem: event.data.problem});
    }
    if (this._utilService.isNullOrUndefined(event.data.imei)) {
      this.repairPFService.updateItem(event.data.$key, {imei: event.data.imei});
    }
    this.repairPFService.updateItem(event.data.$key, {phone: event.data.phone});
    this.repairPFService.updateItem(event.data.$key, {priceOffer: event.data.priceOffer});
    this.repairPFService.updateItem(event.data.$key, {aboutUs: event.data.aboutUs});
    this.successMessage(event.data.lastname, event.data.firstname,'Valoare')
  }

  getClientsPFList(): Observable<any> {
    return this.repairPFService.getClientsPFList()
  }

  updateCheckedItem(row){
    this.repairPFService.updateItem(row.$key, {isRepaired: row.isRepaired});

    if(row.isRepaired == true){
      let date = new Date().getTime().toString();
      this.repairPFService.updateItem(row.$key, {deliveredDate: date});
    }
  }

  updateAppointmentDate(row, time){
    let date = new Date(time).getTime().toString();
    this.repairPFService.updateItem(row.$key, {appointmentDate: date});
    this.defaultDate = new Date();
    this.defaultDate.setHours(12,0);
    this.successMessage(row.lastname, row.firstname, 'Data programarii')
  }

  updateTestedItem(row){
    this.repairPFService.updateItem(row.$key, {tested: row.tested});
    this.successMessage(row.lastname, row.firstname, 'Valoarea `testat` a fost')
  }


  successMessage(lastname, firstname, msg) {
    this.msgs = [];
    this.msgs.push({
      severity: 'success',
      summary: msg + ' modificata pentru clientul: ' + lastname + ' ' + firstname,
      detail: 'Date modificate.'
    });
  }

  disabledRow(rowData: ClientPF) {
    return rowData.isRepaired ? 'disabled-account-row' : '';
  }

  updateHeader(evt) {

    console.log('updateheader' + evt)
    this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    if(this.currPos >= this.changePos ) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
  @HostListener("scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // if (number > 100) {
    //   this.navIsFixed = true;
    // } else if (this.navIsFixed && number < 10) {
    //   this.navIsFixed = false;
    // }
    console.log('test')
  }
}

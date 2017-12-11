import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import { RepairPFDetailService } from "./repair-pf-detail.service"
import {SelectItem, Message} from "primeng/primeng";
import {Observable} from "rxjs/Observable";
import {ClientPF} from "../../model/ClientPF";
import {UtilService} from "../../utils/util.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'repair-pf-detail',
  templateUrl: './repair-pf-detail.component.html'
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
  csvSeparator: string;
  noOfClients: number;
  clientPFForm: FormGroup;
  totalPrice = 0;

  constructor(private repairPFService:RepairPFDetailService, private _utilService: UtilService, private _el: ElementRef) {
  }

  ngOnInit() {

    this.csvSeparator = ',';

    window.addEventListener('scroll', this.scroll, true); //third parameter

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
          {field: 'phone', header: 'Telefon', filter: true, editable: true, sortable: true},
          {field: 'phoneList', header: 'Model', filter: true, sortable: true},
          {field: 'problem', header: 'Problema', filter: true, sortable: true},
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

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    let tableOffset = this._el.nativeElement.querySelector('table').getBoundingClientRect().top;
    if (tableOffset < 0) {
      this._el.nativeElement.querySelector('thead').classList.add('sticky-head')
    }
    else {
      this._el.nativeElement.querySelector('thead').classList.remove('sticky-head')
    }
  };
  updateField(event) {
    const fieldName = event.column.field;
    const fieldVal = event.data[fieldName];
    let obj = {};
    obj[fieldName] = fieldVal;
    this.repairPFService.updateItem(event.data.$key, obj);
    this.successMessage(event.data.lastname, event.data.firstname, event.data.phone,'Valoare');
  }

  getClientsPFList(): Observable<any> {
    return this.repairPFService.getClientsPFList();
  }

  updateCheckedItem(row) {
    this.repairPFService.updateItem(row.$key, {isRepaired: row.isRepaired});

    if(row.isRepaired) {
      let date = new Date().getTime().toString();
      this.repairPFService.updateItem(row.$key, {deliveredDate: date});
    }
  }

  updateAppointmentDate(row, time) {
    let date = new Date(time).getTime().toString();
    this.repairPFService.updateItem(row.$key, {appointmentDate: date});
    this.defaultDate = new Date();
    this.defaultDate.setHours(12,0);
    this.successMessage(row.lastname, row.firstname, row.phone,'Data programarii a fost')
  }

  updateTestedItem(row) {
    this.repairPFService.updateItem(row.$key, {tested: row.tested});
    this.successMessage(row.lastname, row.firstname,row.phone, 'Valoarea `testat` a fost')
  }


  successMessage(lastname, firstname, phone, msg) {
    this.msgs = [];
    let msgAux = '';
    if (lastname === undefined || firstname === undefined) {
      msgAux = ' modificata pentru clientul cu numarul de telefon: ' + phone;
    }
    else {
      msgAux = ' modificata pentru clientul: ' + lastname + ' ' + firstname;
    }
    this.msgs.push({
      severity: 'success',
      summary: msg  + msgAux,
      detail: 'Date modificate.'
    });
  }

  disabledRow(rowData: ClientPF) {
    return rowData.isRepaired ? 'disabled-account-row' : '';
  }


  exportTable(){
    {
      let data = this.dataSource;
      let csv = '\ufeff';
      let exportFilename = this.getDate();

      for (var i = 0; i < this.cols.length; i++) {

        var column = this.cols[i];
        if (column.field) {
          csv += '"' + (column.header || column.field) + '"';
          if (i < (this.cols.length - 1)) {
            csv += this.csvSeparator;
          }
        }
      }

      //body
      data.forEach(entry => {
           csv += '\n';

          for (var i_1 = 0; i_1 < this.cols.length; i_1++) {

          var column = this.cols[i_1];
            csv += '"' + this.resolveFieldData(entry, column.field) + '"';
            if (i_1 < (this.cols.length - 1)) {
              csv += this.csvSeparator;
            }
        }
      });

      var blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8;'
      });
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, exportFilename + '.csv');
      }
      else {
        var link = document.createElement("a");
        link.style.display = 'none';
        document.body.appendChild(link);
        if (link.download !== undefined) {
          link.setAttribute('href', URL.createObjectURL(blob));
          link.setAttribute('download', exportFilename + '.csv');
          link.click();
        }
        else {
          csv = 'data:text/csv;charset=utf-8,' + csv;
          window.open(encodeURI(csv));
        }
        document.body.removeChild(link);
      }
    };
  }
  resolveFieldData(data, field) {

    if (data && field) {
      if (field.indexOf('.') == -1) {
        var auxDate = '';
        if(field == 'addedDate' || field == 'appointmentDate' || field === 'deliveredDate' || field === 'phoneList'){
          if (field === 'phoneList') {
            return data[field][0].phoneBrand + " " +data[field][0].phoneModel + " " +data[field][0].phoneColor;
          }

          else{
            if(data[field] == '' || data[field] == null) {
              return '';
            }else
              var d = new Date(+data[field]);
              auxDate = d.toLocaleDateString()  + "  " + d.toLocaleTimeString();
            }
          return auxDate;
        }else
        return data[field];
      }
      else {
        var fields = field.split('.');
        var value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    }
    else {
      return null;
    }
  };

  getDate() {
    const today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate().toString();
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();
    let seconds = today.getSeconds().toString();
    let year = today.getFullYear().toString();
    return day + month + year + '_' + hours + minutes + seconds;
  }
  printRepair(repair) {
    alert('Work in progress :)')
    this.noOfClients = 24;
    this.clientPFForm = repair;
    this.totalPrice = 0;
  }

}

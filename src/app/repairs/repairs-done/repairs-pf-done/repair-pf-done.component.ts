import {Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {SelectItem, Message} from "primeng/primeng";
import {Observable} from "rxjs/Observable";
import {ClientPF} from "../../../model/ClientPF";
import {PrintReceiptComponent} from "../../../shared/print/print-pf/print-receipt.component";
import {RepairPFDetailService} from "../../repairPF/repair-pf-detail.service";
import {ClientPFService} from "../../../clients/clientPF/client-pf-detail.service";
import {WarrantyInfo} from "../../../model/WarrantyInfo";
import {UtilService} from "../../../utils/util.service";
import {PaymentMethod} from "../../../model/PaymentMethod";

@Component({
  selector: 'repair-pf-done',
  templateUrl: './repair-pf-done.component.html'
})
export class RepairPfDoneComponent implements OnInit {
  repairsPF: ClientPF[];
  dataSource: ClientPF[];
  clientPF: ClientPF = new ClientPF();
  loading = true;
  cols:any[];
  msgs: Message[] = [];
  columnOptions:SelectItem[];
  testingValues: any[];
  defaultDate: Date = new Date();
  totalRecords: number;
  csvSeparator: string;
  methodsOfPayment: any[];
  displayDialog: boolean;
  selectedClient: ClientPF;
  @ViewChild(PrintReceiptComponent) child: PrintReceiptComponent;

  constructor( private repairPFService:RepairPFDetailService
              , private _clientPFService: ClientPFService
              , private _el: ElementRef
              , private _utilService: UtilService
              , private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.csvSeparator = ',';
    this.clientPF.paymentMethod = new PaymentMethod(0,0,0,0,0);
    window.addEventListener('scroll', this.scroll, true); //third parameter

    this.defaultDate.setHours(12,0);
    setTimeout(() => {
      this.loading = true;
      this.getClientsPFList().subscribe(clientPF => {
        this.dataSource = clientPF.filter(function(item) {
          return item.isPayed;
        });
        this.totalRecords = this.dataSource.length;
        this.repairsPF = this.dataSource;
        this.loading = false;
        this.methodsOfPayment = [{label: 'Nu', value: 'nu'},{label: 'Cont Curent', value: 'cont'},{label: 'Ramburs', value: 'ramburs'}];
        this.testingValues = [{label: 'DA', value: 'DA'},{label: 'NU', value: 'NU'}];
        this.cols = [
          {field: 'addedDate', header: 'Data introducerii', filter: true, sortable: true},
          {field: 'lastname', header: 'Nume', filter: true, editable: true, sortable: true},
          {field: 'firstname', header: 'Prenume', filter: true, editable: true, sortable: true},
          {field: 'email', header: 'Email', filter: true, editable: true, sortable: true},
          {field: 'firm', header: 'Firma', filter: true, editable: true, sortable: true},
          {field: 'phone', header: 'Telefon', filter: true, editable: true, sortable: true},
          {field: 'phoneList', header: 'Model', filter: true, sortable: true},
          {field: 'observation', header: 'Observatii', filter: true, editable: true, sortable: true},
          {field: 'phoneColor', header: 'Culoare', filter: true, editable: true, sortable: true},
          {field: 'phoneCode', header: 'Cod Telefon', filter: true, editable: true, sortable: true},
          {field: 'problem', header: 'Problema', filter: true, sortable: true},
          {field: 'imei', header: 'IMEI', filter: true, sortable: true},
          {field: 'priceOffer', header: 'Oferta pret', filter: true, editable: true, sortable: true},
          {field: 'appointmentDate', header: 'Data si ora programarii', filter: true, editable: true, sortable: true},
          {field: 'tested', header: 'Testat?', filter: true, editable: true, sortable: true},
          {field: 'aboutUs', header: 'Cum a aflat de noi?', filter: true, editable: false, sortable: true},
          {field: 'deliveredDate', header: 'Data Predarii', filter: true, editable: false, sortable: true}
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
  onRowSelect(event) {
    this.clientPF = this.cloneClient(event.data);
    this.displayDialog = true;
    this.cdr.detectChanges();
  }
  cloneClient(c: ClientPF): ClientPF {
    let clientPF = new ClientPF();
    for(let prop in c) {
      clientPF[prop] = c[prop];
    }
    return clientPF;
  }

  save() {
    this.updateField(this.clientPF);
    this.displayDialog = false;
  }
  cancel() {
    this.displayDialog = false;
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
  updateField(clientPF) {
    const clientKey = clientPF.$key;
    this.updateCheckedItem(clientPF);
    delete clientPF.$key;
    this.repairPFService.updateItem(clientKey, clientPF)
      // .then(item => {
        this.msgs = this._utilService.successUpdateMessage(clientPF.lastname, "",
          clientPF.phone,'Valoare modificata ');
      // }).catch(err => {
      //   console.log("RepairPfDoneComponent - " + err)
    // });

  }
  checkPaymentIsNo(clientGSM, type) {
    if(type === 'priceOffer') {
      clientGSM[type] = isNaN(clientGSM[type]) ||
      String(clientGSM[type]).trim().length === 0 ? 0 : +clientGSM[type];
    }
    else {
      clientGSM.paymentMethod[type] = isNaN(clientGSM.paymentMethod[type]) ||
      String(clientGSM.paymentMethod[type]).trim().length === 0 ? 0 : +clientGSM.paymentMethod[type];
    }
  }
  getClientsPFList(): Observable<any> {
    return this.repairPFService.getClientsPFList();
  }

  updateCheckedItem(row) {
    this.repairPFService.updateItem(row.$key, {isPayed: row.isPayed})
      // .then(item => {
        this.msgs = this._utilService.successUpdateMessage(row.lastname, row.firstname, row.phone,'Status plata modificat ')
      // }).catch(err => {
      //   console.log(err);
    // });
  }

  updateAppointmentDate(row, time) {
    let date = new Date(time).getTime().toString();
    this.repairPFService.updateItem(row.$key, {appointmentDate: date})
      // .then(item => {
        this.defaultDate = new Date();
        this.defaultDate.setHours(12,0);
        this.msgs = this._utilService.successUpdateMessage(row.lastname, row.firstname, row.phone,
          'Data programarii a fost modificata ')
      // });
  }

  updateTestedItem(row) {
    this.repairPFService.updateItem(row.$key, {tested: row.tested})
      // .then(item => {
        this.msgs = this._utilService.successUpdateMessage(row.lastname, row.firstname,row.phone, 'Valoarea `testat` a fost')
      // });
  }



  disabledRow(rowData: ClientPF) {
    return rowData.isPayed ? 'disabled-account-row' : '';
  }


  exportTable() {
    {
      let data = this.dataSource;
      let csv = '\ufeff';
      let exportFilename = this._utilService.getDate();

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
          if(column.field === 'imei' || column.field === 'problem'){
            if(column.field === 'imei'){
              csv += '"' + this.resolveFieldData(entry, 'phoneList_imei') + '"';
            }
            if(column.field === 'problem'){
              csv += '"' + this.resolveFieldData(entry, 'phoneList_problem') + '"';

            }
          }
          else {
            csv += '"' + this.resolveFieldData(entry, column.field) + '"';
          }
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
        var auxPhones = '';
        if (field === 'phoneList') {
          data[field].forEach(phone => auxPhones += phone.phoneBrand + " " +phone.phoneModel + " " +phone.phoneColor + " ");
          return auxPhones;
        }
        let imeiCount = '';
        if(field === 'phoneList_imei') {
          data['phoneList'].forEach(phone => {
            if(phone.imei === '' || phone.imei === 'undefined')
              imeiCount += "";
            else imeiCount += phone.imei + " "
          });
          return imeiCount;
        }
        let problemsCount ='';
        if(field === 'phoneList_problem'){
          data['phoneList'].forEach(phone =>  {
            phone.problems.forEach(problem => {
              if(problem.problem === 'undefined' || problem.problem === '')
                problemsCount += '';
              else problemsCount += problem.problem + " "
            })
          });
          return problemsCount;
        }
        if(field === 'isPayed'){
          if(data[field] === true) return 'DA';
          else return 'NU';
        }

        if(field == 'addedDate' || field == 'appointmentDate' || field === 'deliveredDate'){
          if(data[field] == '' || data[field] == null || data[field] === 'undefined') {
            return '';
          }else
            var d = new Date(+data[field]);
          auxDate = d.toLocaleDateString()  + "  " + d.toLocaleTimeString();
          return auxDate;

        }else{
          if (data[field] === null || data[field] === '-' || data[field] === undefined)
            return '';
          else {
            // if(data[field])
            return data[field];
            // else return '';
          }
        }
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

  printRepair(repair) {
    this._clientPFService.getAllClients().subscribe( client => {
      let warrantyInfo = new WarrantyInfo(repair.addedDate, repair.lastname, repair.firstname, repair.phone, repair.priceOffer,
        repair.tested, repair.aboutUs, repair.phoneList, repair.deliveredDate,  client.length, repair.paymentMethod);
      this.child.print(warrantyInfo);
    })
  }
}

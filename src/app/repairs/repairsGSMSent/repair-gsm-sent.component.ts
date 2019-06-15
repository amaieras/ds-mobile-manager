import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { SelectItem, Message } from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import {ClientGSM} from '../../model/ClientGSM';
import {UtilService} from '../../utils/util.service';
import {ClientGSMService} from '../../clients/clientGSM/client-gsm-detail.service';
import {WarrantyGSMInfo} from '../../model/WarrantyGSMInfo';
import {PrintGsmReceiptComponent} from '../../shared/print/print-gsm/print-gsm-receipt.component';
import {RepairGSMDetailService} from '../repairGSM/repair-gsm-detail.service';
import {PaymentMethod} from 'app/model/PaymentMethod';

@Component({
  selector: 'app-repair-gsm-sent',
  templateUrl: './repair-gsm-sent.component.html'
})
export class RepairGsmSentComponent implements OnInit{
  repairsGSM: ClientGSM[];
  clientGSM: ClientGSM = new ClientGSM();
  cols: any[];
  columnOptions: SelectItem[];
  msgs: Message[] = [];
  dataSource: ClientGSM[];
  loading = true;
  totalRecords: number;
  csvSeparator: string;
  methodsOfPayment: any[];
  displayDialog: boolean;
  selectedClient: ClientGSM;
  @ViewChild(PrintGsmReceiptComponent) child: PrintGsmReceiptComponent;

  constructor(private _repairGSMService: RepairGSMDetailService, private _clientGSMService: ClientGSMService,
              private _utilService: UtilService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.clientGSM.paymentMethod = new PaymentMethod(0, 0, 0, 0, 0);
    this.getClientsGSMList().subscribe(clientGSM => {
      this.dataSource = clientGSM.filter(function(item) {
        return !item.isPayed && (item.isSent === 'cont' || item.isSent === 'ramburs');
      });
      this.totalRecords = this.dataSource.length;
      this.repairsGSM = this.dataSource;
      this.loading = false;
      this.methodsOfPayment = [{label: 'Nu', value: 'nu'}, {label: 'Cont Curent', value: 'cont'}, {label: 'Ramburs', value: 'ramburs'}];
      this.cols = [
        {field: 'addedDate', header: 'Data introducerii', filter: true, sortable: true},
        {field: 'lastname', header: 'Nume', filter: true, editable: true, sortable: true},
        {field: 'phone', header: 'Numar telefon', filter: true, editable: true, sortable: true},
        {field: 'phoneList', header: 'Model', filter: true, sortable: true},
        {field: 'observation', header: 'Observatii', filter: true, editable: true, sortable: true},
        {field: 'phoneColor', header: 'Culoare', filter: true, editable: true, sortable: true},
        {field: 'problem', header: 'Problema', filter: true, sortable: true},
        {field: 'priceOffer', header: 'Oferta pret', filter: true, editable: true, sortable: true},
        {field: 'city', header: 'Orasul', filter: true, editable: true, sortable: true},
        {field: 'isSent', header: 'Colet trimis?', filter: true, editable: false , sortable: true},
      ];

      this.columnOptions = [];

      for (let i = 0; i < this.cols.length; i++) {
        this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
      }
    });

  }
  onRowSelect(event) {
    this.clientGSM = this.cloneClient(event.data);
    this.displayDialog = true;
    this.cdr.detectChanges();
  }
  cloneClient(c: ClientGSM): ClientGSM {
    const clientGSM = new ClientGSM();
    for (const prop in c) {
      clientGSM[prop] = c[prop];
    }
    return clientGSM;
  }
  save() {
    this.updateField(this.clientGSM);
    this.displayDialog = false;
  }

  cancel() {
    this.displayDialog = false;
  }
  updateField(clientGSM) {
    const clientKey = clientGSM.$key;
    this.updateCheckedItem(clientGSM);
    delete clientGSM.$key;
    this._repairGSMService.updateItem(clientKey, clientGSM);
      // .then(item => {
        this._utilService.successUpdateMessage(clientGSM.lastname, '', clientGSM.phone, 'Valoare modificata ');
      // });
  }
  checkPaymentIsNo(clientGSM, type) {
    if (type === 'priceOffer') {
      clientGSM[type] = isNaN(clientGSM[type]) ||
      String(clientGSM[type]).trim().length === 0 ? 0 : +clientGSM[type];
    }
    else {
      clientGSM.paymentMethod[type] = isNaN(clientGSM.paymentMethod[type]) ||
      String(clientGSM.paymentMethod[type]).trim().length === 0 ? 0 : +clientGSM.paymentMethod[type];
    }
  }

  getClientsGSMList(): Observable<any> {
    return this._repairGSMService.getClientsGSMList();
  }

  updateCheckedItem(row) {
    this._repairGSMService.updateItem(row.$key, {isPayed: row.isPayed});
      // .then(item => {
        this.msgs = this._utilService.successUpdateMessage(row.lastname, '', row.phone,
          'Status reparatie modificat ');
      // }).catch(err=> {
      //   console.log(err);
    // });

    if (row.isPayed) {
      //Delete deliveredeDate because of a bug
      //When updating for the second time the desired property, is is not updated, so I recreate it
      delete row.deliveredDate;
      const date = new Date().getTime().toString();
      this._repairGSMService.updateItem(row.$key, {deliveredDate: date});
        // .then(item => {
          this.msgs = this._utilService.successUpdateMessage(row.lastname, '', row.phone,
            'Valoare  data terminare reparatie modificata ');
        // }).catch(err => {
        //   console.log(err);
      // });
    }
  }
  updateRepairFinnish(row) {
    this._repairGSMService.updateItem(row.$key, {isRepaired: row.isRepaired});
      // .then(item => {
        this.msgs = this._utilService.successUpdateMessage(row.lastname, '', row.phone,
          'Valoare status reparatie ');
      // }).catch(err => {
      // console.log(err);
    // });
  }
  updateSentRepair(row) {
    this._repairGSMService.updateItem(row.$key, {isSent: row.isSent});
      // .then(item => {
        this.msgs = this._utilService.successUpdateMessage(row.lastname, '', row.phone,
          'Valoare status colet trimis ');
      // }).catch(err => {
      //   console.log(err);
    // });

  }
  exportTable() {
    {
      const data = this.dataSource;
      let csv = '\ufeff';
      const exportFilename = this._utilService.getDate();

      for (let i = 0; i < this.cols.length; i++) {

        const column = this.cols[i];
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

        for (let i_1 = 0; i_1 < this.cols.length; i_1++) {
          const column = this.cols[i_1];
          if (column.field === 'imei' || column.field === 'problem'){
            if (column.field === 'imei'){
              csv += '"' + this.resolveFieldData(entry, 'phoneList_imei') + '"';
            }
            if (column.field === 'problem'){
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

      const blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8;'
      });
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, exportFilename + '.csv');
      }
      else {
        const link = document.createElement('a');
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
        let auxDate = '';
        let auxPhones = '';
        if (field === 'phoneList') {
          data[field].forEach(phone => auxPhones += phone.phoneBrand + ' ' + phone.phoneModel + ' ' + phone.phoneColor + ' ');
          return auxPhones;
        }
        let imeiCount = '';
        if (field === 'phoneList_imei') {
          data['phoneList'].forEach(phone => {
            if (phone.imei === '' || phone.imei === 'undefined')
              imeiCount += '';
            else imeiCount += phone.imei + ' ';
          });
          return imeiCount;
        }
        let problemsCount = '';
        if (field === 'phoneList_problem'){
          data['phoneList'].forEach(phone =>  {
            phone.problems.forEach(problem => {
              if (problem.problem === 'undefined' || problem.problem === '')
                problemsCount += '';
              else problemsCount += problem.problem + ' ';
            });
          });
          return problemsCount;
        }
        if (field === 'isPayed'){
          if (data[field] === true) return 'DA';
          else return 'NU';
        }

        if (field == 'addedDate' || field == 'appointmentDate' || field === 'deliveredDate'){
          if (data[field] == '' || data[field] == null || data[field] === 'undefined') {
            return '';
          }else
            let d = new Date(+data[field]);
          auxDate = d.toLocaleDateString()  + '  ' + d.toLocaleTimeString();
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
        const fields = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
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
  disabledRow(rowData: ClientGSM) {
    return rowData.isPayed ? 'disabled-account-row' : '';
  }
  isRepairDone(rowData: ClientGSM) {
    return rowData.isRepaired ? 'repair-is-done' : '';
  }

  printGSMRepair(repairGSM) {
    this._clientGSMService.getAllClients().subscribe( client => {
      const warrantyGSMInfo = new WarrantyGSMInfo(repairGSM.addedDate, repairGSM.lastname, repairGSM.phone,
        repairGSM.priceOffer, client.length, repairGSM.phoneList, repairGSM.paymentMethod);
      this.child.print(warrantyGSMInfo);
    });
  }
}

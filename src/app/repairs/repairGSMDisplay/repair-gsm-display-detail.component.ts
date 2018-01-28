import {Component, OnInit, ViewChild} from "@angular/core";
import { SelectItem,Message } from "primeng/primeng";
import {Observable} from "rxjs/Observable";
import {UtilService} from "../../utils/util.service";
import {RepairGSMDisplayDetailService} from "./repair-gsm-display-detail.service";
import {ClientGSMDisplay} from "../../model/ClientGSMDisplay";
import {WarrantyGSMInfo} from "../../model/WarrantyGSMInfo";
import {PrintGsmReceiptComponent} from "../../shared/print/print-gsm/print-gsm-receipt.component";
import {ClientGSMDisplayService} from "../../clients/clientGSMDisplay/client-gsm-display-detail.service";

@Component({
  selector: 'app-repair-gsm-display-detail',
  templateUrl: './repair-gsm-display-detail.component.html'
})
export class RepairGSMDisplayDetailComponent implements OnInit{
  repairsGSMDisplay: ClientGSMDisplay[];
  cols: any[];
  columnOptions: SelectItem[];
  msgs: Message[] = [];
  dataSource: ClientGSMDisplay[];
  loading = true;
  totalRecords: number;
  csvSeparator: string;
  @ViewChild(PrintGsmReceiptComponent) child: PrintGsmReceiptComponent;

  constructor(private _repairGSMDisplayService: RepairGSMDisplayDetailService, private _utilService: UtilService,
              private _clientGSMDisplayService: ClientGSMDisplayService) { }

  ngOnInit() {
    this.getClientsGSMDisplayList().subscribe(clientGSMDisplay => {
      this.dataSource = clientGSMDisplay.filter(function(item) {
        return !item.isRepaired;
      });
      this.totalRecords = this.dataSource.length;
      this.repairsGSMDisplay = this.dataSource;
      this.loading = false;
      this.cols = [
        {field: 'addedDate', header: 'Data introducerii', filter: true, sortable: true},
        {field: 'lastname', header: 'Nume', filter: true, editable: true, sortable: true},
        {field: 'phone', header: 'Numar telefon', filter: true, editable: true, sortable: true},
        {field: 'phoneList', header: 'Model', filter: true, sortable: true},
        {field: 'observation', header: 'Observatii', filter: true, editable: true, sortable: true},
        {field: 'phoneColor', header: 'Culoare', filter: true, editable: true, sortable: true},
        {field: 'displayOpType', header: 'Tip Operatie', filter: true, sortable: true},
        {field: 'problem', header: 'Problema', filter: true, sortable: true},
        {field: 'priceOffer', header: 'Oferta pret', filter: true, editable: true, sortable: true},
        {field: 'priceOfferCash', header: 'Total cash', filter: true, editable: true, sortable: true},
        {field: 'priceOfferCard', header: 'Total card', filter: true, editable: true, sortable: true},
        {field: 'city', header: 'Orasul', filter: true, editable: true, sortable: true},
        {field: 'deliveredDate', header: 'Data Predarii', filter: true, editable: false, sortable: true},
        {field: 'isRepaired', header: 'Finalizat?', filter: true, editable: false , sortable: true}
      ];

      this.columnOptions = [];

      for(let i = 0; i < this.cols.length; i++) {
        this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
      }
    });

  }
  updateField(event) {
    const fieldName = event.column.field;
    const fieldVal = event.data[fieldName];
    let obj = {};
    obj[fieldName] = fieldVal;
    this._repairGSMDisplayService.updateItem(event.data.$key, obj);
    if(fieldName === "priceOfferCard" || fieldName === "priceOfferCash") {
      let poVal = event.data['priceOffer']
      if(fieldName === "priceOfferCard") {
        obj['priceOfferCash'] = +poVal - +obj[fieldName];
        if (obj['priceOfferCash'] > 0) {
          this._repairGSMDisplayService.updateItem(event.data.$key, obj);
        }
      }
      else {
        obj['priceOfferCard'] = +poVal - +obj[fieldName];
        if (obj['priceOfferCard'] > 0) {
          this._repairGSMDisplayService.updateItem(event.data.$key, obj);
        }
      }
      obj['priceOffer'] = +obj['priceOfferCard'] + +obj['priceOfferCash'];
      this._repairGSMDisplayService.updateItem(event.data.$key, obj);
    }
    this.updateArrayItem(fieldName, event, fieldVal);
    this.successMessage(event.data.lastname, event.data.firstname, event.data.phone,'Valoare');
  }
  private updateArrayItem(fieldName: any, event, fieldVal: any) {
    let obj = {};
    if (fieldName === "observation" || fieldName === "phoneColor") {
      event.data.phoneList[0][fieldName] = fieldVal;
      obj['phoneList'] = event.data.phoneList;
      this._repairGSMDisplayService.updateItem(event.data.$key, obj);
    }
  }
  getClientsGSMDisplayList(): Observable<any> {
    return this._repairGSMDisplayService.getClientsGSMDisplayList();
  }

  updateCheckedItem(row) {
    this._repairGSMDisplayService.updateItem(row.$key, {isRepaired: row.isRepaired});

    if(row.isRepaired) {
      let date = new Date().getTime().toString();
      this._repairGSMDisplayService.updateItem(row.$key, {deliveredDate: date});
    }
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
        if(field === 'isRepaired'){
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

  disabledRow(rowData: ClientGSMDisplay) {
    return rowData.isRepaired ? 'disabled-account-row' : '';
  }

  printGSMRepair(repairGSM) {
    this._clientGSMDisplayService.getAllClients().subscribe( client => {
        let warrantyGSMInfo = new WarrantyGSMInfo(repairGSM.addedDate, repairGSM.lastname, repairGSM.phone,
          repairGSM.priceOffer, client.length, repairGSM.phoneList);
        this.child.print(warrantyGSMInfo);
    })
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
}

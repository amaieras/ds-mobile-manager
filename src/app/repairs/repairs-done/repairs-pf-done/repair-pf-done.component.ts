import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SelectItem, Message} from "primeng/primeng";
import {Observable} from "rxjs/Observable";
import {ClientPF} from "../../../model/ClientPF";
import {PrintReceiptComponent} from "../../../shared/print/print-pf/print-receipt.component";
import {RepairPFDetailService} from "../../repairPF/repair-pf-detail.service";
import {ClientPFService} from "../../../clients/clientPF/client-pf-detail.service";
import {WarrantyInfo} from "../../../model/WarrantyInfo";
import {UtilService} from "../../../utils/util.service";

@Component({
  selector: 'repair-pf-done',
  templateUrl: './repair-pf-done.component.html'
})
export class RepairPfDoneComponent implements OnInit {
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
  @ViewChild(PrintReceiptComponent) child: PrintReceiptComponent;

  constructor(private repairPFService:RepairPFDetailService, private _clientPFService: ClientPFService, private _el: ElementRef, private _utilService: UtilService) {
  }

  ngOnInit() {
    this.csvSeparator = ',';

    window.addEventListener('scroll', this.scroll, true); //third parameter

    this.defaultDate.setHours(12,0);
    setTimeout(() => {
      this.loading = true;
      this.getClientsPFList().subscribe(clientPF => {
        this.dataSource = clientPF.filter(function(item) {
          return item.isRepaired;
        });
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
          {field: 'observation', header: 'Observatii', filter: true, editable: true, sortable: true},
          {field: 'phoneColor', header: 'Culoare', filter: true, editable: true, sortable: true},
          {field: 'phoneCode', header: 'Cod Telefon', filter: true, editable: true, sortable: true},
          {field: 'problem', header: 'Problema', filter: true, sortable: true},
          {field: 'imei', header: 'IMEI', filter: true, sortable: true},
          {field: 'priceOffer', header: 'Oferta pret', filter: true, editable: true, sortable: true},
          {field: 'priceOfferCash', header: 'Total cash', filter: true, editable: true, sortable: true},
          {field: 'priceOfferCard', header: 'Total card', filter: true, editable: true, sortable: true},
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
    if(fieldName === "priceOfferCard" || fieldName === "priceOfferCash") {
      let poVal = event.data['priceOffer']
      if(fieldName === "priceOfferCard") {
        obj['priceOfferCash'] = +poVal - +obj[fieldName];
        if (obj['priceOfferCash'] > 0) {
          this.repairPFService.updateItem(event.data.$key, obj);
        }
      }
      else {
        obj['priceOfferCard'] = +poVal - +obj[fieldName];
        if (obj['priceOfferCard'] > 0) {
          this.repairPFService.updateItem(event.data.$key, obj);
        }
      }
      obj['priceOffer'] = +obj['priceOfferCard'] + +obj['priceOfferCash'];
      this.repairPFService.updateItem(event.data.$key, obj);
    }
    this.updateArrayItem(fieldName, event, fieldVal);
    this.successMessage(event.data.lastname, event.data.firstname, event.data.phone,'Valoare');
  }

  private updateArrayItem(fieldName: any, event, fieldVal: any) {
    let obj = {};
    if (fieldName === "observation" || fieldName === "phoneColor" || fieldName === "phoneCode") {
      event.data.phoneList[0][fieldName] = fieldVal;
      obj['phoneList'] = event.data.phoneList;
      this.repairPFService.updateItem(event.data.$key, obj);
    }
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

  printRepair(repair) {
    let problems = [];
    this._clientPFService.getAllClients().subscribe( client => {
      repair.phoneList[0].problems.forEach(prbl => {
        let problemName = prbl.problem.toLowerCase() === 'altele' ? prbl.partName : prbl.problem;
        problems.push(problemName);
        let warrantyInfo = new WarrantyInfo(repair.addedDate, repair.lastname, repair.firstname, repair.phone, repair.priceOffer, repair.phoneList[0].phoneColor,
          repair.phoneList[0].imei, repair.phoneList[0].phoneBrand, repair.phoneList[0].phoneModel, repair.phoneList[0].observation, repair.tested,
          repair.aboutUs, problems, repair.deliveredDate, repair.phoneList[0].phoneCode, client.length);
        this.child.print(warrantyInfo);
      })
    })
  }
}

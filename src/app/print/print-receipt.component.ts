import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {PhoneListService} from "../clients/clientPF/phone-list/phone-list.service";
import {WarrantyInfo} from "../model/WarrantyInfo";

@Component({
  selector: 'app-print-receipt',
  templateUrl: 'print-receipt.component.html',
  styleUrls: ['print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {
  warrantyInfo: WarrantyInfo;

  constructor(private changeDetector: ChangeDetectorRef, private _phoneListService: PhoneListService) {  }
  @Input('clientPF') clientPF: FormGroup;
  @Input('totalPrice') totalPrice: number;
  ngOnInit() {
    this.insertDataToRecipe();
  }

  print() {
    this.insertDataToRecipe()
    this.changeDetector.detectChanges();
    const formModel = this.clientPF.value;
    this._phoneListService.getBrandNameById(formModel.phoneList[0].phoneBrand).subscribe(brandName => {
      this._phoneListService.getModelNameById(formModel.phoneList[0].phoneModel).subscribe(modelName => {
        this.warrantyInfo.modelName = modelName;
        this.warrantyInfo.brandName = brandName;
        this.changeDetector.detectChanges();
        let popupWin;
        let innerContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
        <html>
          <head>
            <style>
            .center-title {
                text-align-last: center;
              }
              .title-epmhasis {
                font-weight: bold;
              }
              .input-data {
                font-style: italic;
              }
              .inner-container{
                background: #9fdfbf;
              }
              th, td{
                border:2px solid black !important;
                padding: 4px !important;
                text-align: left;
              }
              .table-bordered {
                border: 2px solid black !important;
              }
              .footer {
                font-size: 10px;
              }
              .dotted-border {
                padding-top: 11px;
                border-top: 2px black dashed;
                margin-top: 5px;
              }
              * {
                box-sizing: border-box;
              }
              /*@media (min-width: 992px)*/
              .col-md-3 {
                width: 25%;
              }
              /*@media (min-width: 992px)*/
              .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9 {
                float: left;
              }
              .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
                position: relative;
                min-height: 1px;
              }
              .table {
                width: 100%;
                max-width: 100%;
              }
              table {
                background-color: transparent;
              }
              table {
                border-spacing: 0;
                border-collapse: collapse;
                margin-top: 20px;
              }
              .table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, .table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th {
                border-top: 0;
              }
              .col-md-offset-5 {
                margin-left: 25%;
              }
              .col-md-offset-6{
                margin-left: 40%;
              }
            </style>
          </head>
      <body>${innerContents}</body>
        </html>`
        );
      })
    })
  }

  insertDataToRecipe() {
    const formModel = this.clientPF.value;
    const dateObj = new Date();
    this.warrantyInfo = new WarrantyInfo(dateObj.getUTCMonth() + 1, dateObj.getUTCDate(), dateObj.getUTCFullYear(), formModel.lastname,
      formModel.firstname, formModel.phone, this.totalPrice, formModel.phoneList[0].phoneColor, formModel.phoneList[0].imei, '', '',
      formModel.phoneList[0].observation, 'todo-testat')
  }

}

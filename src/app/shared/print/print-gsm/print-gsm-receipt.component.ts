import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {WarrantyGSMInfo} from "../../../model/WarrantyGSMInfo";

@Component({
  selector: 'app-print-gsm-receipt',
  templateUrl: 'print-gsm-receipt.component.html'
})
export class PrintGsmReceiptComponent implements OnInit {
  warrantyGSMInfo: WarrantyGSMInfo;
  dsMobilePhone: string;
  warrantyGSMInfoDeepCopy: any;

  constructor(private _changeDetector: ChangeDetectorRef) {
    this.dsMobilePhone = '0734.588.883';
  }
  @Input('clientGSMInfo') clientGSMInfo: WarrantyGSMInfo;
  ngOnInit() { }

  print(warranty) {
    this.warrantyGSMInfo = warranty;
    this.addEmptyCells();
    if (!this._changeDetector['destroyed']) {
      this._changeDetector.detectChanges();
    }
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
            width: 317px;
          }
          .input-data {
            font-style: italic;
          }
          .inner-container{
            background: #9fdfbf;
          }
          td{
            border:2px solid black !important;
            padding: 10px !important;
          }
          th {
          border:2px solid black !important;
          padding: 4px !important;
          }
          .table-bordered {
            border: 2px solid black !important;
          }
          .footer {
            font-size: 10px;
          }
          .dotted-border {
            border-top: 2px black dashed;
            margin-top: 215px;
          }
          * {
            box-sizing: border-box;
          }
          @page { size: auto;  margin: 4mm; }
          /*@media (min-width: 992px)*/
          .col-md-3 {
            width: 25%;
          }
          .col-md-4 {
              width: 33.33333333%;
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
            font-size: 10px;
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
          .col-md-offset-8{
            margin-left: 42%;
          }
          .col-md-offset-9 {
              margin-left: 48%;
          }
          .empty-cells {
            visibility:hidden
          }
           .head-1-gsm{
            font-size: 10px;
          }
          .phone-number-text {
            font-size: 24px;
          }
        </style>
      </head>
  <body>${innerContents}</body>
    </html>`
    );
  }

  /**
   * add missing rows up to 10
   */
  addEmptyCells() {
    let warrantyGSMInfoDeepCopy:any = Object.assign([],this.warrantyGSMInfo.phoneList);
    const noOfPhones = this.warrantyGSMInfo.phoneList.length;
    if (noOfPhones < 9) {
      for(let i=0; i<9-noOfPhones; i++) {
        warrantyGSMInfoDeepCopy.push('empty');
      }
    }
    this.warrantyGSMInfoDeepCopy = warrantyGSMInfoDeepCopy;
  }

  calculatePricePerPhone(phone: any) {
    let totalCostPerPhone = 0;
    phone.problems.forEach(problem => {
      totalCostPerPhone += +problem.phoneQuantity * problem.pricePerPart;
    });
    return totalCostPerPhone;
  }
}

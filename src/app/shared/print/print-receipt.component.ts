import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {WarrantyInfo} from "../../model/WarrantyInfo";

@Component({
  selector: 'app-print-receipt',
  templateUrl: 'print-receipt.component.html',
  styleUrls: ['print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {
  warrantyInfo: WarrantyInfo;
  dsMobilePhone: string;
  dateObj = Date.now();

  constructor(private _changeDetector: ChangeDetectorRef) {
    this.dsMobilePhone = '0734.588.883';
  }
  @Input('clientPFInfo') clientPFInfo: WarrantyInfo;
  ngOnInit() {
  }

  print(warranty) {

    this.warrantyInfo = warranty;
    if (!this._changeDetector['destroyed']) {
      this._changeDetector.detectChanges();
    }
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
            font-weight: bold;
          }
          .table-bordered {
            border: 2px solid black !important;
          }
          .footer {
            font-size: 10px;
          }
          .dotted-border {
            padding-top: 26px;
            border-top: 2px black dashed;
            margin-top: 24px;
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
            font-size: 8px;
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
          .empty-cells {
            visibility:hidden
          }
        </style>
      </head>
  <body>${innerContents}</body>
    </html>`
    );
  }
}

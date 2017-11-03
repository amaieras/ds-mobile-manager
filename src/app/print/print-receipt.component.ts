
import {Component, OnInit} from "@angular/core";
import jsPDF from 'jspdf';
import {PdfmakeService} from "ng-pdf-make";

@Component({
  selector: 'app-print-receipt',
  templateUrl: 'print-receipt.component.html',
  styleUrls: ['print-receipt.component.scss']
})
export class PrintReceiptComponent implements OnInit {

  constructor() {  }

  ngOnInit() {
     console.log()
  }

  print() {
    let popupWinindow
    let innerContents = document.getElementById("print-section").innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<body onload="window.print()">' + innerContents );
    popupWinindow.document.close();
  }

}

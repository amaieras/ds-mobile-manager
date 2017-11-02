
import {Component, OnInit} from "@angular/core";
import jsPDF from 'jspdf';
import {PdfmakeService} from "ng-pdf-make";

@Component({
  selector: 'app-print-receipt',
  templateUrl: 'print-receipt.component.html'
})
export class PrintReceiptComponent implements OnInit {

  constructor() {  }

  ngOnInit() {
    // Configure text styles
    // this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });
    // // Add simple text
    // this.pdfmake.addText('This is an sample PDF printed with pdfMake');


  }

  openPDF() {
    let doc = new jsPDF();
    doc.text(20,20,'<h1>Hello world</h1>');
    doc.save('Test.pdf');
  }
  printPDF(){
    // this.pdfmake.open()
  }
}

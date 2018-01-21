import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import {DateFilterComponent} from "./date-filter-component/date-filter.component";
import {PrintReceiptComponent} from "./print/print-pf/print-receipt.component";
import {DropdownModule} from "primeng/primeng";
import {PrintGsmReceiptComponent} from "./print/print-gsm/print-gsm-receipt.component";

@NgModule({
  imports:      [ CommonModule, DropdownModule, FormsModule ],
  declarations: [ DateFilterComponent, PrintReceiptComponent, PrintGsmReceiptComponent],
  exports:      [ DateFilterComponent, PrintReceiptComponent, PrintGsmReceiptComponent, CommonModule, FormsModule ]
})
export class SharedDsModule { }


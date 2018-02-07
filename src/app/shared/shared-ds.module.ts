import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateFilterComponent} from "./date-filter-component/date-filter.component";
import {PrintReceiptComponent} from "./print/print-pf/print-receipt.component";
import {DropdownModule} from "primeng/primeng";
import {PrintGsmReceiptComponent} from "./print/print-gsm/print-gsm-receipt.component";
import {ProblemListComponent} from "./problem-list/problem-list.component";

@NgModule({
  imports:      [ CommonModule, DropdownModule, FormsModule, ReactiveFormsModule ],
  declarations: [ DateFilterComponent, PrintReceiptComponent, PrintGsmReceiptComponent, ProblemListComponent],
  exports:      [ DateFilterComponent, PrintReceiptComponent, PrintGsmReceiptComponent, CommonModule, FormsModule,
  ProblemListComponent]
})
export class SharedDsModule { }


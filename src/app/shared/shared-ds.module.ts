import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateFilterComponent} from "./date-filter-component/date-filter.component";
import {PrintReceiptComponent} from "./print/print-pf/print-receipt.component";
import {CalendarModule, DropdownModule} from "primeng/primeng";
import {PrintGsmReceiptComponent} from "./print/print-gsm/print-gsm-receipt.component";
import {ProblemListComponent} from "./problem-list/problem-list.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule, NativeDateModule, MatInputModule, MatRadioModule} from "@angular/material";

@NgModule({
  imports:      [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [ DateFilterComponent, PrintReceiptComponent, PrintGsmReceiptComponent, ProblemListComponent],
  exports:      [
    DateFilterComponent,
    PrintReceiptComponent,
    PrintGsmReceiptComponent,
    CommonModule,
    FormsModule,
    ProblemListComponent

  ]
})
export class SharedDsModule { }


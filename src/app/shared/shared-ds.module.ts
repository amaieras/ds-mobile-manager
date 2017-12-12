import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import {DateFilterComponent} from "./date-filter-component/date-filter.component";
import {PrintReceiptComponent} from "./print/print-receipt.component";
import {DropdownModule} from "primeng/primeng";

@NgModule({
  imports:      [ CommonModule, DropdownModule, FormsModule ],
  declarations: [ DateFilterComponent, PrintReceiptComponent],
  exports:      [ DateFilterComponent, PrintReceiptComponent, CommonModule, FormsModule ]
})
export class SharedDsModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RepairTypeListComponent } from "./repair-type-list/repair-type-list.component";
import { RepairPFDetailComponent } from "./repairPF/repair-pf-detail.component";
import { RepairGSMDetailComponent } from "./repairGSM/repair-gsm-detail.component"
import {DataTableModule, GrowlModule, MultiSelectModule, SharedModule} from "primeng/primeng"
import { DialogModule } from "primeng/primeng";
import { RepairPFDetailService } from "./repairPF/repair-pf-detail.service";
import { RepairGSMDetailService } from "./repairGSM/repair-gsm-detail.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    MultiSelectModule,
    //primeng
    GrowlModule
  ],
  declarations: [
    RepairTypeListComponent,
    RepairPFDetailComponent,
    RepairGSMDetailComponent

  ],
  providers: [
    RepairPFDetailService,
    RepairGSMDetailService
  ]
})
export class RepairModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GrowlModule, DropdownModule, CalendarModule } from "primeng/primeng";

import { ClientTypeListComponent } from "./client-type-list/client-type-list.component";
import { ClientTypeService } from "./client-type-list/client-type.service";
import { ClientPfDetailComponent } from "./clientPF/client-pf-detail.component";
import { ClientPFService } from "./clientPF/client-pf-detail.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //primeng
    GrowlModule,
    DropdownModule,
    CalendarModule
  ],
  declarations: [
    ClientTypeListComponent,
    ClientPfDetailComponent

  ],
  providers: [
    ClientTypeService,
    ClientPFService
  ]
})
export class ClientModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

import { ClientTypeListComponent } from "./client-type-list/client-type-list.component"
import { ClientTypeService } from "./client-type-list/client-type.service"
import { ClientPfDetailComponent } from "./clientPF/client-pf-detail.component"


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ClientTypeListComponent,
    ClientPfDetailComponent
  ],
  providers: [
    ClientTypeService
  ]
})
export class ClientModule { }

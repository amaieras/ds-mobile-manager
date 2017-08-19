import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms"
import { ClientRoutingModule } from './client-routing.module';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientTypeListComponent } from "./client-type-list/client-type-list.component"
import { ClientTypeService } from "./client-type-list/client-type.service"
import { ClientService } from "./client-detail/client-detail.service"

@NgModule({
  exports: [
    ClientTypeListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule
  ],
  declarations: [
    ClientDetailComponent,
    ClientTypeListComponent
  ],
  providers: [
    ClientTypeService,
    ClientService

  ]
})
export class ClientModule { }

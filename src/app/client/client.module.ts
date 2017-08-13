import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientDetailComponent } from './client-page/client-detail.component';
import { ClientTypeListComponent } from "./client-type-list/client-type-list.component"
import { ClientTypeService } from "./client-type-list/client-type.service"

@NgModule({
  exports: [
    ClientTypeListComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ],
  declarations: [
    ClientDetailComponent,
    ClientTypeListComponent
  ],
  providers: [
    ClientTypeService
  ]
})
export class ClientModule { }

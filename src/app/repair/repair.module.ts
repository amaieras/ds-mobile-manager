import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairRoutingModule } from './repair-routing.module';
import { RepairPageComponent } from './repair-page/repair-page.component';

@NgModule({
  imports: [
    CommonModule,
    RepairRoutingModule
  ],
  declarations: [RepairPageComponent],
  exports: [
    RepairPageComponent
  ]
})
export class RepairModule { }

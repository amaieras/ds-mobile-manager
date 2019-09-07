import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { GrowlModule } from "primeng/growl";
import { DropdownModule } from "primeng/primeng";
import { CommonModule } from "@angular/common";
import { CostComponent } from "./cost/cost.component";
import { CostAddComponent } from "./cost-add/cost-add.component";
import { CostListComponent } from './cost-list/cost-list.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    GrowlModule,
    DropdownModule,
    CommonModule
  ],
  exports: [CostComponent, CostAddComponent],
  declarations: [CostComponent, CostAddComponent, CostListComponent],
  providers: []
})
export class CostModule {}

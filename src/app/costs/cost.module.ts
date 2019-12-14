import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { GrowlModule } from "primeng/growl";
import {DropdownModule, PanelModule} from 'primeng/primeng';
import { CommonModule } from "@angular/common";
import { CostComponent } from "./cost/cost.component";
import { CostAddComponent } from "./cost-add/cost-add.component";
import { CostListComponent } from "./cost-list/cost-list.component";
import { SharedDsModule } from "../shared/shared-ds.module";
import {AmexioWidgetModule} from 'amexio-ng-extensions';
import {AmexioDashboardModule} from 'amexio-ng-extensions/dashboard';
import {DataViewModule} from 'primeng/dataview';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    GrowlModule,
    DropdownModule,
    CommonModule,
    SharedDsModule,
    AmexioWidgetModule,
    AmexioDashboardModule,
    DataViewModule,
    PanelModule
  ],
  exports: [CostComponent, CostAddComponent],
  declarations: [CostComponent, CostAddComponent, CostListComponent],
  providers: []
})
export class CostModule {}

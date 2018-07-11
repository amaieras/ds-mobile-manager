import {NgModule} from "@angular/core";
import {CheckoutComponent} from "./checkout.component";
import {AmexioDashboardModule} from "amexio-ng-extensions/dashboard";
import {AmexioWidgetModule} from "amexio-ng-extensions";
import {CommonModule} from "@angular/common";
import {CheckoutService} from "./checkout.service";
import {
  CalendarModule, CheckboxModule, DataGridModule, DataTableModule, DropdownModule, GrowlModule, PanelMenuModule,
  RadioButtonModule
} from "primeng/primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedDsModule} from "app/shared/shared-ds.module";
import {RepairPFDetailComponent} from "app/main/apps/repairs/repairPF/repair-pf-detail.component";
import {TableModule} from "primeng/table";
import {RouterModule} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {MultiSelectModule} from "@progress/kendo-angular-dropdowns";
import {PanelModule} from "primeng/panel";
import {DataViewModule} from "primeng/dataview";

@NgModule({
  imports: [
    AmexioDashboardModule,
    AmexioWidgetModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    SharedDsModule,

    GrowlModule,
    DataTableModule,
    TableModule,
    ReactiveFormsModule,
    RouterModule,
    DataTableModule,
    DialogModule,
    CheckboxModule,
    RadioButtonModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    DataGridModule,
    PanelModule,
    DataViewModule
  ],
  declarations: [
    RepairPFDetailComponent,
    CheckoutComponent,
  ],
  providers: [
    CheckoutService
  ]
})
export class CheckoutModule { }

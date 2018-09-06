import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedDsModule} from "../shared/shared-ds.module";
import {AmexioDashboardModule} from "amexio-ng-extensions/dashboard";
import {AmexioWidgetModule} from "amexio-ng-extensions";
import {CalendarModule, CheckboxModule, DropdownModule, MultiSelectModule} from "primeng/primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReportsShowComponent} from "./reports-show/reports-show.component";
import {ReportService} from "../shared/reports/report.service";
import { ReportsFilterComponent } from './reports-filter/reports-filter.component';
import {ReportTypeListComponent} from "./report-type-list/report-type-list.component";
import {RouterModule} from "@angular/router";
import {ReportTypeListService} from "./report-type-list/report-type-list.service";
import {MatSelectModule} from "@angular/material";

@NgModule({
  imports: [
    AmexioDashboardModule,
    AmexioWidgetModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    SharedDsModule,
    RouterModule,
    MultiSelectModule,
    CalendarModule,
    CheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [ReportsShowComponent, ReportTypeListComponent, ReportsFilterComponent],
  providers: [ReportService, ReportTypeListService]
})
export class ReportsModule { }

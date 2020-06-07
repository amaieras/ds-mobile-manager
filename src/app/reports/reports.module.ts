import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedDsModule } from "../shared/shared-ds.module";
import { AmexioDashboardModule } from "amexio-ng-extensions/dashboard";
import { AmexioWidgetModule } from "amexio-ng-extensions";
import {
  CalendarModule,
  CheckboxModule,
  DropdownModule,
  MultiSelectModule, SelectButtonModule, ToolbarModule
} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReportsShowComponent } from "./reports-show/reports-show.component";
import { ReportService } from "../shared/reports/report.service";
import { ReportsFilterComponent } from "./reports-filter/reports-filter.component";
import { ReportTypeListComponent } from "./report-type-list/report-type-list.component";
import { RouterModule } from "@angular/router";
import { ReportTypeListService } from "./report-type-list/report-type-list.service";
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from "@angular/material";
import { FuseSharedModule } from "../../@fuse/shared.module";
import { FuseSidebarModule, FuseWidgetModule } from "../../@fuse/components";
import { FilterDataTableComponent } from "./reports-filter/filter-data-table/filter-data-table.component";
import { ReportsOverviewComponent } from "./reports-overview/reports-overview.component";
import {TableModule} from 'primeng/table';

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
    ReactiveFormsModule,

    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    TableModule,
    SelectButtonModule,
    ToolbarModule
  ],
  declarations: [
    ReportsShowComponent,
    ReportTypeListComponent,
    ReportsFilterComponent,
    FilterDataTableComponent,
    ReportsOverviewComponent
  ],
  providers: [ReportService, ReportTypeListService]
})
export class ReportsModule {}

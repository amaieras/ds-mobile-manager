import { NgModule } from "@angular/core";
import { ReportsShowComponent } from "./reports-show/reports-show.component";
import { RouterModule, Routes } from "@angular/router";
import { ReportTypeListComponent } from "./report-type-list/report-type-list.component";
import { ReportsFilterComponent } from "./reports-filter/reports-filter.component";
import { AuthGuard } from "../guards/auth.guard";
import { ReportsOverviewComponent } from "./reports-overview/reports-overview.component";

const reportsCenterRoutes: Routes = [
  {
    path: "reports",
    component: ReportTypeListComponent,
    children: [
      {
        path: "",
        redirectTo: "reports",
        pathMatch: "full"
        // canActivate: [AuthGuard]
      },
      {
        path: "general",
        component: ReportsShowComponent
        // canActivate: [AuthGuard]
      },
      {
        path: "filter",
        component: ReportsFilterComponent
        // canActivate: [AuthGuard]
      },
      {
        path: "overview",
        component: ReportsOverviewComponent
        // canActivate: [AuthGuard]
      }
    ],
    // canActivate: [AuthGuard],
    data: {
      title: "Rapoarte",
      position: 5
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(reportsCenterRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class ReportsCenterRoutingModule {}

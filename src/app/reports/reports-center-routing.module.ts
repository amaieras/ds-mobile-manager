import { NgModule } from '@angular/core';
import {ReportsShowComponent} from "./reports-show/reports-show.component";
import {RouterModule, Routes} from "@angular/router";
import {ReportTypeListComponent} from "./report-type-list/report-type-list.component";
import {ReportsFilterComponent} from "./reports-filter/reports-filter.component";

const reportsCenterRoutes: Routes = [
  {
    path: 'reports',
    component: ReportTypeListComponent,
    children: [
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full'
      },
      {
        path: 'general',
        component: ReportsShowComponent
      },
      {
        path: 'filter',
        component: ReportsFilterComponent
      }
    ],
    data: {
      title: 'Rapoarte'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(reportsCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ReportsCenterRoutingModule { }

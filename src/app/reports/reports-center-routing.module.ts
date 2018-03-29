import { NgModule } from '@angular/core';
import {ReportsShowComponent} from "./reports-show/reports-show.component";
import {RouterModule, Routes} from "@angular/router";

const reportsCenterRoutes: Routes = [
  {
    path: 'reports',
    component: ReportsShowComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        component: ReportsShowComponent
      },
      // {
      //   path: 'gsm',
      //   component: ClientGSMDetailComponent
      // },
      // {
      //   path: 'gsm-display',
      //   component: ClientGSMDisplayComponent
      // }
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

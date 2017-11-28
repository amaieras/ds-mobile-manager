import {RouterModule, Routes} from "@angular/router";
import {ChartPfComponent} from "./chart-pf.component";
import {NgModule} from "@angular/core";


const chartCenterRoutes: Routes = [
  {
    path: 'chart',
    component: ChartPfComponent,
    children: [
      {
        path: '',
        redirectTo: 'chart-pf',
        pathMatch: 'full'
      },
      {
        path: 'chart-pf',
        component: ChartPfComponent
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
      title: 'Grafice'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(chartCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class ChartCenterRoutingModule { }

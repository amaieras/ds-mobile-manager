import {RouterModule, Routes} from "@angular/router";
import {ChartPfComponent} from "./chart-pf.component";
import {NgModule} from "@angular/core";
import {PhonesChartComponent} from "./phones-chart/phones-chart.component";
import {AboutUsChartComponent} from "./about-us-chart/about-us-chart.component";
import {ClientChartComponent} from "./client-chart/client-chart.component";
import {MoneyChartComponent} from "./money-chart/money-chart.component";
import {PhoneDetailedComponent} from "./phone-detailed/phone-detailed.component";
import {AdminGuard} from "../guards/admin.guard";


const chartCenterRoutes: Routes = [
  {
    path: 'chart',
    component: ChartPfComponent,
    // canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'chart-pf',
        pathMatch: 'full'
      },
      {
        path: 'phones-chart',
        component: PhonesChartComponent
      },
      {
        path: 'aboutUs-chart',
        component: AboutUsChartComponent
      },
      {
        path: 'client-chart',
        component: ClientChartComponent
      },
      {
        path: 'money-chart',
        component: MoneyChartComponent
      },
      {
        path: 'phoneDetailed-chart',
        component: PhoneDetailedComponent
      }
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

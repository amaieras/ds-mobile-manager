import {RouterModule, Routes} from '@angular/router';
import {ChartPfComponent} from './chart-pf.component';
import {NgModule} from '@angular/core';
import {PhonesChartComponent} from './phones-chart/phones-chart.component';
import {AboutUsChartComponent} from './about-us-chart/about-us-chart.component';
import {ClientChartComponent} from './client-chart/client-chart.component';
import {MoneyChartComponent} from './money-chart/money-chart.component';
import {PhoneDetailedComponent} from './phone-detailed/phone-detailed.component';
import {AuthGuard} from '../guards/auth.guard';

// const chartCenterRoutes: Routes = [
//   {
//     path: 'chart',
//     component: ChartPfComponent,
//     children: [
//       {
//         path: '',
//         redirectTo: 'chart-pf',
//         pathMatch: 'full',
//         // canActivate: [AuthGuard]
//       },
//       {
//         path: 'phones-chart',
//         component: PhonesChartComponent,
//         // canActivate: [AuthGuard]
//       },
//       {
//         path: 'aboutUs-chart',
//         component: AboutUsChartComponent,
//         // canActivate: [AuthGuard]
//       },
//       {
//         path: 'client-chart',
//         component: ClientChartComponent,
//         // canActivate: [AuthGuard]
//       },
//       {
//         path: 'money-chart',
//         component: MoneyChartComponent,
//         // canActivate: [AuthGuard]
//       },
//       {
//         path: 'phoneDetailed-chart',
//         component: PhoneDetailedComponent,
//         // canActivate: [AuthGuard]
//       }
//     ],
//     // canActivate: [AuthGuard],
//     data: {
//       title: 'Grafice'
//     }
//   }
// ];

@NgModule({
  imports: [
    // RouterModule.forRoot(chartCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class ChartCenterRoutingModule { }

import {NgModule} from "@angular/core";
import {ChartPfComponent} from "./chart-pf.component";
import {ChartModule} from 'primeng/primeng';
import {DropdownModule} from "primeng/primeng";
import { FormsModule } from '@angular/forms';
import {SharedDsModule} from "../../../shared/shared-ds.module";
import {RouterModule} from "@angular/router";
import { PhonesChartComponent } from './phones-chart/phones-chart.component';
import { AboutUsChartComponent } from './about-us-chart/about-us-chart.component';
import {ChartService} from "./chart.service";
import { ClientChartComponent } from './client-chart/client-chart.component';
import { MoneyChartComponent } from './money-chart/money-chart.component';
import { PhoneDetailedComponent } from './phone-detailed/phone-detailed.component';


@NgModule({
  imports: [
    ChartModule, DropdownModule, FormsModule, SharedDsModule, RouterModule

  ],
  declarations: [
    ChartPfComponent,
    PhonesChartComponent,
    AboutUsChartComponent,
    ClientChartComponent,
    MoneyChartComponent,
    PhoneDetailedComponent
  ],
  providers: [
    ChartModule, ChartService
  ]
})
export class ChartsModule { }

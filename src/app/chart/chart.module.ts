import {NgModule} from "@angular/core";
import {ChartPfComponent} from "./chart-pf.component";
import {ChartModule} from 'primeng/primeng';
import {DropdownModule} from "primeng/primeng";
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ChartModule, DropdownModule, FormsModule
  ],
  declarations: [
    ChartPfComponent
  ],
  providers: [
    ChartModule
  ]
})
export class ChartsModule { }

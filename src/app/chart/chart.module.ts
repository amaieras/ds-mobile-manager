import {NgModule} from "@angular/core";
import {ChartPfComponent} from "./chart-pf.component";
import {ChartModule} from 'primeng/primeng';
import {DropdownModule} from "primeng/primeng";
import { FormsModule } from '@angular/forms';
import {SharedDsModule} from "../shared/shared-ds.module";


@NgModule({
  imports: [
    ChartModule, DropdownModule, FormsModule, SharedDsModule
  ],
  declarations: [
    ChartPfComponent
  ],
  providers: [
    ChartModule
  ]
})
export class ChartsModule { }

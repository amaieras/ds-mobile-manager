import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedDsModule} from "../shared/shared-ds.module";
import {AmexioDashboardModule} from "amexio-ng-extensions/dashboard";
import {AmexioWidgetModule} from "amexio-ng-extensions";
import {DropdownModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {CheckoutService} from "../checkout/checkout.service";
import {ReportsShowComponent} from "./reports-show/reports-show.component";

@NgModule({
  imports: [
    AmexioDashboardModule,
    AmexioWidgetModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    SharedDsModule
  ],
  declarations: [ReportsShowComponent],
  providers: [CheckoutService]
})
export class ReportsModule { }

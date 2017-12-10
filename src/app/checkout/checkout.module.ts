import {NgModule} from "@angular/core";
import {CheckoutPfComponent} from "./checkout-pf.component";
import {AmexioDashboardModule} from "amexio-ng-extensions/dashboard";
import {AmexioWidgetModule} from "amexio-ng-extensions";
import {CommonModule} from "@angular/common";
import {CheckoutService} from "./checkout.service";
import {DateFilterComponent} from "../shared/date-filter-component/date-filter.component";
import {DropdownModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    AmexioDashboardModule,
    AmexioWidgetModule,
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  declarations: [
    CheckoutPfComponent,
    DateFilterComponent
  ],
  providers: [
    CheckoutService
  ]
})
export class CheckoutModule { }

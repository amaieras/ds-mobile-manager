import {NgModule} from "@angular/core";
import {CheckoutPfComponent} from "./checkout-pf.component";
import {AmexioDashboardModule} from "amexio-ng-extensions/dashboard";
import {AmexioWidgetModule} from "amexio-ng-extensions";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    AmexioDashboardModule,
    AmexioWidgetModule,
    CommonModule
  ],
  declarations: [
    CheckoutPfComponent
  ],
  providers: [
  ]
})
export class CheckoutModule { }

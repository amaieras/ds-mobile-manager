import {NgModule} from "@angular/core";
import {CheckoutPfComponent} from "./checkout-pf.component";
import {AmexioDashboardModule} from "amexio-ng-extensions/dashboard";
import {AmexioWidgetModule} from "amexio-ng-extensions";
import {CommonModule} from "@angular/common";
import {CheckoutService} from "./checkout.service";
import {DropdownModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {SharedDsModule} from "../shared/shared-ds.module";

@NgModule({
  imports: [
    AmexioDashboardModule,
    AmexioWidgetModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    SharedDsModule
  ],
  declarations: [
    CheckoutPfComponent
  ],
  providers: [
    CheckoutService
  ]
})
export class CheckoutModule { }

import { RouterModule, Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../guards/auth.guard";

const checkoutCenterRoutes: Routes = [
  {
    path: "checkout",
    component: CheckoutComponent,
    children: [
      {
        path: "",
        redirectTo: "",
        pathMatch: "full"
        // canActivate: [AuthGuard]
      },
      {
        path: "",
        component: CheckoutComponent
        // canActivate: [AuthGuard]
      }
    ],
    // canActivate: [AuthGuard],
    data: {
      title: "Casa - final de zi",
      position: 5
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(checkoutCenterRoutes)],
  exports: [RouterModule],
  providers: []
})
export class CheckoutCenterRoutingModule {}

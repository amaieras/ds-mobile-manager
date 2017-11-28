import {RouterModule, Routes} from "@angular/router";
import {CheckoutPfComponent} from "./checkout-pf.component";
import {NgModule} from "@angular/core";


const checkoutCenterRoutes: Routes = [
  {
    path: 'checkout',
    component: CheckoutPfComponent,
    children: [
      {
        path: '',
        redirectTo: 'checkout-pf',
        pathMatch: 'full'
      },
      {
        path: 'checkout-pf',
        component: CheckoutPfComponent
      },
      // {
      //   path: 'gsm',
      //   component: ClientGSMDetailComponent
      // },
      // {
      //   path: 'gsm-display',
      //   component: ClientGSMDisplayComponent
      // }
    ],
    data: {
      title: 'Casa - final de zi'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(checkoutCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class CheckoutCenterRoutingModule { }

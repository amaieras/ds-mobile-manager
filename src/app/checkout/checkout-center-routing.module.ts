import {RouterModule, Routes} from "@angular/router";
import {CheckoutComponent} from "./checkout.component";
import {NgModule} from "@angular/core";


const checkoutCenterRoutes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        component: CheckoutComponent
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

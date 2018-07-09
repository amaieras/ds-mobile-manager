
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import {OfferOptionListComponent} from "./offer-option-list/offer-option-list.component";
import {AddOfferComponent} from "./offer-add/add-offer.component";
import {ViewOfferComponent} from "./offer-view/view-offer.component";
import {ViewOfferDoneComponent} from "./offer-view-done/view-offer-done.component";
import {AuthGuard} from "../guards/auth.guard";


const offerCenterRoutes: Routes = [
  {
    path: 'offer',
    component: OfferOptionListComponent,
    children: [
      {
        path: '',
        redirectTo: 'offer',
        pathMatch: 'full',
        // canActivate: [AuthGuard]
      },
      {
        path: 'add-offer',
        component: AddOfferComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'view-offer',
        component: ViewOfferComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'view-offer-done',
        component: ViewOfferDoneComponent,
        // canActivate: [AuthGuard]
      }
    ],
    // canActivate: [AuthGuard],
    data: {
      title: 'Ofertare'
    }
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(offerCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class OfferCenterRouting { }

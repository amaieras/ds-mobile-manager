
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import {OfferOptionListComponent} from "./offer-option-list/offer-option-list.component";
import {AddOfferComponent} from "./offer-add/add-offer.component";
import {ViewOfferComponent} from "./offer-view/view-offer.component";


const offerCenterRoutes: Routes = [
  {
    path: 'offer',
    component: OfferOptionListComponent,
    children: [
      {
        path: '',
        redirectTo: 'offer',
        pathMatch: 'full'
      },
      {
        path: 'add',
        component: AddOfferComponent
      },
      {
        path: 'view',
        component: ViewOfferComponent
      }
    ],
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

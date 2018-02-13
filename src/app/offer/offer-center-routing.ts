
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import {OfferOptionListComponent} from "./offer-option-list/offer-option-list.component";
import {AddOfferComponent} from "./offer-add/add-offer.component";
import {ViewOfferComponent} from "./offer-view/view-offer.component";
import {ViewOfferDoneComponent} from "./offer-view-done/view-offer-done.component";


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
        path: 'add-offer',
        component: AddOfferComponent
      },
      {
        path: 'view-offer',
        component: ViewOfferComponent
      },
      {
        path: 'view-offer-done',
        component: ViewOfferDoneComponent
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

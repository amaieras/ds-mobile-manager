
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';

import { ClientTypeListComponent } from "./client-type-list/client-type-list.component"
import { ClientPfDetailComponent } from "./clientPF/client-pf-detail.component"
import { ClientGSMDetailComponent } from "./clientGSM/client-gsm-detail.component"


const clientsCenterRoutes: Routes = [
  {
      path: 'clients',
      component: ClientTypeListComponent,
      children: [
        {
          path: '',
          redirectTo: 'clients',
          pathMatch: 'full'
        },
        {
          path: 'PF',
          component: ClientPfDetailComponent,
          // canDeactivate: [CanDeactivateGuard],
          // resolve: {
          //   crisis: CrisisDetailResolver
          // }
        },
        {
          path: 'GSM',
          component: ClientGSMDetailComponent
        }
      ],
    data: {
      title: 'Client'
    }
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(clientsCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CrisisDetailResolver
  ]
})
export class ClientCenterRoutingModule { }


import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';

import { ClientTypeListComponent } from "./client-type-list/client-type-list.component"
import { ClientPfDetailComponent } from "./clientPF/client-pf-detail.component"
import { ClientGSMDetailComponent } from "./clientGSM/client-gsm-detail.component"
import {ClientGSMDisplayComponent} from "./clientGSMDisplay/client-gsm-display.component";
import {AdminGuard} from "../guards/admin.guard";

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
          path: 'pf',
          component: ClientPfDetailComponent
        },
        {
          path: 'gsm',
          component: ClientGSMDetailComponent
        }
      ],
    // canActivate: [AdminGuard],
    data: {
      title: 'Adaugă clienţi'
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
  ]
})
export class ClientCenterRoutingModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ClientTypeListComponent } from "./client-type-list/client-type-list.component";
import { ClientPfDetailComponent } from "./clientPF/client-pf-detail.component";
import { ClientGSMDetailComponent } from "./clientGSM/client-gsm-detail.component";
import { AuthGuard } from "../guards/auth.guard";

const clientsCenterRoutes: Routes = [
  {
    path: "clients",
    component: ClientTypeListComponent,
    children: [
      {
        path: "",
        redirectTo: "gsm",
        pathMatch: "full"
        // canActivate: [AuthGuard]
      },
      // {
      //   path: 'pf',
      //   component: ClientPfDetailComponent,
      // canActivate: [AuthGuard]
      // },
      {
        path: "gsm",
        component: ClientGSMDetailComponent
        // canActivate: [AuthGuard]
      }
    ],
    // canActivate: [AuthGuard],
    data: {
      title: "Adaugă clienţi",
      position: 1
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(clientsCenterRoutes)],
  exports: [RouterModule],
  providers: []
})
export class ClientCenterRoutingModule {}

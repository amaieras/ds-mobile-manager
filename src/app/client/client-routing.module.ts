import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientTypeListComponent} from "./client-type-list/client-type-list.component";

const routes: Routes = [{
  path: 'client',
  component: ClientTypeListComponent,
  data: {
    title: 'Client'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

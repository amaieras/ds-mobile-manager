import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientPageComponent } from './client-page/client-page.component';

const routes: Routes = [{
  path: 'client',
  component: ClientPageComponent,
  data: {
    title: 'Client'
  }
}];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

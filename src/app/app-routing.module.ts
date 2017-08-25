import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientTypeListComponent } from "./clients/client-type-list/client-type-list.component"

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clients',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

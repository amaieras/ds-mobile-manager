import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepairPageComponent } from './repair-page/repair-page.component'

const routes: Routes = [{
  path: 'repair',
  component: RepairPageComponent,
  data: {
     title: 'Reparatii'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule { }

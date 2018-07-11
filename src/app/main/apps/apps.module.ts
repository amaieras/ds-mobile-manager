import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
    path        : 'clients/pf',
    loadChildren: './clients/client-pf/client-pf.module#ClientPfModule'
  },
];

@NgModule({
  imports     : [
    RouterModule.forChild(routes),
    FuseSharedModule
  ]
})
export class AppsModule
{
}

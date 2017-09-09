
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';

import { RepairTypeListComponent } from "./repair-type-list/repair-type-list.component"
import { RepairPFDetailComponent } from "./repairPF/repair-pf-detail.component"
import { RepairGSMDetailComponent } from "./repairGSM/repair-gsm-detail.component"


const repairsCenterRoutes: Routes = [
  {
    path: 'repairs',
    component: RepairTypeListComponent,
    children: [
      {
        path: '',
        redirectTo: 'repairs',
        pathMatch: 'full'
      },
      {
        path: 'PF',
        component: RepairPFDetailComponent,
        // canDeactivate: [CanDeactivateGuard],
        // resolve: {
        //   crisis: CrisisDetailResolver
        // }
      },
      {
        path: 'GSM',
        component: RepairGSMDetailComponent
      }
    ],
    data: {
      title: 'Repair'
    }
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(repairsCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CrisisDetailResolver
  ]
})
export class RepairCenterRoutingModule { }


import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';

import { RepairTypeListComponent } from "./repair-type-list/repair-type-list.component"
import { RepairPFDetailComponent } from "./repairPF/repair-pf-detail.component"
import { RepairGSMDetailComponent } from "./repairGSM/repair-gsm-detail.component"
import {RepairGSMDisplayDetailComponent} from "./repairGSMDisplay/repair-gsm-display-detail.component";
import {RepairPfDoneComponent} from "./repairs-done/repairs-pf-done/repair-pf-done.component";
import {RepairGsmDoneComponent} from "./repairs-done/repairs-gsm-done/repair-gsm-done.component";
import {RepairGsmDisplayDoneComponent} from "./repairs-done/repairs-gsm-display-done/repair-gsm-display-done.component";


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
        path: 'pf',
        component: RepairPFDetailComponent,
        // canDeactivate: [CanDeactivateGuard],
        // resolve: {
        //   crisis: CrisisDetailResolver
        // }
      },
      {
        path: 'gsm',
        component: RepairGSMDetailComponent
      },
      {
        path: 'gsm-display',
        component: RepairGSMDisplayDetailComponent
      }
    ],
    data: {
      title: 'Reparaţii'
    }
  },
  {
    path: 'repairs-done',
    component: RepairTypeListComponent,
    children: [
      {
        path: '',
        redirectTo: 'repairs-done',
        pathMatch: 'full'
      },
      {
        path: 'pf',
        component: RepairPfDoneComponent
      },
      {
        path: 'gsm',
        component: RepairGsmDoneComponent
      },
      {
        path: 'gsm-display',
        component: RepairGsmDisplayDoneComponent
      }
    ],
    data: {
      title: 'Reparaţii/Terminat'
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

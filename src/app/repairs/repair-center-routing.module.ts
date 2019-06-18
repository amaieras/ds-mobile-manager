
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepairTypeListComponent } from './repair-type-list/repair-type-list.component';
import { RepairPFDetailComponent } from './repairPF/repair-pf-detail.component';
import { RepairGSMDetailComponent } from './repairGSM/repair-gsm-detail.component';
import {RepairPfDoneComponent} from './repairs-done/repairs-pf-done/repair-pf-done.component';
import {RepairGsmDoneComponent} from './repairs-done/repairs-gsm-done/repair-gsm-done.component';
import {RepairGsmSentComponent} from './repairsGSMSent/repair-gsm-sent.component';


const repairsCenterRoutes: Routes = [
  {
    path: 'repairs',
    component: RepairTypeListComponent,
    children: [
      {
        path: '',
        redirectTo: 'repairs',
        pathMatch: 'full',
        // canActivate: [AuthGuard]
      },
      {
        path: 'pf',
        component: RepairPFDetailComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'gsm',
        component: RepairGSMDetailComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'gsm-sent',
        component: RepairGsmSentComponent,
        // canActivate: [AuthGuard]
      }
    ],
    data: {
      title: 'Reparaţii',
      position: 3
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'repairs-done',
    component: RepairTypeListComponent,
    children: [
      {
        path: '',
        redirectTo: 'repairs-done',
        pathMatch: 'full',
        // canActivate: [AuthGuard]
      },
      {
        path: 'pf',
        component: RepairPfDoneComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'gsm',
        component: RepairGsmDoneComponent,
        // canActivate: [AuthGuard]
      }
    ],
    // canActivate: [AuthGuard],
    data: {
      title: 'Reparaţii/Terminat',
      position: 4
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
  ]
})
export class RepairCenterRoutingModule { }

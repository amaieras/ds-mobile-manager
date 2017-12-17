import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  GrowlModule, DropdownModule, CalendarModule, SpinnerModule, TooltipModule,
  SelectButtonModule
} from 'primeng/primeng';

import { ClientTypeListComponent } from './client-type-list/client-type-list.component';
import { ClientTypeService } from './client-type-list/client-type.service';
import { ClientPfDetailComponent } from './clientPF/client-pf-detail.component';
import { ClientPFService } from './clientPF/client-pf-detail.service';
import { ClientGSMDetailComponent } from './clientGSM/client-gsm-detail.component';
import { ClientGSMService } from './clientGSM/client-gsm-detail.service';
import {UtilService} from '../utils/util.service';
import {PhoneListComponent} from './clientPF/phone-list/phone-list.component';
import {ProblemListComponent} from './shared/problem-list/problem-list.component';
import {PhoneGSMListComponent} from './clientGSM/phone-gsm-list/phone-gsm-list.component';
import {ProblemListService} from './shared/problem-list/problem-list.service';
import {PhoneCascadeService} from '../shared/phone-cascade.service';
import {AboutUsService} from 'app/clients/clientPF/phone-list/about-us/about-us.service';
import {ClientGSMDisplayComponent} from "./clientGSMDisplay/client-gsm-display.component";
import {PhoneListService} from "./clientPF/phone-list/phone-list.service";
import {SharedDsModule} from "../shared/shared-ds.module";
import {ClientGSMDisplayService} from "./clientGSMDisplay/client-gsm-display-detail.service";
import {PhoneGSMDisplayListComponent} from "./clientGSMDisplay/phone-gsm-display-list/phone-gsm-display-list.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //primeng
    GrowlModule,
    DropdownModule,
    CalendarModule,
    SpinnerModule,
    TooltipModule,
    SharedDsModule,
    SelectButtonModule
  ],
  declarations: [
    ClientTypeListComponent,
    ClientPfDetailComponent,
    ClientGSMDetailComponent,
    PhoneListComponent,
    ProblemListComponent,
    PhoneGSMListComponent,
    PhoneGSMDisplayListComponent,
    ClientGSMDisplayComponent

  ],
  providers: [
    ClientTypeService,
    ClientPFService,
    ClientGSMService,
    UtilService,
    ProblemListService,
    ClientTypeService,
    PhoneCascadeService,
    AboutUsService,
    PhoneListService,
    ClientGSMDisplayService
  ]
})
export class ClientModule { }

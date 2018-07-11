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
import { ClientPfDetailComponent } from './client-pf/client-pf-detail.component';
import { ClientPFService } from './client-pf/client-pf-detail.service';
import { ClientGSMDetailComponent } from './client-gsm/client-gsm-detail.component';
import { ClientGSMService } from './client-gsm/client-gsm-detail.service';
import {UtilService} from '../../../utils/util.service';
import {PhoneListComponent} from './client-pf/phone-pf-list/phone-list.component';
import {PhoneGSMListComponent} from './client-gsm/phone-gsm-list/phone-gsm-list.component';
import {PhoneCascadeService} from '../../../shared/phone-cascade.service';
import {AboutUsService} from 'app/main/apps/clients/client-pf/phone-pf-list/about-us/about-us.service';
import {PhoneListService} from "./client-pf/phone-pf-list/phone-list.service";
import {SharedDsModule} from "../../../shared/shared-ds.module";
import {TitleCasePipe} from "../../../shared/TitleCasePipe";
import {ClientService} from "./services/client.service";




@NgModule({
  imports: [
    SharedDsModule,
    ReactiveFormsModule,
    RouterModule,
    //primeng
    GrowlModule,
    DropdownModule,
    CalendarModule,
    SpinnerModule,
    TooltipModule,
    SelectButtonModule
  ],
  declarations: [
    ClientTypeListComponent,
    ClientPfDetailComponent,
    ClientGSMDetailComponent,
    PhoneListComponent,
    PhoneGSMListComponent,
    TitleCasePipe

  ],
  providers: [
    ClientTypeService,
    ClientPFService,
    ClientGSMService,
    UtilService,
    PhoneCascadeService,
    AboutUsService,
    PhoneListService,
    ClientService
  ]
})
export class ClientModule { }

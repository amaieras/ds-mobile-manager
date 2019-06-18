import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
  GrowlModule,
  DropdownModule,
  CalendarModule,
  SpinnerModule,
  TooltipModule,
  SelectButtonModule
} from "primeng/primeng";

import { ClientTypeListComponent } from "./client-type-list/client-type-list.component";
import { ClientTypeService } from "./client-type-list/client-type.service";
import { ClientPfDetailComponent } from "./clientPF/client-pf-detail.component";
import { ClientPFService } from "./clientPF/client-pf-detail.service";
import { ClientGSMDetailComponent } from "./clientGSM/client-gsm-detail.component";
import { ClientGSMService } from "./clientGSM/client-gsm-detail.service";
import { UtilService } from "../utils/util.service";
import { PhoneListComponent } from "./clientPF/phone-list/phone-list.component";
import { PhoneGSMListComponent } from "./clientGSM/phone-gsm-list/phone-gsm-list.component";
import { PhoneCascadeService } from "../shared/phone-cascade.service";
import { AboutUsService } from "app/clients/clientPF/phone-list/about-us/about-us.service";
import { PhoneListService } from "./clientPF/phone-list/phone-list.service";
import { SharedDsModule } from "../shared/shared-ds.module";
import { TitleCasePipe } from "../shared/TitleCasePipe";
import { ClientService } from "./shared/client.service";

@NgModule({
  imports: [
    SharedDsModule,
    ReactiveFormsModule,
    RouterModule,
    // primeng
    GrowlModule,
    DropdownModule,
    CalendarModule,
    SpinnerModule,
    TooltipModule,
    SelectButtonModule
  ],
  exports: [ClientTypeListComponent],
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
export class ClientModule {}

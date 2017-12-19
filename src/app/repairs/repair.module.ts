import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RepairTypeListComponent } from "./repair-type-list/repair-type-list.component";
import { RepairPFDetailComponent } from "./repairPF/repair-pf-detail.component";
import { RepairGSMDetailComponent } from "./repairGSM/repair-gsm-detail.component"
import {
  CalendarModule, DataTableModule, DropdownModule, GrowlModule, MultiSelectModule,
  SharedModule
} from "primeng/primeng"
import { DialogModule, CheckboxModule } from "primeng/primeng";
import { RepairPFDetailService } from "./repairPF/repair-pf-detail.service";
import { RepairGSMDetailService } from "./repairGSM/repair-gsm-detail.service";
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {SharedDsModule} from "../shared/shared-ds.module";
import {RepairGSMDisplayDetailService} from "./repairGSMDisplay/repair-gsm-display-detail.service";
import {RepairGSMDisplayDetailComponent} from "./repairGSMDisplay/repair-gsm-display-detail.component";
import {RepairPfDoneComponent} from 'app/repairs/repairs-done/repairs-pf-done/repair-pf-done.component';
import {RepairGsmDoneComponent} from "./repairs-done/repairs-gsm-done/repair-gsm-done.component";
import {RepairGsmDisplayDoneComponent} from "./repairs-done/repairs-gsm-display-done/repair-gsm-display-done.component";


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
//primeng
    GrowlModule,

    SharedDsModule
  ],
  declarations: [
    RepairTypeListComponent,
    RepairPFDetailComponent,
    RepairGSMDetailComponent,
    RepairGSMDisplayDetailComponent,
    RepairPfDoneComponent,
    RepairGsmDoneComponent,
    RepairGsmDisplayDoneComponent

  ],
  providers: [
    RepairPFDetailService,
    RepairGSMDetailService,
    RepairGSMDisplayDetailService
  ]
})
export class RepairModule { }

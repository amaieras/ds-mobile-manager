import {NgModule} from "@angular/core";
import {AddOfferComponent} from "./offer-add/add-offer.component";
import {ViewOfferComponent} from "./offer-view/view-offer.component";
import {OfferOptionListComponent} from "./offer-option-list/offer-option-list.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {OfferOptionService} from "./offer-option-list/offer-option.service";
import {GrowlModule} from "primeng/growl";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OfferPhoneListComponent} from "./offer-add/offer-phone-list/offer-phone-list.component";
import {DataTableModule, DropdownModule, MultiSelectModule} from "primeng/primeng";
import {SharedDsModule} from "../shared/shared-ds.module";
import {TableModule} from "primeng/table";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GrowlModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SharedDsModule,
    TableModule,
    DataTableModule,
    MultiSelectModule
  ],
  declarations: [
    AddOfferComponent,
    ViewOfferComponent,
    OfferOptionListComponent,
    OfferPhoneListComponent

  ],
  providers: [OfferOptionService]
})
export class OfferModule { }

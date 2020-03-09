import { NgModule } from "@angular/core";
import { UtilService } from "./util.service";
import { InfoMessageComponent } from "./new-feature-info-message/info-message.component";
import { CardModule } from "primeng/card";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [CardModule, CommonModule, BrowserModule],
  declarations: [InfoMessageComponent],
  exports: [InfoMessageComponent],

  providers: [UtilService]
})
export class UtilsModule {}

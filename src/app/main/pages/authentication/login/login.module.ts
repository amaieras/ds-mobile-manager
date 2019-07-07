import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";

import { LoginComponent } from "app/main/pages/authentication/login/login.component";
import { FuseConfigService } from "../../../../../@fuse/services/config.service";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    FuseSharedModule
  ],
  providers: [FuseConfigService]
})
export class LoginModule {}

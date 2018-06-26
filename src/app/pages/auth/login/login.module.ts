import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AdminGuard} from "../../../guards/admin.guard";

const routes = [
  {
    path     : '/login',
    component: LoginComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports     : [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    FuseSharedModule,

    ReactiveFormsModule
  ]
})
export class LoginModule
{
}

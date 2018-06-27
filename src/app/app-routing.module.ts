import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {UserResolver} from "./user/user.resolver";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

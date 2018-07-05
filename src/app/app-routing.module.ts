import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./navigation/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

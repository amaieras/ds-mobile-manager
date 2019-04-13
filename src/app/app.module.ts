import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonModule } from './app-common/app-common.module';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppToolbarService } from './app-toolbar/app-toolbar.service';
import { ClientModule } from './clients/client.module';
import { ClientCenterRoutingModule } from './clients/client-center-routing.module';
import 'hammerjs';
import {RepairModule} from './repairs/repair.module';
import {RepairCenterRoutingModule} from './repairs/repair-center-routing.module';
import {AngularFirestoreModule} from "angularfire2/firestore";
import {CheckoutModule} from "./checkout/checkout.module";
import {CheckoutCenterRoutingModule} from "./checkout/checkout-center-routing.module";
import {ChartsModule} from "./chart/chart.module";
import {ChartCenterRoutingModule} from "./chart/chart-center-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {OfferModule} from "./offer/offer.module";
import {OfferCenterRouting} from "./offer/offer-center-routing";
import {ReportsModule} from "./reports/reports.module";
import {ReportsCenterRoutingModule} from "./reports/reports-center-routing.module";
import {AuthService} from "./guards/auth.service";
import {AuthGuard} from 'app/guards/auth.guard';
import {RegisterComponent} from "./main/pages/authentication/register/register.component";
import {LoginModule} from "./main/pages/authentication/login/login.module";
import { NavbarComponent } from './layout/components/navbar/navbar.component';
import {DashboardComponent} from "./main/apps/dashboard/dashboard.component";


export const firebaseConfig = {
  apiKey: 'AIzaSyDL-_f_lQb4dnkx6GRrL7O7L7sp2A1Kj1w',
    authDomain: 'ds-mobile-dev.firebaseapp.com',
    databaseURL: 'https://ds-mobile-dev.firebaseio.com',
    projectId: 'ds-mobile-dev',
    storageBucket: 'ds-mobile-dev.appspot.com',
    messagingSenderId: '931169905269'
}
export const firebaseConfigProd = {
  apiKey: "AIzaSyDIwIoUurGaLK6-VChLEHw7X_zwxIlLGRI",
  authDomain: "gen-phone-service-prod-36af8.firebaseapp.com",
  databaseURL: "https://gen-phone-service-prod-36af8.firebaseio.com",
  projectId: "gen-phone-service-prod-36af8",
  storageBucket: "gen-phone-service-prod-36af8.appspot.com",
  messagingSenderId: "281035311399"

}

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        DashboardComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppCommonModule,
        AppRoutingModule,
        RouterModule,
        ClientModule,
        RepairModule,
        CheckoutModule,
        ReportsModule,
        ChartsModule,
        OfferModule,
        OfferCenterRouting,
        CheckoutCenterRoutingModule,
        ReportsCenterRoutingModule,
        ChartCenterRoutingModule,
        ClientCenterRoutingModule,
        RepairCenterRoutingModule,
        LoginModule,
        //firebase
        AngularFireModule.initializeApp(firebaseConfigProd),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        ReactiveFormsModule
    ],
    providers: [AppToolbarService, AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }

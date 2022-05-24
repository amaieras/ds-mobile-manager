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
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {CheckoutModule} from './checkout/checkout.module';
import {CheckoutCenterRoutingModule} from './checkout/checkout-center-routing.module';
import {ChartsModule} from './chart/chart.module';
import {ChartCenterRoutingModule} from './chart/chart-center-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {OfferModule} from './offer/offer.module';
import {OfferCenterRouting} from './offer/offer-center-routing';
import {ReportsModule} from './reports/reports.module';
import {ReportsCenterRoutingModule} from './reports/reports-center-routing.module';
import {AuthService} from './guards/auth.service';
import {AuthGuard} from 'app/guards/auth.guard';
import {RegisterComponent} from './main/pages/authentication/register/register.component';
import {LoginModule} from './main/pages/authentication/login/login.module';
import { NavbarComponent } from './layout/components/navbar/navbar.component';
import {DashboardComponent} from './main/apps/dashboard/dashboard.component';

export const firebaseConfigProdNew = {
  apiKey: 'AIzaSyBOoqLV5u8t6q-7yV2DlMR5-s-7Hndxs1Q',
  authDomain: 'florin-ds-mobile-prod.firebaseapp.com',
  databaseURL: 'https://florin-ds-mobile-prod.firebaseio.com',
  projectId: 'florin-ds-mobile-prod',
  storageBucket: 'florin-ds-mobile-prod.appspot.com',
  messagingSenderId: '78644814075',
  appId: '1:78644814075:web:746dfc62658163b174105e',
  measurementId: 'G-8S0RE0TGZD'
};

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
        AngularFireModule.initializeApp(firebaseConfigProdNew),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        ReactiveFormsModule
    ],
    providers: [AppToolbarService, AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }

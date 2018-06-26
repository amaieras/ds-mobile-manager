import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import {CoreModule} from "./core/core.module";
import {ReportsModule} from "./reports/reports.module";
import {ReportsCenterRoutingModule} from "./reports/reports-center-routing.module";
import {environment} from "../environments/environment";
import {AdminGuard} from "./guards/admin.guard";
import {LoginModule} from "./pages/auth/login/login.module";

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
    declarations: [
        AppComponent
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
        RouterModule.forRoot([{
            path: '', redirectTo: 'login', pathMatch: 'full'
        }]),
        //firebase
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        CoreModule,
        LoginModule
    ],
    providers: [AppToolbarService, AdminGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }

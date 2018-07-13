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
import { ClientModule } from './main/apps/clients/client.module';
import { ClientCenterRoutingModule } from './main/apps/clients/client-center-routing.module';
import 'hammerjs';
import {RepairModule} from './main/apps/repairs/repair.module';
import {RepairCenterRoutingModule} from './main/apps/repairs/repair-center-routing.module';
import {AngularFirestoreModule} from "angularfire2/firestore";
import {CheckoutModule} from "./main/apps/checkout/checkout.module";
import {CheckoutCenterRoutingModule} from "./main/apps/checkout/checkout-center-routing.module";
import {ChartsModule} from "./main/apps/charts/chart.module";
import {ChartCenterRoutingModule} from "./main/apps/charts/chart-center-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {OfferModule} from "./main/apps/offers/offer.module";
import {OfferCenterRouting} from "./main/apps/offers/offer-center-routing";
import {ReportsModule} from "./main/apps/reports/reports.module";
import {ReportsCenterRoutingModule} from "./main/apps/reports/reports-center-routing.module";
import {environment} from "../environments/environment";
import {AuthService} from "./guards/auth.service";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from 'app/guards/auth.guard';
import {RegisterComponent} from "./main/pages/authentication/register/register.component";
import {LoginModule} from "./main/pages/authentication/login/login.module";
import {PageNotFoundComponent} from "./main/pages/page-not-found/page-not-found.component";
import {NavBarComponent} from "./navigation/navbar/navbar.component";
import {FuseModule} from "../@fuse/fuse.module";
import {FuseSharedModule} from "../@fuse/shared.module";
import {FuseSidebarModule, FuseThemeOptionsModule} from "../@fuse/components";
import {fuseConfig} from "./fuse-config";
import {MatButtonModule, MatIconModule} from "@angular/material";
import {LayoutModule} from "./layout/layout.module";


export const firebaseConfig = environment.firebaseConfig;

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        PageNotFoundComponent,
        NavBarComponent
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

        //firebase
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
        LoginModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // Material moment date module
        // MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // App modules
        LayoutModule

    ],
    providers: [AppToolbarService, AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }

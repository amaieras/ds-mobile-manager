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
import { AutocompleteModule } from 'ng2-input-autocomplete';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDL-_f_lQb4dnkx6GRrL7O7L7sp2A1Kj1w',
    authDomain: 'ds-mobile-dev.firebaseapp.com',
    databaseURL: 'https://ds-mobile-dev.firebaseio.com',
    projectId: 'ds-mobile-dev',
    storageBucket: 'ds-mobile-dev.appspot.com',
    messagingSenderId: '931169905269'
  },
  firebaseConfigProd: {
    apiKey: 'AIzaSyAexP1Haz3RsxHqPX--XncgC1Rxef_wMDA',
    authDomain: 'ds-mobile-prod.firebaseapp.com',
    databaseURL: 'https://ds-mobile-prod.firebaseio.com',
    projectId: 'ds-mobile-prod',
    storageBucket: '',
    messagingSenderId: '662623055885'
  }
}
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
        ChartsModule,
        CheckoutCenterRoutingModule,
        ChartCenterRoutingModule,
        ClientCenterRoutingModule,
        RepairCenterRoutingModule,
        RouterModule.forRoot([{
            path: '', redirectTo: '/client', pathMatch: 'full'
        }]),
        //firebase
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AutocompleteModule
    ],
    providers: [AppToolbarService],
    bootstrap: [AppComponent]
})
export class AppModule { }

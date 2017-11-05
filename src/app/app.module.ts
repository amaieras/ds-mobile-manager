import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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

export const firebaseConfigProd = {
  apiKey: 'AIzaSyAexP1Haz3RsxHqPX--XncgC1Rxef_wMDA',
  authDomain: 'ds-mobile-prod.firebaseapp.com',
  databaseURL: 'https://ds-mobile-prod.firebaseio.com',
  projectId: 'ds-mobile-prod',
  storageBucket: '',
  messagingSenderId: '662623055885'
};
export const firebaseConfig = {
  apiKey: 'AIzaSyDL-_f_lQb4dnkx6GRrL7O7L7sp2A1Kj1w',
  authDomain: 'ds-mobile-dev.firebaseapp.com',
  databaseURL: 'https://ds-mobile-dev.firebaseio.com',
  projectId: 'ds-mobile-dev',
  storageBucket: 'ds-mobile-dev.appspot.com',
  messagingSenderId: '931169905269'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        AppCommonModule,
        AppRoutingModule,
        RouterModule,
        ClientModule,
        RepairModule,
        ClientCenterRoutingModule,
        RepairModule,
        RepairCenterRoutingModule,
        RouterModule.forRoot([{
            path: '', redirectTo: '/client', pathMatch: 'full'
        }]),
        //firebase
        AngularFireModule.initializeApp(firebaseConfigProd),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    providers: [AppToolbarService],
    bootstrap: [AppComponent]
})
export class AppModule { }

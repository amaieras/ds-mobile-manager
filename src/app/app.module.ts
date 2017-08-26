import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonModule } from './app-common/app-common.module';
import { RouterModule } from "@angular/router";
import { AngularFireModule } from "angularfire2";

import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppToolbarService } from './app-toolbar/app-toolbar.service';
import { ClientModule } from "./clients/client.module"
import { ClientCenterRoutingModule } from "./clients/client-center-routing.module";
import { ClientTypeService } from "./clients/client-type-list/client-type.service"
import 'hammerjs';
import {RepairModule} from "./repair/repair.module";
import {RepairRoutingModule} from "./repair/repair-routing.module";

export const firebaseConfig = {

  apiKey: "AIzaSyBgjig5r7-UpbJhtjhS37FaP1X5d6Hk6YA",
  authDomain: "dsmobile-526c1.firebaseapp.com",
  databaseURL: "https://dsmobile-526c1.firebaseio.com",
  projectId: "dsmobile-526c1",
  storageBucket: "dsmobile-526c1.appspot.com",
  messagingSenderId: "351194951974"
}

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
        ClientCenterRoutingModule,
        RepairModule,
        RepairRoutingModule,
        RouterModule.forRoot([{
            path: '', redirectTo: '/client', pathMatch: 'full'
        }]),
        //firebase
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    providers: [AppToolbarService, ClientTypeService],
    bootstrap: [AppComponent]
})
export class AppModule { }

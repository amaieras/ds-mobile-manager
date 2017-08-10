import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonModule } from './app-common/app-common.module';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppToolbarService } from './app-toolbar/app-toolbar.service';
import { ClientnModule } from "./client/client.module"
import { ClientRoutingModule } from "./client/client-routing.module"
import { TripModule } from './trip/trip.module';
import { TripRoutingModule } from './trip/trip-routing.module';
import { PersonModule } from './person/person.module';
import { PersonRoutingModule } from './person/person-routing.module';

import 'hammerjs';

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
        ClientnModule,
        ClientRoutingModule,
        TripModule,
        TripRoutingModule,
        PersonModule,
        PersonRoutingModule,
        RouterModule.forRoot([{
            path: '', redirectTo: '/client', pathMatch: 'full'
        }])
    ],
    providers: [AppToolbarService],
    bootstrap: [AppComponent]
})
export class AppModule { }

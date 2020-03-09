import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppCommonModule } from "./app-common/app-common.module";
import { RouterModule } from "@angular/router";
import { AngularFireModule } from "angularfire2";

import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AppToolbarService } from "./app-toolbar/app-toolbar.service";
import { ClientModule } from "./clients/client.module";
import { ClientCenterRoutingModule } from "./clients/client-center-routing.module";
import "hammerjs";
import { RepairModule } from "./repairs/repair.module";
import { RepairCenterRoutingModule } from "./repairs/repair-center-routing.module";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { CheckoutModule } from "./checkout/checkout.module";
import { CheckoutCenterRoutingModule } from "./checkout/checkout-center-routing.module";
import { ChartsModule } from "./chart/chart.module";
import { ChartCenterRoutingModule } from "./chart/chart-center-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { OfferModule } from "./offer/offer.module";
import { OfferCenterRouting } from "./offer/offer-center-routing";
import { ReportsModule } from "./reports/reports.module";
import { ReportsCenterRoutingModule } from "./reports/reports-center-routing.module";
import { AuthService } from "./guards/auth.service";
import { AuthGuard } from "app/guards/auth.guard";
import { RegisterComponent } from "./main/pages/authentication/register/register.component";
import { LoginModule } from "./main/pages/authentication/login/login.module";
import { NavbarComponent } from "./layout/components/navbar/navbar.component";
import { DashboardComponent } from "./main/apps/dashboard/dashboard.component";
import { CostModule } from "./costs/cost.module";
import { CostRoutingModule } from "./costs/cost-center-routing.module";
import { UtilsModule } from "./utils/utils.module";

export const firebaseConfig = {
  apiKey: "AIzaSyDL-_f_lQb4dnkx6GRrL7O7L7sp2A1Kj1w",
  authDomain: "ds-mobile-dev.firebaseapp.com",
  databaseURL: "https://ds-mobile-dev.firebaseio.com",
  projectId: "ds-mobile-dev",
  storageBucket: "ds-mobile-dev.appspot.com",
  messagingSenderId: "931169905269"
};
export const firebaseConfigProd = {
  apiKey: "AIzaSyAexP1Haz3RsxHqPX--XncgC1Rxef_wMDA",
  authDomain: "ds-mobile-prod.firebaseapp.com",
  databaseURL: "https://ds-mobile-prod.firebaseio.com",
  projectId: "ds-mobile-prod",
  storageBucket: "",
  messagingSenderId: "662623055885"
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
    CostModule,
    CostRoutingModule,
    UtilsModule,
    OfferCenterRouting,
    CheckoutCenterRoutingModule,
    ReportsCenterRoutingModule,
    ChartCenterRoutingModule,
    ClientCenterRoutingModule,
    RepairCenterRoutingModule,
    LoginModule,
    // firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [AppToolbarService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

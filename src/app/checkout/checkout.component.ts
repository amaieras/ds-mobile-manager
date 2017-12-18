

import {Component, OnInit} from "@angular/core";
import {CheckoutService} from "./checkout.service";
import {Checkout} from "../model/Checkout";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  checkout: Checkout[] = [new Checkout(0,0,0,0)];
  currDate = new Date();
  //total
  totalClientsPerDay = 0;
  totalIsRepairedPerDay = 0;
  totalIsRemainingPerDay = 0;
  totalIsRemaining = 0;
  totalCash = 0;
  totalCard = 0;

  //PF
  totalPFClientsPerDay = 0;
  totalPFIsRepaired = 0;
  constructor(private _checkoutService: CheckoutService) {
    this.currDate = new Date();
  }
  ngOnInit() {
    this.getTotalClientsPerDay(new Date());
    this.getTotalIsRepairedPerDay(new Date());
    this.getTotalIsRemainingPerDay(new Date());
    this.getTotalIsRemaining(new Date());
    this.getTotalReceipts(new Date());
  }
  getCheckoutForDate(event) {
    this.currDate = event;
    this.getTotalClientsPerDay(event);
    this.getTotalIsRepairedPerDay(event);
    this.getTotalIsRemainingPerDay(event);
    this.getTotalIsRemaining(event);
    this.getTotalReceipts(event);
  }


  getTotalReceipts(event) {
    let clientPFIsRepaired;
    let clientGSMIsRepaired;
    let clientGSMDisplayIsRepaired;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
          let totalCash = 0;
          clientPFIsRepaired = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isRepaired;
          });
          clientGSMIsRepaired = gsm.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isRepaired;
          });
          clientGSMDisplayIsRepaired = gsmDisplay.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isRepaired;
          });
          clientPFIsRepaired.forEach(c => {
            totalCash = totalCash + +c.priceOffer;
          });
          clientGSMIsRepaired.forEach(c => {
            totalCash = totalCash + +c.priceOffer;
          });
          clientGSMDisplayIsRepaired.forEach(c => {
            totalCash = totalCash + +c.priceOffer;
          });
          this.totalCash = totalCash;
        });
      });
    });
  }

  getTotalClientsPerDay(event) {
    let clientPFPerDay;
    let clientGSMPerDay;
    let clientGSMDisplayPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
          clientPFPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;
          clientGSMPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;
          clientGSMDisplayPerDay = gsmDisplay.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;
          this.totalClientsPerDay = clientPFPerDay + clientGSMPerDay  + clientGSMDisplayPerDay;
        });
      });
    });
  }


  getTotalIsRepairedPerDay(event) {
    let clientPFIsRepairedPerDay;
    let clientGSMIsRepairedPerDay;
    let clientGSMDisplayIsRepairedPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
          clientPFIsRepairedPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isRepaired;
          }).length;
          clientGSMIsRepairedPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isRepaired;
          }).length;
          clientGSMDisplayIsRepairedPerDay = gsmDisplay.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isRepaired;
          }).length;
          this.totalIsRepairedPerDay = clientPFIsRepairedPerDay + clientGSMIsRepairedPerDay  + clientGSMDisplayIsRepairedPerDay;
        });
      });
    });
  }

  getTotalIsRemainingPerDay(event) {
    let clientPFIsRemainingPerDay;
    let clientGSMIsRemainingPerDay;
    let clientGSMDisplayIsRemainingPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
          clientPFIsRemainingPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isRepaired;
          }).length;
          clientGSMIsRemainingPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isRepaired;
          }).length;
          clientGSMDisplayIsRemainingPerDay = gsmDisplay.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isRepaired;
          }).length;
          this.totalIsRemainingPerDay = clientPFIsRemainingPerDay + clientGSMIsRemainingPerDay  + clientGSMDisplayIsRemainingPerDay;
        });
      });
    });
  }

  getTotalIsRemaining(event) {
    let clientPFIsRemaining;
    let clientGSMIsRemaining;
    let clientGSMDisplayIsRemaining;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
          clientPFIsRemaining = pf.filter(function (client) {
            return !client.isRepaired;
          }).length;
          clientGSMIsRemaining = gsm.filter(function (client) {
            return !client.isRepaired;
          }).length;
          clientGSMDisplayIsRemaining = gsmDisplay.filter(function (client) {
            return !client.isRepaired;
          }).length;
          this.totalIsRemaining = clientPFIsRemaining + clientGSMIsRemaining  + clientGSMDisplayIsRemaining;
        });
      });
    });
  }
}

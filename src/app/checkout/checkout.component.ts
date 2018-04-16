

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
  total = 0;

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
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          let totalCash = 0;
          let totalCard = 0;
          let total = 0;
          clientPFIsRepaired = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          });
          clientGSMIsRepaired = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          });
          clientPFIsRepaired.forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._advance;
            total = total + +c.paymentMethod._advance ;
          });

          clientGSMIsRepaired.forEach(c => {
            totalCash = +totalCash +  +c.paymentMethod._advance;
            total = total + +c.paymentMethod._advance;
          });

          clientPFIsRepaired = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isPayed;
          });
          clientGSMIsRepaired = gsm.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isPayed;
          });

          clientPFIsRepaired.forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._cash + +c.paymentMethod._repayment;
            totalCard = totalCard + +c.paymentMethod._card + +c.paymentMethod._collector;
            total = total + +c.paymentMethod._cash + +c.paymentMethod._card + +c.paymentMethod._repayment + +c.paymentMethod._collector;
          });
          clientGSMIsRepaired.forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._cash + +c.paymentMethod._repayment;
            totalCard = totalCard + +c.paymentMethod._card + +c.paymentMethod._collector;
            total = total + +c.paymentMethod._cash + +c.paymentMethod._card + +c.paymentMethod._repayment + +c.paymentMethod._collector;
          });
          this.totalCash = totalCash || 0;
          this.totalCard = totalCard || 0;

          this.total = total || 0;
      });
    });
  }

  getTotalClientsPerDay(event) {
    let clientPFPerDay;
    let clientGSMPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          clientPFPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;
          clientGSMPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;
          this.totalClientsPerDay = clientPFPerDay + clientGSMPerDay;
        });
      });
  }


  getTotalIsRepairedPerDay(event) {
    let clientPFIsRepairedPerDay;
    let clientGSMIsRepairedPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          clientPFIsRepairedPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isPayed;
          }).length;
          clientGSMIsRepairedPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isPayed;
          }).length;
          this.totalIsRepairedPerDay = clientPFIsRepairedPerDay + clientGSMIsRepairedPerDay ;
      });
    });
  }

  getTotalIsRemainingPerDay(event) {
    let clientPFIsRemainingPerDay;
    let clientGSMIsRemainingPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          clientPFIsRemainingPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isPayed;
          }).length;
          clientGSMIsRemainingPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isPayed;
          }).length;
          this.totalIsRemainingPerDay = clientPFIsRemainingPerDay + clientGSMIsRemainingPerDay ;
      });
    });
  }

  getTotalIsRemaining(event) {
    let clientPFIsRemaining;
    let clientGSMIsRemaining;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          clientPFIsRemaining = pf.filter(function (client) {
            return !client.isPayed;
          }).length;
          clientGSMIsRemaining = gsm.filter(function (client) {
            return !client.isPayed;
          }).length;
          this.totalIsRemaining = clientPFIsRemaining + clientGSMIsRemaining;
        });
    });
  }

  showClients(opt) {
    console.log(opt)
  }
}

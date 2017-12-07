

import {Component, OnInit} from "@angular/core";
import {CheckoutService} from "./checkout.service";
import {ClientPF} from "../model/ClientPF";
import {Checkout} from "../model/Checkout";

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutPfComponent implements OnInit {
  checkout: Checkout = new Checkout(0, 0, 0, 0);
  currDay = new Date();
  constructor(private _checkoutService: CheckoutService) {}
  ngOnInit() {
    this.getCheckoutInfo();
  }

  private getCheckoutInfo() {
    const currDay = new Date();
    let clientsPerDay = 0;
    let totalIsRepaired = 0;
    let totalInProgress = 0;
    let clientIsRepaired;
    this._checkoutService.getClientsCurrDay().subscribe(item => {
      let totalCash = 0;
      clientsPerDay = item.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return clientDate.toDateString() === currDay.toDateString();
      }).length
      clientIsRepaired = item.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return clientDate.toDateString() === currDay.toDateString() && client.isRepaired === true;
      })
      totalInProgress = item.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return  clientDate.toDateString() === currDay.toDateString() && client.isRepaired === false;
      }).length
      clientIsRepaired.forEach(c => {
        totalCash = totalCash + +c.priceOffer;
      })
      totalIsRepaired = clientIsRepaired.length;
      this.checkout = new Checkout(clientsPerDay, totalIsRepaired, totalInProgress, totalCash);
    });
  }

}

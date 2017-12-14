

import {Component, OnInit} from "@angular/core";
import {CheckoutService} from "./checkout.service";
import {Checkout} from "../model/Checkout";

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutPfComponent implements OnInit {

  checkout: Checkout = new Checkout(0, 0, 0, 0, 0);
  currDate = new Date();
  constructor(private _checkoutService: CheckoutService) {}
  ngOnInit() {
    this.getCheckoutForDate(new Date());
  }

  getCheckoutForDate(event) {
    // let a = event.split(/[^0-9]/);
    // const d = new Date (a[0],a[1]-1,a/[2],a[3],a[4],a[5] );
     this.currDate = event;
    let clientsPerDay = 0;
    let totalIsRepaired = 0;
    let totalInProgressPerDay = 0;
    let totalInProgress = 0;
    let clientIsRepaired;
    this._checkoutService.getClientsCurrDay().subscribe(item => {
      let totalCash = 0;
      clientsPerDay = item.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return clientDate.toDateString() === event.toDateString();
      }).length
      clientIsRepaired = item.filter(function (client) {
        const clientDate = new Date(+client.deliveredDate);
        return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
      })
      totalInProgressPerDay = item.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return  clientDate.toDateString() === event.toDateString() && client.isRepaired === false;
      }).length
      totalInProgress = item.filter(function (client) {
        return client.isRepaired === false;
      }).length
      clientIsRepaired.forEach(c => {
        totalCash = totalCash + +c.priceOffer;
      })
      totalIsRepaired = clientIsRepaired.length;
      this.checkout = new Checkout(clientsPerDay, totalIsRepaired, totalInProgressPerDay, totalCash, totalInProgress);
    });
  }

}

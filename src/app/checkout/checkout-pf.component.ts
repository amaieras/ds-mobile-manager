

import {Component, OnInit} from "@angular/core";
import {CheckoutService} from "./checkout.service";
import {Checkout} from "../model/Checkout";

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutPfComponent implements OnInit {

  checkout: Checkout[] = [new Checkout(0, 0, 0, 0, 0)];
  currDate = new Date();
  totalCash = 0;
  totalCard = 0;
  constructor(private _checkoutService: CheckoutService) {}
  ngOnInit() {
    this.getPFCheckoutForDate(new Date());
    this.getTotalReceipts(new Date());
  }

  getPFCheckoutForDate(event) {
    // let a = event.split(/[^0-9]/);
    // const d = new Date (a[0],a[1]-1,a/[2],a[3],a[4],a[5] );
    this.currDate = event;
    let clientsPFPerDay = 0;
    let totalPFIsRepaired = 0;
    let totalPFInProgressPerDay = 0;
    let totalPFInProgress = 0;
    let clientPFIsRepaired;

    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
          let totalCash = 0;
          clientsPFPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length
          clientPFIsRepaired = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
          })
          totalPFInProgressPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return  clientDate.toDateString() === event.toDateString() && client.isRepaired === false;
          }).length
          totalPFInProgress = pf.filter(function (client) {
            return client.isRepaired === false;
          }).length
          clientPFIsRepaired.forEach(c => {
            totalCash = totalCash + +c.priceOffer;
          })
          totalPFIsRepaired = clientPFIsRepaired.length;
          this.checkout.push(new Checkout(clientsPFPerDay, totalPFIsRepaired, totalPFInProgressPerDay, totalCash, totalPFInProgress));
        });


  }

  getGSMCheckoutForDate(event) {
     this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
     })
   }

  getGSMDisplayCheckoutForDate(event) {
    this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
    });
  }

  getTotalReceipts(event){
    let clientPFIsRepaired;
    let clientGSMIsRepaired;
    let clientGSMDisplayIsRepaired;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
          let totalCash = 0;
          clientPFIsRepaired = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
          });
          clientGSMIsRepaired = gsm.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
          });
          clientGSMDisplayIsRepaired = gsmDisplay.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
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
      })
    })
  }

}

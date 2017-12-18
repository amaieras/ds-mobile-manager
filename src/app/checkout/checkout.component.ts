

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
  totalPFClientsPerDay = 0;
  totalCash = 0;
  totalCard = 0;
  constructor(private _checkoutService: CheckoutService) {
    this.currDate = new Date();
  }
  ngOnInit() {
    this.getPFCheckoutForDate(new Date());
    console.log(this.checkout)
    // this.getGSMCheckoutForDate(new Date());
    // this.getGSMDisplayCheckoutForDate(new Date());
    this.getTotalReceipts(new Date());
  }

  getPFCheckoutForDate(event){
    // let a = event.split(/[^0-9]/);
    // const d = new Date (a[0],a[1]-1,a/[2],a[3],a[4],a[5] );
    let clientsPFPerDay = 0;
    let totalPFIsRepaired = 0;
    let totalPFInProgressPerDay = 0;
    let totalPFInProgress = 0;
    let clientPFIsRepaired;

    let clientsGSMPerDay = 0;
    let totalGSMIsRepaired = 0;
    let totalGSMInProgressPerDay = 0;
    let totalGSMInProgress = 0;
    let clientGSMIsRepaired;

    let clientsGSMDisplayPerDay = 0;
    let totalGSMDisplayIsRepaired = 0;
    let totalGSMDisplayInProgressPerDay = 0;
    let totalGSMDisplayInProgress = 0;
    let clientGSMDisplayIsRepaired;

    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
          clientsPFPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length
          this.totalPFClientsPerDay = clientsPFPerDay;
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
          totalPFIsRepaired = clientPFIsRepaired.length;
          this.checkout.push(new Checkout(clientsPFPerDay, totalPFIsRepaired, totalPFInProgressPerDay, totalPFInProgress));

        clientsGSMPerDay = gsm.filter(function (client) {
          const clientDate = new Date(+client.addedDate);
          return clientDate.toDateString() === event.toDateString();
        }).length
        clientGSMIsRepaired = gsm.filter(function (client) {
          const clientDate = new Date(+client.deliveredDate);
          return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
        })
        totalGSMInProgressPerDay = gsm.filter(function (client) {
          const clientDate = new Date(+client.addedDate);
          return  clientDate.toDateString() === event.toDateString() && client.isRepaired === false;
        }).length
        totalGSMInProgress = gsm.filter(function (client) {
          return client.isRepaired === false;
        }).length
        totalGSMIsRepaired = clientGSMIsRepaired.length;
        this.checkout.push(new Checkout(clientsGSMPerDay, totalGSMIsRepaired, totalGSMInProgressPerDay, totalGSMInProgress));

          clientsGSMDisplayPerDay = gsmDisplay.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length
          clientGSMDisplayIsRepaired = gsmDisplay.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
          })
          totalGSMDisplayInProgressPerDay = gsmDisplay.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return  clientDate.toDateString() === event.toDateString() && client.isRepaired === false;
          }).length
          totalGSMDisplayInProgress = gsmDisplay.filter(function (client) {
            return client.isRepaired === false;
          }).length
          totalGSMDisplayIsRepaired = clientGSMDisplayIsRepaired.length;
          this.checkout.push(new Checkout(clientsGSMDisplayPerDay, totalGSMDisplayIsRepaired, totalGSMDisplayInProgressPerDay, totalGSMDisplayInProgress));
        });
      });
    });
  }

  getGSMCheckoutForDate(event) {
    let clientsGSMPerDay = 0;
    let totalGSMIsRepaired = 0;
    let totalGSMInProgressPerDay = 0;
    let totalGSMInProgress = 0;
    let clientGSMIsRepaired;
    this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
      clientsGSMPerDay = gsm.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return clientDate.toDateString() === event.toDateString();
      }).length
      clientGSMIsRepaired = gsm.filter(function (client) {
        const clientDate = new Date(+client.deliveredDate);
        return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
      })
      totalGSMInProgressPerDay = gsm.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return  clientDate.toDateString() === event.toDateString() && client.isRepaired === false;
      }).length
      totalGSMInProgress = gsm.filter(function (client) {
        return client.isRepaired === false;
      }).length
      totalGSMIsRepaired = clientGSMIsRepaired.length;
      this.checkout.push(new Checkout(clientsGSMPerDay, totalGSMIsRepaired, totalGSMInProgressPerDay, totalGSMInProgress));
    })
   }

  getGSMDisplayCheckoutForDate(event) {
    let clientsGSMDisplayPerDay = 0;
    let totalGSMDisplayIsRepaired = 0;
    let totalGSMDisplayInProgressPerDay = 0;
    let totalGSMDisplayInProgress = 0;
    let clientGSMDisplayIsRepaired;
    this._checkoutService.getClientsGSMDisplayCurrDay().subscribe(gsmDisplay => {
      clientsGSMDisplayPerDay = gsmDisplay.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return clientDate.toDateString() === event.toDateString();
      }).length
      clientGSMDisplayIsRepaired = gsmDisplay.filter(function (client) {
        const clientDate = new Date(+client.deliveredDate);
        return clientDate.toDateString() === event.toDateString() && client.isRepaired === true;
      })
      totalGSMDisplayInProgressPerDay = gsmDisplay.filter(function (client) {
        const clientDate = new Date(+client.addedDate);
        return  clientDate.toDateString() === event.toDateString() && client.isRepaired === false;
      }).length
      totalGSMDisplayInProgress = gsmDisplay.filter(function (client) {
        return client.isRepaired === false;
      }).length
      totalGSMDisplayIsRepaired = clientGSMDisplayIsRepaired.length;
      this.checkout.push(new Checkout(clientsGSMDisplayPerDay, totalGSMDisplayIsRepaired, totalGSMDisplayInProgressPerDay, totalGSMDisplayInProgress));
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

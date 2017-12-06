

import {Component, OnInit} from "@angular/core";
import {CheckoutService} from "./checkout.service";
import {ClientPF} from "../model/ClientPF";

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutPfComponent implements OnInit {
  clientsPerDay: ClientPF[];
  totalClientsPerDay = 0;
  constructor(private _checkoutService: CheckoutService) {}
  ngOnInit() {
    const currDay = new Date();
    this._checkoutService.getClientsCurrDay().subscribe(item => {
      this.clientsPerDay = item.filter(function(client) {
        const clientDate = new Date(+client.addedDate);
        return clientDate.toDateString() === currDay.toDateString();
      })
      this.totalClientsPerDay = this.clientsPerDay.length;
    });
  }
}

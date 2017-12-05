

import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutPfComponent implements OnInit {
  currentDate: Date;
  constructor() {}
  ngOnInit() {
    this.currentDate = new Date();
  }
}

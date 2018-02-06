import {Component, OnInit} from "@angular/core";
import {ClientTypeService} from "../../clients/client-type-list/client-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-option-offer-list',
  templateUrl: './offer-option-list.component.html'
})
export class OfferOptionListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

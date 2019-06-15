import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {OfferOptionService} from './offer-option.service';

@Component({
  selector: 'app-option-offer-list',
  templateUrl: './offer-option-list.component.html'
})
export class OfferOptionListComponent implements OnInit {
  offerOptions: Observable<any[]>;
  selectedOfferOption: any;

  constructor(private _offerOptionService: OfferOptionService) { }

  ngOnInit() {
    this.getOptionTypes();
    this.selectedOfferOption = null;
  }
  getOptionTypes() {
    this.offerOptions = this._offerOptionService.getOfferOptions();
    this.offerOptions.subscribe(
      data => '',
      err => console.log(err + ' Error fetching client types.')
    );
    this.selectedOfferOption = undefined;
  }
}

import {Component, OnInit} from "@angular/core";
import {OfferModel} from "../../model/OfferModel";
import {OfferService} from "../offer.service";

@Component({
  selector: 'app-view-offer-list',
  templateUrl: './view-offer.component.html',
  providers: [OfferService]
})
export class ViewOfferComponent implements OnInit {
  offers: OfferModel[];
  cols: any[];
  constructor(private _offerService: OfferService) { }

  ngOnInit() {
    this._offerService.getAllOffers().subscribe(offers=> {
      this.offers = offers
    })
    this.cols = [
      { field: 'addedDate', header: 'Data introducerii' },
      { field: 'name', header: 'Nume' },
      { field: 'phone', header: 'Numar telefon' },
      { field: 'phoneList', header: 'Model' },
      { field: 'problems', header: 'Problema' },
      { field: 'observation', header: 'Observatii' },
      { field: 'priceOffer', header: 'Oferta de pret' },
      { field: 'aboutUs', header: 'Cum a aflat de noi?' }
    ];
  }

}

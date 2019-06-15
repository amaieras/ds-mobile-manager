import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class OfferOptionService {
  getOfferOptions(): Observable<any[]> {
    return of(offerOptions);
  }
}


export const offerOptions: any[] = [
  {
    id: 1,
    type: 'Adauga Oferta',
    url: 'add-offer'
  },
  {
    id: 2,
    type: 'Vezi oferte',
    url: 'view-offer'
  },
  {
    id: 3,
    type: 'Vezi oferte incheiate',
    url: 'view-offer-done'
  }
];

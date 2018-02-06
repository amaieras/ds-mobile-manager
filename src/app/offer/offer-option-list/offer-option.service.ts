import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

@Injectable()
export class OfferOptionService {
  getOfferOptions(): Observable<any[]> {
    return of(offerOptions);
  }
}


export const offerOptions: any[] = [
  {
    id: 1,
    type: 'Add',
    url: 'add'
  },
  {
    id: 2,
    type: 'View',
    url: 'view'
  }
];

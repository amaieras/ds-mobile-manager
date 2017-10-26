import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

export class ClientType {
  constructor(public id: number, public type: string, public url: string) { }
}

export const clientTypes: ClientType[] = [
  {
    id: 1,
    type: 'PF',
    url: 'pf'
  },
  {
    id: 2,
    type: 'GSM',
    url: 'gsm'
  },
  {
    id: 3,
    type: 'GSM-Display',
    url: 'gsm-display'
  }
];


@Injectable()
export class ClientTypeService {
  getClientTypes(): Observable<ClientType[]> {
    return of(clientTypes);
  }


}

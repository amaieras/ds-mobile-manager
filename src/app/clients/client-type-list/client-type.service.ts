import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

export class ClientType {
  constructor(public id: number, public type: string) { }
}

export const clientTypes: ClientType[] = [
  {
    id: 1,
    type: 'PF'
  },
  {
    id: 2,
    type: 'GSM'
  }
];


@Injectable()
export class ClientTypeService {

  getClientTypes(): Observable<ClientType[]> {
    return of(clientTypes);
  }


}

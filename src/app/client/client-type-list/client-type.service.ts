import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { ClientType, clientTypes } from '../data-model';

@Injectable()
export class ClientTypeService {

  getClientTypes(): Observable<ClientType[]> {
    return of(clientTypes);
  }


}

import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import {Router} from '@angular/router';


export class ClientType {
  constructor(public id: number, public type: string, public url: string) { }
}

export const clientTypes: ClientType[] = [
  // {
  //   id: 1,
  //   type: 'PF',
  //   url: 'pf'
  // },
  {
    id: 2,
    type: 'GSM',
    url: 'gsm'
  },
  {
    id: 3,
    type: 'GSM Trimis',
    url: 'gsm-sent'
  },
  {
    id: 4,
    type: 'GSM Reparat',
    url: 'gsm-fixed'
  },
  // {
  //   id: 4,
  //   type: 'GSM-Vanzare/Imprumut Display',
  //   url: 'gsm-display'
  // }
];


@Injectable()
export class ClientTypeService {
  constructor(private router: Router) {}

  getClientTypes(): any {
    const currentUrl = this.router.url; // Get the current browser URL
    if (currentUrl === '/repairs-done/gsm') {
      // Exclude entries with IDs 3 and 4 for the specified URL
      return of(clientTypes.filter(clientType => clientType.id !== 3 && clientType.id !== 4));
    } else {
      return of(clientTypes);
    }
  }
}

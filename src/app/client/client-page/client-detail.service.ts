import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Client, clients} from "../data-mode-client"

@Injectable()
export class ClientService {

  updateClient(client: Client): Observable<Client>  {
    const oldClient = clients.find(c => c.id === client.id);
    const newClient = Object.assign(oldClient, client);
    return of(newClient);
  }
}


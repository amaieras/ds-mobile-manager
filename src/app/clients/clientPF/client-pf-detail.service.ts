import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {ClientPF} from '../../model/ClientPF';
import {Observable} from "rxjs/Observable";



@Injectable()
export class ClientPFService {
  clientsPF: AngularFireList<ClientPF> = null;
  partPrices: AngularFireList<any> = null;
  clients: AngularFireList<ClientPF> = null;
  constructor(private db: AngularFireDatabase) {
    this.clientsPF = db.list('/clients/pf');
    this.partPrices = db.list('/part-price-list');
  }

  public getAllClients(){
    return this.clientsPF.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public addPFClient(clientPF: ClientPF) {
    return this.clientsPF.push(clientPF);
  }
  updateItem(key: string, value: any) {
     return this.partPrices.update(key,{price: value} )
  }

}



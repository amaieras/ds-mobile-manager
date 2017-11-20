import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {ClientPF} from '../../model/ClientPF';



@Injectable()
export class ClientPFService {
  clientsPF: AngularFireList<ClientPF> = null;
  partPrices: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.clientsPF = db.list('/clients/pf');
    this.partPrices = db.list('parts-pf');
  }

  public getAllClients() {
    return this.clientsPF.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public addPFClient(clientPF: ClientPF): void {
    this.clientsPF.push(clientPF);
  }
  updateItem(key: string, value: any): void {
     this.partPrices.update(key,{price: value} )
  }
  public addNewPartPrice(phoneBrand, phoneModel, price, problemId) {
    this.partPrices.push({phoneBrand, phoneModel, price, problemId});
  }

  public getPartPrices() {
    return this.partPrices.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    })
  }
}



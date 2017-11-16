import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {UtilService} from '../../utils/util.service';
import {ClientPF} from '../../model/ClientPF';
import {Observable} from "rxjs/Observable";



@Injectable()
export class ClientPFService {
  clientsPF: AngularFireList<ClientPF> = null;
  partPrices: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase, private _utilService: UtilService) {
    this.clientsPF = db.list('/clients/pf');
    this.partPrices = db.list('parts-pf');
  }


  public getAllClients() {
    return this.clientsPF.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public addPFClient(clientPF: ClientPF): void {
    this.clientsPF.push(clientPF);
  }
  public getPartPricesList() {
    return this.partPrices.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public getMaxIdFromPartsList(): Observable<any> {
    return this.getPartPricesList().take(1).map(item => {
      return this._utilService.getMaxIdNewItems(item);
    });
  }
  public addNewPartPrice(phoneBrand, phoneModel, price, problemId) {
    this.partPrices.push({phoneBrand, phoneModel, price, problemId});
  }
}



import {Component, Injectable} from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {ClientPF} from '../../model/ClientPF';


@Injectable()
export class RepairPFDetailService {
  repairsPF: AngularFireList<ClientPF[]> = null;

  constructor(private db: AngularFireDatabase) {
    this.repairsPF = db.list('/clients/pf');
  }

  getClientsPFList() {
    this.repairsPF = this.db.list('/clients/pf');
    //noinspection TypeScriptUnresolvedFunction
    return this.repairsPF.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  updateItem(key: string, value: any): void {
    this.repairsPF.update(key, value)
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}

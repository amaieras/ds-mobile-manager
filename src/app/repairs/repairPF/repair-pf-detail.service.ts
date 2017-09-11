import {Component, Injectable} from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ClientPF } from "../../clients/clientPF/client-pf-detail.service";


@Injectable()
export class RepairPFDetailService {
  repairsPF: FirebaseListObservable<ClientPF[]> = null;

  constructor(private db: AngularFireDatabase) {
    this.repairsPF = db.list('/clients/pf');
  }

  getClientsPFList(query={}): FirebaseListObservable<ClientPF[]> {
    this.repairsPF = this.db.list('/clients/pf', {
      query: query
    });
    return this.repairsPF;
  }
  updateItem(key: string, value: any): void {
    this.repairsPF.update(key, value)
      .catch(error => this.handleError(error))
  }
  private handleError(error) {
    console.log(error);
  }
}

import {Component, Injectable} from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ClientPF } from "../../clients/clientPF/client-pf-detail.service";


@Injectable()
export class RepairPFDetailService {
  repairsPF: FirebaseListObservable<ClientPF[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getClientsPFList(query={}): FirebaseListObservable<ClientPF[]> {
    this.repairsPF = this.db.list('/clients/pf', {
      query: query
    });
    return this.repairsPF;
  }
}

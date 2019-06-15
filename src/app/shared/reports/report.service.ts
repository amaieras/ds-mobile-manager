import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {ClientPF} from '../../model/ClientPF';
import {ClientGSM} from '../../model/ClientGSM';

@Injectable()
export class ReportService {
  clientsPF: AngularFireList<ClientPF> = null;
  clientsGSM: AngularFireList<ClientGSM> = null;
  clients: AngularFireList<any> = null;
  clientsGSMList: AngularFireList<any> = null;
  constructor(private db: AngularFireDatabase) {
    this.clientsPF = db.list('/clients/pf');
    this.clientsGSM = db.list('/clients/gsm');
    this.clientsGSMList = db.list('/client-gsm-list');
  }

  getAllPFClients() {
    return this.clientsPF.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  getAllGSMClients() {
    return this.clientsGSM.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  getClientsByType(type: string) {
    const clients = this.db.list('/clients/' + type);
    return clients.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  getClientsGSMList() {
    return this.clientsGSMList.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
}

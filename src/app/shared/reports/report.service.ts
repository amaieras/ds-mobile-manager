import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {ClientPF} from "../../main/apps/clients/client-pf/client-pf.model";
import {ClientGSM} from "../../main/apps/clients/client-gsm/client-gsm.model";

@Injectable()
export class ReportService {
  clientsPF: AngularFireList<ClientPF> = null;
  clientsGSM: AngularFireList<ClientGSM> = null;
  clients: AngularFireList<any> = null;
  constructor(private db: AngularFireDatabase) {
    this.clientsPF = db.list('/clients/pf');
    this.clientsGSM = db.list('/clients/gsm');
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
}

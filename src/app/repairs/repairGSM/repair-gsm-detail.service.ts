import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ClientGSM } from "../../clients/clientGSM/client-gsm-detail.service";


@Injectable()
export class RepairGSMDetailService {

  repairsGSM: FirebaseListObservable<ClientGSM[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getClientsGSMList(query={}): FirebaseListObservable<ClientGSM[]> {
    this.repairsGSM = this.db.list('/clients/gsm', {
      query: query
    });
    return this.repairsGSM;
  }
}

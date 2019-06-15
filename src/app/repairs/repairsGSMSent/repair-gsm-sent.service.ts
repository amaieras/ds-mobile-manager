import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {ClientGSM} from '../../model/ClientGSM';


@Injectable()
export class RepairGsmSentService {

  repairsGSM: AngularFireList<ClientGSM[]> = null;

  constructor(private db: AngularFireDatabase) {
    this.repairsGSM = db.list('/clients/gsm');
  }

  getClientsGSMList() {
    this.repairsGSM = this.db.list('/clients/gsm');
    return this.repairsGSM.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key}));
    }); ;
  }

  updateItem(key: string, value: any) {
    return this.repairsGSM.update(key, value);
  }

  handleError(error){
    console.log(error);
  }
}

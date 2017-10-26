import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {ClientGSM} from "../../model/ClientGSM";


@Injectable()
export class RepairGSMDetailService {

  repairsGSM: AngularFireList<ClientGSM[]> = null;

  constructor(private db: AngularFireDatabase) {
    this.repairsGSM = db.list('/clients/gsm');
  }

  getClientsGSMList() {
    this.repairsGSM = this.db.list('/clients/gsm');
    return this.repairsGSM.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key}))
    });;
  }

  updateItem(key: string, value: any): void {
    this.repairsGSM.update(key, value)
      .catch(error => this.handleError(error))
  }

  handleError(error){
    console.log(error);
  }
}

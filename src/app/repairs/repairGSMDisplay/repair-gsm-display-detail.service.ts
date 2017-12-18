import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {ClientGSMDisplay} from "../../model/ClientGSMDisplay";


@Injectable()
export class RepairGSMDisplayDetailService {

  repairsGSMDisplay: AngularFireList<ClientGSMDisplay> = null;

  constructor(private db: AngularFireDatabase) {
    this.repairsGSMDisplay = db.list('/clients/gsm-display');
  }

  getClientsGSMDisplayList() {
    return this.repairsGSMDisplay.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key}))
    });;
  }

  updateItem(key: string, value: any): void {
    this.repairsGSMDisplay.update(key, value)
      .catch(error => this.handleError(error))
  }

  handleError(error){
    console.log(error);
  }
}

import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { ClientGSM } from "../../clients/clientGSM/client-gsm-detail.service";


@Injectable()
export class RepairGSMDetailService {

  repairsGSM: AngularFireList<ClientGSM[]> = null;

  constructor(private db: AngularFireDatabase) {
    this.repairsGSM = db.list('/clients/gsm');
  }

  getClientsGSMList(): AngularFireList<ClientGSM[]> {
    this.repairsGSM = this.db.list('/clients/gsm');
    return this.repairsGSM;
  }

  updateItem(key: string, value: any): void {
    this.repairsGSM.update(key, value)
      .catch(error => this.handleError(error))
  }

  handleError(error){
    console.log(error);
  }
}

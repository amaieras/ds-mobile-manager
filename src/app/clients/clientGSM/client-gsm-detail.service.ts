import { Injectable } from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {ClientGSM} from "../../model/ClientGSM";



@Injectable()
export class ClientGSMService {
  clientsGSM: AngularFireList<ClientGSM> = null;

  constructor(db: AngularFireDatabase) {
    this.clientsGSM = db.list('/clients/gsm');
  }

  addGSMClient(clientGSM: ClientGSM): void {
    this.clientsGSM.push(clientGSM);
  }
}

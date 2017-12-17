
import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {ClientGSMDisplay} from "../../model/ClientGSMDisplay";

@Injectable()
export class ClientGSMDisplayService {
  clientsGSMDisplay: AngularFireList<ClientGSMDisplay> = null;

  constructor(db: AngularFireDatabase) {
    this.clientsGSMDisplay = db.list('/clients/gsm-display');
  }

  addGSMDisplayClient(clientsGSMDisplay: ClientGSMDisplay): void {
    this.clientsGSMDisplay.push(clientsGSMDisplay);
  }
}

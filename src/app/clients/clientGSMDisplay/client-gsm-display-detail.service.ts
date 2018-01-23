
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

  public getAllClients() {
    return this.clientsGSMDisplay.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
}


import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

@Injectable()
export class CheckoutService {
  dailyClients: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.dailyClients = db.list('/clients/pf');
  }
  getClientsCurrDay() {
    // this.dailyClients.update("test", {id:20})
    return this.dailyClients.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
}

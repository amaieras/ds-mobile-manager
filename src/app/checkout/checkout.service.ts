
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class CheckoutService {
  dailyClientsPF: AngularFireList<any> = null;
  dailyClientsGSM: AngularFireList<any> = null;
  dailyClientsGSMDisplay: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.dailyClientsPF = db.list('/clients/pf');
    this.dailyClientsGSM = db.list('/clients/gsm');
    this.dailyClientsGSMDisplay = db.list('/clients/gsm-display');
  }
  getClientsPFCurrDay() {
    return this.dailyClientsPF.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  getClientsGSMCurrDay() {
    return this.dailyClientsGSM.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  getClientsGSMDisplayCurrDay() {
    return this.dailyClientsGSMDisplay.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

}

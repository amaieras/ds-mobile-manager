import { Injectable } from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {ClientGSM} from "../../model/ClientGSM";
import 'rxjs/add/observable/zip';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";



@Injectable()
export class ClientGSMService {
  clientsGSM: AngularFireList<ClientGSM> = null;

  constructor(private db: AngularFireDatabase) {
    this.clientsGSM = db.list('/clients/gsm');
  }

  addGSMClient(clientGSM: ClientGSM): void {
    this.clientsGSM.push(clientGSM);
  }

  /**
   * Adds a new gsm client if does not exist
   * @param {ClientGSM} clientGSM
   */
  addGSMClientList(clientGSM: ClientGSM): void {

}

  public getAllClients() {
    return this.clientsGSM.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  public searchClients(term: string) {
    this.getAllClients().subscribe(item => {
      return Observable.of(item);
    })

    // return Observable.zip().switchMap(param => {
    //   return this.db
    //     .list('/clients/gsm', ref =>
    //       ref
    //         .orderByChild("lastname")
    //         .startAt(term)
    //     )
    //     .snapshotChanges()
    //     .map(changes => {
    //       return changes.map(c => {
    //         return { key: c.payload.key, ...c.payload.val() };
    //       });
    //     });
    // });
  }
}

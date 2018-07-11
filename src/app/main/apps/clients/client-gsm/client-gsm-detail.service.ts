import { Injectable } from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {ClientGSM} from "./client-gsm.model";
import 'rxjs/add/observable/zip';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {ClientGSMType} from "../client-type-list/client-gsm-types.model";



@Injectable()
export class ClientGSMService {
  clientsGSM: AngularFireList<ClientGSM> = null;
  constructor(private _db: AngularFireDatabase) {
    this.clientsGSM = this._db.list('/clients/gsm');

  }

  addGSMClient(clientGSM: ClientGSM): void {
    this.clientsGSM.push(clientGSM);
  }

  /**
   * Adds a new gsm client type if does not exist
   * @param {ClientGSM} clientGSM
   */
  addGSMClientList(clientGSMType: ClientGSMType): void {
    delete(clientGSMType.$key);
    this._db.list("/client-gsm-list").push(clientGSMType);
}

  public getAllClients() {
    return this.clientsGSM.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public getAllClientsList() {
    return this._db
      .list("/client-gsm-list").snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  /**
   * Return the list of client gsm types for a given string
   * @param startAt
   * @param endAt
   * @returns {Observable<any>}
   */
  public getAllClientsListByName(startAt, endAt) {
    return Observable.zip(startAt, endAt).switchMap(param => {
      return this._db
        .list("/client-gsm-list", ref =>
          ref
            .orderByChild("name")
            .startAt(param[0])
            .endAt(param[1])
        )
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => {
            return { key: c.payload.key, ...c.payload.val() };
          });
        });
    });
  }

  updateClientGSM(key: string, value: any): void {
    this._db
      .list("/client-gsm-list").update(key,{phone: value.phone, city: value.city, firm: value.firm} )
  }
}

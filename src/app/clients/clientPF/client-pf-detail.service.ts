import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import * as firebase from "firebase/app";

export class ClientPF {
  constructor() { }
  lastname: string;
  firstname: string;
  firm: string;
  phone: string;
  phoneModel: string;
  problem: string;
  priceOffer: string;
  appointment: string;
  aboutUs: string;
}

export class problemTypes {
  constructor() { }

}


@Injectable()
export class ClientPFService {

  constructor(db: AngularFireDatabase) {
    this.clientsPF = db.list('/clients');
  }
  clientsPF: FirebaseListObservable<ClientPF[]> = null;
  clientPf: FirebaseObjectObservable<ClientPF> = null;

  addPFClient(clientPF: ClientPF): void {
    this.clientsPF.push(clientPF)
      .catch ( error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error);
  }
}

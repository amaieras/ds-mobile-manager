import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";


export class ClientPF {
  constructor(
  ) { }
  addedDate: AppointmentDate
  lastname: string;
  firstname: string;
  firm: string;
  phone: string;
  phoneModel: string;
  problem: string;
  imei: string;
  priceOffer: string;
  appointment: AppointmentDate;
  aboutUs: string;


}

export class AppointmentDate {
  day: string;
  month: string;
  year: string;
  timestamp: string;
}

export class problemTypes {
  constructor() { }
}


@Injectable()
export class ClientPFService {

  constructor(db: AngularFireDatabase) {
    this.clientsPF = db.list('/clients/pf');
  }

  clientsPF: FirebaseListObservable<ClientPF[]> = null;
  clientPf: FirebaseObjectObservable<ClientPF> = null;

  addPFClient(clientPF: ClientPF): void {
    this.clientsPF.push(clientPF)
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}



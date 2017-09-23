import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";


export class ClientPF {
  constructor(
  ) { }
  $key: string;
  addedDate: string;
  lastname: string;
  firstname: string;
  email: string;
  firm: string;
  phone: string;
  phoneList: PhoneList[];
  tested: string;
  imei: string;
  priceOffer: string;
  appointmentDate: string;
  aboutUs: string;


}

export class PhoneList {
  phoneBrand = '';
  phoneModel = '';
  phoneColor = '';
  phoneQuantity = 1;
  problem = 'Sticla';
  pricePerPart = 0;
  observation = '';
}


export class ProblemComputePrice {

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

  updateItem(key: string, value: any): void {
    this.clientsPF.update(key, value)
      .catch(error => this.handleError(error))
  }
  private handleError(error) {
    console.log(error);
  }
}



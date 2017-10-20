import { Injectable } from "@angular/core";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";

export class ClientGSM {
  constructor() { }
  addedDate: AppointmentDate
  lastname: string;
  firstname: string;
  firm: string;
  phone: string;
  email: string;
  phoneList: PhoneList[];
  priceOffer: string;
  country: string;
  city: string;
  billingAddress: Address[];
  shipmentAddress: Address[];
}

export class PhoneList {
  phoneBrand = '';
  phoneModel = '';
  phoneColor = '';
  phoneQuantity = 1;
  problemList: ProblemList[]  = [];
  observation = '';
}
export class ProblemList {
  problem = 'Sticla';
  pricePerPart = 0;
}
export class AppointmentDate {
  day: string;
  month: string;
  year: string;
  timestamp: string;
}

export class Address {
  cif = '';
  denomination = '';
  regcom = '';
  clientCode = '';
  address = '';
  county = '';
  country = '';
  city = '';
  iban = '';
  bank = '';
  contactPerson = '';
}
@Injectable()
export class ClientGSMService {

  clientsGSM: AngularFireList<ClientGSM> = null;
  clientGSM: AngularFireObject<ClientGSM> = null;

  constructor(db: AngularFireDatabase) {
    this.clientsGSM = db.list('/clients/gsm');
  }

  addGSMClient(clientGSM: ClientGSM): void {
    this.clientsGSM.push(clientGSM);
  }

  private handleError(error) {
    console.log(error);
  }


}

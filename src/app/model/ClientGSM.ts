
import {PhoneList} from "./PhoneList";
import {Address} from "./Address";

export class ClientGSM {
  constructor() { }
  addedDate: string
  lastname: string;
  firstname: string;
  firm: string;
  phone: string;
  email: string;
  phoneList: PhoneList[];
  priceOffer: number;
  country: string;
  city: string;
  billingAddress: Address[];
  shipmentAddress: Address[];
}

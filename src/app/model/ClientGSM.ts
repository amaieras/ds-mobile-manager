
import {PhoneList} from "./PhoneList";
import {Address} from "./Address";

export class ClientGSM {
  constructor() { }
  clientNo: number;
  addedDate: string
  lastname: string;
  firstname: string;
  firm: string;
  phone: string;
  email: string;
  phoneList: PhoneList[];
  priceOffer: number;
  isRepaired = false;
  isPayed = false;
  isSent = false;
  deliveredDate: string;
  country: string;
  city: string;
  priceOfferCash:number;
  billingAddress: Address[];
  shipmentAddress: Address[];
}


import {PhoneList} from "./PhoneList";
import {Address} from "./Address";
import {PaymentMethod} from "./PaymentMethod";

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
  paymentMethod: PaymentMethod;
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

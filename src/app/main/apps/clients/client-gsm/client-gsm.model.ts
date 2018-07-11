
import {PhoneList} from "../../../../model/PhoneList";
import {Address} from "../../../../model/Address";
import {PaymentMethod} from "../../../../model/PaymentMethod";

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

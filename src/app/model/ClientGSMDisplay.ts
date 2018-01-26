

import {PhoneList} from "./PhoneList";

export class ClientGSMDisplay {
  constructor() { }
  addedDate: string
  lastname: string;
  phone: string;
  phoneList: PhoneList[];
  priceOffer: number;
  totalQuantity: number;
  city: string;
  isRepaired = false;
  isPayed = false;
  deliveredDate: string;
  priceOfferCash:number;
}

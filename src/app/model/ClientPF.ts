import {PhoneList} from './PhoneList';
import {PaymentMethod} from 'app/model/PaymentMethod';

/**
 * Created by Spacaru on 10/22/2017.
 */
export class ClientPF {

  $key: string;
  clientNo: number;
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
  paymentMethod: PaymentMethod;
  appointmentDate: string;
  aboutUs: string;
  aboutUsName: string;
  priceOfferCash: string;
  deliveredDate: string;
  isRepaired = false;
  isPayed = false;

  constructor() {

  }




}

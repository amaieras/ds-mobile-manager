
import {PhoneList} from "./PhoneList";
import {PaymentMethod} from "./PaymentMethod";

export class WarrantyGSMInfo {
  private _dateAdded: string;
  private _lastname: string;
  private _phoneNumber: string;
  private _price: number;
  private _phoneList: PhoneList[];
  private _noOfClients: number;
  private _paymentMethod: PaymentMethod;

  constructor(dateAdded: string, lastname: string, phoneNumber: string, price: number, noOfClients: number, phoneList: PhoneList[], paymentMethod: PaymentMethod) {
    this._dateAdded = dateAdded;
    this._lastname = lastname;
    this._phoneNumber = phoneNumber;
    this._price = price;
    this._noOfClients = noOfClients;
    this._phoneList = phoneList;
    this._paymentMethod = paymentMethod;
  }

  get dateAdded(): string {
    return this._dateAdded;
  }

  set dateAdded(value: string) {
    this._dateAdded = value;
  }
  get noOfClients(): number {
    return this._noOfClients;
  }

  set noOfClients(value: number) {
    this._noOfClients = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
  get phoneList(): PhoneList[] {
    return this._phoneList;
  }

  set phoneList(value: PhoneList[]) {
    this._phoneList = value;
  }


  get paymentMethod(): PaymentMethod {
    return this._paymentMethod;
  }

  set paymentMethod(value: PaymentMethod) {
    this._paymentMethod = value;
  }
}

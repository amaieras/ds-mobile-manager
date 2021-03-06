
import {PaymentMethod} from "./PaymentMethod";

export class WarrantyInfo {

  private _dateAdded: string;
  private _lastname: string;
  private _firstname: string;
  private _phoneNumber: string;
  private _price: number;
  private _tested: string;
  private _aboutUs: string;
  private _deliveredTime : string;
  private _phoneList: string[];
  private _noOfClients: number;
  private _paymentMethod: PaymentMethod;

  constructor(dateAdded: string, lastname: string, firstname: string, phoneNumber: string, price: number,
               tested: string, aboutUs: string, phoneList: string[], deliveredTime: string, noOfClients: number, paymentMethod: PaymentMethod) {
    this._dateAdded = dateAdded;
    this._lastname = lastname;
    this._firstname = firstname;
    this._phoneNumber = phoneNumber;
    this._price = price;
    this._tested = tested;
    this._aboutUs = aboutUs;
    this._deliveredTime = deliveredTime;
    this._phoneList = phoneList;
    this._noOfClients = noOfClients;
    this._paymentMethod = paymentMethod;
  }
  get phoneList(): string[] {
    return this._phoneList;
  }

  set phoneList(value: string[]) {
    this._phoneList = value;
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


  get deliveredTime(): string {
    return this._deliveredTime;
  }

  set deliveredTime(value: string) {
    this._deliveredTime = value;
  }


  get tested(): string {
    return this._tested;
  }

  set tested(value: string) {
    this._tested = value;
  }
  get aboutUs(): string {
    return this._aboutUs;
  }

  set aboutUs(value: string) {
    this._aboutUs = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
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


  get paymentMethod(): PaymentMethod {
    return this._paymentMethod;
  }

  set paymentMethod(value: PaymentMethod) {
    this._paymentMethod = value;
  }
}

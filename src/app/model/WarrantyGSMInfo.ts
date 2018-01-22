
export class WarrantyGSMInfo {
  private _dateAdded: string;
  private _lastname: string;
  private _phoneNumber: string;
  private _price: number;
  private _phoneColor: string;
  private _brandName: string;
  private _modelName: string;
  private _observation: string;
  private _phoneList: string[];
  private _parts: string[];
  private _noOfClients: number;

  constructor(dateAdded: string, lastname: string, phoneNumber: string, price: number, phoneColor: string, brandName: string,
              modelName: string, observation: string, noOfClients: number, phoneList: string[], parts: string[]) {
    this._dateAdded = dateAdded;
    this._lastname = lastname;
    this._phoneNumber = phoneNumber;
    this._price = price;
    this._phoneColor = phoneColor;
    this._brandName = brandName;
    this._modelName = modelName;
    this._observation = observation;
    this._noOfClients = noOfClients;
    this._phoneList = phoneList;
    this._parts = parts;
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

  get observation(): string {
    return this._observation;
  }

  set observation(value: string) {
    this._observation = value;
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

  get phoneColor(): string {
    return this._phoneColor;
  }

  set phoneColor(value: string) {
    this._phoneColor = value;
  }

  get brandName(): string {
    return this._brandName;
  }

  set brandName(value: string) {
    this._brandName = value;
  }

  get modelName(): string {
    return this._modelName;
  }

  set modelName(value: string) {
    this._modelName = value;
  }
  get phoneList(): string[] {
    return this._phoneList;
  }

  set phoneList(value: string[]) {
    this._phoneList = value;
  }

  get parts(): string[] {
    return this._parts;
  }

  set parts(value: string[]) {
    this._parts = value;
  }
}

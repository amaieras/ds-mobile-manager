
export class WarrantyInfo {
  private _lastname: string;
  private _firstname: string;
  private _phoneNumber: string;
  private _price: number;
  private _phoneColor: string;
  private _imei: string;
  private _brandName: string;
  private _modelName: string;
  private _observation: string;
  private _tested: string;
  private _aboutUs: string;
  private _parts: string[];
  private _deliveredTime : string;
  private _phoneCode: string;
  private _noOfClients: number;

  constructor(lastname: string, firstname: string, phoneNumber: string, price: number, phoneColor: string, imei: string, brandName: string,
              modelName: string, observation: string, tested: string, aboutUs: string, parts: string[], deliveredTime: string, phoneCode: string,
              noOfClients: number) {
    this._lastname = lastname;
    this._firstname = firstname;
    this._phoneNumber = phoneNumber;
    this._price = price;
    this._phoneColor = phoneColor;
    this._imei = imei;
    this._brandName = brandName;
    this._modelName = modelName;
    this._observation = observation;
    this._tested = tested;
    this._aboutUs = aboutUs;
    this._parts = parts;
    this._deliveredTime = deliveredTime;
    this._phoneCode = phoneCode;
    this._noOfClients = noOfClients;
  }


  get noOfClients(): number {
    return this._noOfClients;
  }

  set noOfClients(value: number) {
    this._noOfClients = value;
  }

  get phoneCode(): string {
    return this._phoneCode;
  }

  set phoneCode(value: string) {
    this._phoneCode = value;
  }

  get deliveredTime(): string {
    return this._deliveredTime;
  }

  set deliveredTime(value: string) {
    this._deliveredTime = value;
  }

  get parts(): string[] {
    return this._parts;
  }

  set parts(value: string[]) {
    this._parts = value;
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

  get phoneColor(): string {
    return this._phoneColor;
  }

  set phoneColor(value: string) {
    this._phoneColor = value;
  }

  get imei(): string {
    return this._imei;
  }

  set imei(value: string) {
    this._imei = value;
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
}

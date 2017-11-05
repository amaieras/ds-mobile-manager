
export class WarrantyInfo {
  private _monthAdded: number;
  private _dayAdded: number;
  private _yearAdded: number;
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

  constructor(monthAdded: number, dayAdded: number, yearAdded: number, lastname: string, firstname: string, phoneNumber: string, price: number,
              phoneColor: string, imei: string, brandName: string, modelName: string, observation: string, tested: string) {
    this._monthAdded = monthAdded;
    this._dayAdded = dayAdded;
    this._yearAdded = yearAdded;
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
  }


  get tested(): string {
    return this._tested;
  }

  set tested(value: string) {
    this._tested = value;
  }

  get observation(): string {
    return this._observation;
  }

  set observation(value: string) {
    this._observation = value;
  }

  get monthAdded(): number {
    return this._monthAdded;
  }

  set monthAdded(value: number) {
    this._monthAdded = value;
  }

  get dayAdded(): number {
    return this._dayAdded;
  }

  set dayAdded(value: number) {
    this._dayAdded = value;
  }

  get yearAdded(): number {
    return this._yearAdded;
  }

  set yearAdded(value: number) {
    this._yearAdded = value;
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

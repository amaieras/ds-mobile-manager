
export class ReportMoney {
  private _pfCash: number;
  private _gsmCash: number;

  private _pfTotal: number;
  private _gsmTotal: number;

  private _pfCard: number;
  private _gsmCard: number;

  private _pfRepayment: number;
  private _gsmRepayment: number;

  private _pfAdvance: number;
  private _gsmAdvance: number;

  private _totalIn: number;

  private _totalCash: number;

  private _totalBank: number;


  get pfCash(): number {
    return this._pfCash;
  }

  set pfCash(value: number) {
    this._pfCash = value;
  }

  get gsmCash(): number {
    return this._gsmCash;
  }

  set gsmCash(value: number) {
    this._gsmCash = value;
  }


  get pfTotal(): number {
    return this._pfTotal;
  }

  set pfTotal(value: number) {
    this._pfTotal = value;
  }

  get gsmTotal(): number {
    return this._gsmTotal;
  }

  set gsmTotal(value: number) {
    this._gsmTotal = value;
  }

  get pfCard(): number {
    return this._pfCard;
  }

  set pfCard(value: number) {
    this._pfCard = value;
  }

  get gsmCard(): number {
    return this._gsmCard;
  }

  set gsmCard(value: number) {
    this._gsmCard = value;
  }

  get pfRepayment(): number {
    return this._pfRepayment;
  }

  set pfRepayment(value: number) {
    this._pfRepayment = value;
  }

  get gsmRepayment(): number {
    return this._gsmRepayment;
  }

  set gsmRepayment(value: number) {
    this._gsmRepayment = value;
  }

  get pfAdvance(): number {
    return this._pfAdvance;
  }

  set pfAdvance(value: number) {
    this._pfAdvance = value;
  }

  get gsmAdvance(): number {
    return this._gsmAdvance;
  }

  set gsmAdvance(value: number) {
    this._gsmAdvance = value;
  }

  get totalIn(): number {
    return this._totalIn;
  }

  set totalIn(value: number) {
    this._totalIn = value;
  }

  get totalCash(): number {
    return this._totalCash;
  }

  set totalCash(value: number) {
    this._totalCash = value;
  }

  get totalBank(): number {
    return this._totalBank;
  }

  set totalBank(value: number) {
    this._totalBank = value;
  }
}

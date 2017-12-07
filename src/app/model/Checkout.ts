


export class Checkout {
  get totalCash(): number {
    return this._totalCash;
  }

  set totalCash(value: number) {
    this._totalCash = value;
  }

  private _totalClientsPerDay: number;
  private _totalIsRepaired: number;
  private _totalInProgress: number;
  private _totalCash: number;

  constructor(totalClientsPerDay: number, totalIsRepaired: number, totalInProgress: number, _totalCash: number) {
    this._totalClientsPerDay = totalClientsPerDay;
    this._totalIsRepaired = totalIsRepaired;
    this._totalInProgress = totalInProgress;
    this._totalCash = _totalCash;
  }
  get totalClientsPerDay(): number {
    return this._totalClientsPerDay;
  }

  set totalClientsPerDay(value: number) {
    this._totalClientsPerDay = value;
  }

  get totalIsRepaired(): number {
    return this._totalIsRepaired;
  }

  set totalIsRepaired(value: number) {
    this._totalIsRepaired = value;
  }

  get totalInProgress(): number {
    return this._totalInProgress;
  }

  set totalInProgress(value: number) {
    this._totalInProgress = value;
  }


}

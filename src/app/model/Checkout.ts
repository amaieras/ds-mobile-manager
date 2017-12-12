


export class Checkout {

  private _totalClientsPerDay: number;
  private _totalIsRepaired: number;
  private _totalInProgressPerDay: number;
  private _totalInProgress: number;
  private _totalCash: number;

  constructor(totalClientsPerDay: number, totalIsRepaired: number, totalInProgressPerDay: number, _totalCash: number, totalInProgress: number) {
    this._totalClientsPerDay = totalClientsPerDay;
    this._totalIsRepaired = totalIsRepaired;
    this._totalInProgressPerDay = totalInProgressPerDay;
    this._totalCash = _totalCash;
    this._totalInProgress = totalInProgress;
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
  get totalInProgressPerDay(): number {
    return this._totalInProgressPerDay;
  }

  set totalInProgressPerDay(value: number) {
    this._totalInProgressPerDay = value;
  }
  get totalCash(): number {
    return this._totalCash;
  }

  set totalCash(value: number) {
    this._totalCash = value;
  }

}

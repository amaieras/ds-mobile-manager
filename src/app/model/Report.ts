export class Report {

  private _piecesNo: number;
  private _totalIn: number;
  private _noOfClients: number;

  constructor(piecesNo: number, totalIn: number, noOfClients: number) {
    this._piecesNo = piecesNo;
    this._totalIn = totalIn;
    this._noOfClients = noOfClients;
  }

  get piecesNo(): number {
    return this._piecesNo;
  }

  set piecesNo(value: number) {
    this._piecesNo = value;
  }

  get totalIn(): number {
    return this._totalIn;
  }

  set totalIn(value: number) {
    this._totalIn = value;
  }

  get noOfClients(): number {
    return this._noOfClients;
  }

  set noOfClients(value: number) {
    this._noOfClients = value;
  }

}

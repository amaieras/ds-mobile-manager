import {ClientPF} from "./ClientPF";
import {ClientGSM} from "./ClientGSM";

export class Report {

  _piecesNo: number;
  _totalIn: number;
  _noOfClients: number;
  private _clientsPF: ClientPF[];
  private _clientGSM: ClientGSM[];


  constructor(piecesNo: number, totalIn: number, noOfClients: number, clientsPF: ClientPF[], clientGSM: ClientGSM[]) {
    this._piecesNo = piecesNo;
    this._totalIn = totalIn;
    this._noOfClients = noOfClients;
    this._clientsPF = clientsPF;
    this._clientGSM = clientGSM;
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

  get clientsPF(): ClientPF[] {
    return this._clientsPF;
  }

  set clientsPF(value: ClientPF[]) {
    this._clientsPF = value;
  }

  get clientGSM(): ClientGSM[] {
    return this._clientGSM;
  }

  set clientGSM(value: ClientGSM[]) {
    this._clientGSM = value;
  }
}

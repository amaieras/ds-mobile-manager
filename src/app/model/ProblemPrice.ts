/**
 * Created by Spacaru on 10/22/2017.
 */
export class ProblemPrice {
  private _id: number;
  private _problemId: string;
  private _phoneBrand: number;
  private _phoneModel: number;
  private _price: number;

  constructor(id: number, problemId: string, phoneBrand: number, phoneModel: number, price: number) {
    this._id = id;
    this._problemId = problemId;
    this._phoneBrand = phoneBrand;
    this._phoneModel = phoneModel;
    this._price = price;
  }
}

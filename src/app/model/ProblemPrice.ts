/**
 * Created by Spacaru on 10/22/2017.
 */
export class ProblemPrice {
  private _problemId: string;
  private _phoneBrand: string;
  private _phoneModel: string;
  private _price: number;

  constructor(problemId: string, phoneBrand: string, phoneModel: string, price: number) {
    this._problemId = problemId;
    this._phoneBrand = phoneBrand;
    this._phoneModel = phoneModel;
    this._price = price;
  }
}

export class PaymentMethod {
  public _cash = 0;
  public _card = 0;
  public _advance = 0;
  public _collector = 0;
  public _repayment = 0;


  constructor(cash: number, card: number, advance: number, collector: number, repayment: number) {
    this._cash = cash;
    this._card = card;
    this._advance = advance;
    this._collector = collector;
    this._repayment = repayment;
  }

  get cash(): number {
    return this._cash;
  }

  set cash(value: number) {
    this._cash = value;
  }

  get card(): number {
    return this._card;
  }

  set card(value: number) {
    this._card = value;
  }

  get advance(): number {
    return this._advance;
  }

  set advance(value: number) {
    this._advance = value;
  }

  get collector(): number {
    return this._collector;
  }

  set collector(value: number) {
    this._collector = value;
  }

  get repayment(): number {
    return this._repayment;
  }

  set repayment(value: number) {
    this._repayment = value;
  }
}

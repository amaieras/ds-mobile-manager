/**
 * Created by Spacaru on 10/22/2017.
 */
export class DropdownModel {
  private _label: string;
  private _value: string;

  constructor(label: string, value: string) {
    this._label = label;
    this._value = value;
  }

  get label(): string{
      return this._label;
      }

  set label(value: string){
      this._label = value;
      }

  get value(): string{
      return this._value;
      }

  set value(value: string){
      this._value = value;
      }
}


import {Injectable} from "@angular/core";

@Injectable()
export class PhoneModelService {
  constructor() { }

  public dataPhone: Array<{ label: string, value: number }> = [
    { label: "Samsung", value: 1 },
    { label: "Iphone", value: 2}
  ]

  public dataModel: Array<{ label: string, value: number, phoneId: number}> = [
    { label: "S7", value: 1, phoneId: 1}
    ,{ label: "Note 3", value: 2, phoneId: 1}
    ,{ label: "5", value: 3, phoneId: 2}
    ,{ label: "X", value: 4, phoneId: 2}
  ]
}

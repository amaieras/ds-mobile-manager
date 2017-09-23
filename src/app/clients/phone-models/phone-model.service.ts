
import {Injectable} from "@angular/core";
import {PhoneBrand} from "./PhoneBrand";
import {PhoneModel} from "./PhoneModel";

@Injectable()
export class PhoneModelService {

  getPhoneBrands() {
    return [
      new PhoneBrand(1, "Samsung"),
      new PhoneBrand(2, "Iphone"),
      new PhoneBrand(3, "HTC")
    ]
  }

  getPhoneModels() {
    return [
      new PhoneModel(1, "S7", 1),
      new PhoneModel(2, "Note 3", 1),
      new PhoneModel(3, "5", 2),
      new PhoneModel(4, "X", 2),
      new PhoneModel(5, "G5", 3),
      new PhoneModel(6, "G6", 3),
      new PhoneModel(7, "G7", 3),

    ]
  }
}


import {Injectable} from "@angular/core";
import {PhoneBrand} from "./PhoneBrand";
import {PhoneModel} from "./PhoneModel";

@Injectable()
export class PhoneModelService {

  getPhoneBrands() {
    return [
      new PhoneBrand(1, "Iphone"),
      new PhoneBrand(2, "Samsung"),
      new PhoneBrand(3, "HTC"),
      new PhoneBrand(4, "Huawei")
    ]
  }

  getPhoneModels() {
    return [
      new PhoneModel(1, "iPhone 7 Plus", 1),
      new PhoneModel(2, "iPhone 7", 1),
      new PhoneModel(3, "iPhone SE", 1),
      new PhoneModel(4, "iPhone 6s Plus", 1),
      new PhoneModel(5, "iPhone 6s", 1),
      new PhoneModel(6, "iPhone 6 Plus", 1),
      new PhoneModel(7, "iPhone 6", 1),
      new PhoneModel(8, "iPhone 5s", 1),
      new PhoneModel(9, "iPhone 5c", 1),
      new PhoneModel(10, "iPhone 5", 1),

      new PhoneModel(11, "S7", 2),
      new PhoneModel(12, "S7 EDGE", 2),
      new PhoneModel(13, "S6", 2),
      new PhoneModel(14, "S6 EDGE", 2),
      new PhoneModel(15, "S5", 2),
      new PhoneModel(16, "S5 MINI", 2),
      new PhoneModel(17, "S4", 2),
      new PhoneModel(18, "S4 MINI", 2),
      new PhoneModel(19, "S3", 2),
      new PhoneModel(20, "S3 MINI", 2),
      new PhoneModel(21, "S3 ACTIV", 2),
      new PhoneModel(22, "S2", 2),
      new PhoneModel(23, "ACE 4", 2),
      new PhoneModel(24, "A3 (A300)", 2),
      new PhoneModel(25, "A3 2016 (A310)", 2),
      new PhoneModel(26, "A3 2017 (A320)", 2),
      new PhoneModel(27, "A5 (A500)", 2),
      new PhoneModel(28, "A5 2016 (A510)", 2),
      new PhoneModel(29, "A5 2017 (A520)", 2),
      new PhoneModel(30, "ALPHA", 2),
      new PhoneModel(31, "J1 2015 (J100)", 2),
      new PhoneModel(32, "J1 2016 (J120)", 2),
      new PhoneModel(33, "J3 2016 (J310)", 2),
      new PhoneModel(34, "J3 2017 (J330)", 2),
      new PhoneModel(35, "J5 (J500)", 2),
      new PhoneModel(36, "J5 2016 (J510)", 2),
      new PhoneModel(37, "J5 2017 (J530)", 2),
      new PhoneModel(38, "J7 2016 (J710)", 2),
      new PhoneModel(39, "J7 2017 (J730)", 2),
      new PhoneModel(40, "NOTE 5", 2),
      new PhoneModel(41, "NOTE 4", 2),
      new PhoneModel(42, "NOTE 3", 2),
      new PhoneModel(43, "NOTE 2", 2),

      new PhoneModel(44, "M9", 3),
      new PhoneModel(45, "M8", 3),
      new PhoneModel(46, "M8 MINI", 3),
      new PhoneModel(47, "M7", 3),
      new PhoneModel(48, "M7 MINI", 3),

      new PhoneModel(49, "P6 LIFE", 4),
      new PhoneModel(50, "P5 LIFE", 4),
      new PhoneModel(51, "P9 ENERGY", 4),
      new PhoneModel(52, "P9 ENERGY LITE 2017", 4),
      new PhoneModel(53, "P10", 4)
    ]
  }
}

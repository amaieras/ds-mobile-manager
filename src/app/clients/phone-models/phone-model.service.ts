
import {Injectable} from "@angular/core";
import {PhoneBrand} from "./PhoneBrand";
import {PhoneModel} from "./PhoneModel";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

@Injectable()
export class PhoneModelService {
  constructor(private db: AngularFireDatabase) {
  }
  phoneBrands: AngularFireList<PhoneBrand[]> = null;
  phoneModels: AngularFireList<PhoneModel[]> = null;

  getPhoneBrands(): AngularFireList<PhoneBrand[]> {
    this.phoneBrands = this.db.list('phones/phoneBrands',);
    return this.phoneBrands;
  }

  getPhoneModels(): AngularFireList<PhoneModel[]> {
  this.phoneModels = this.db.list('phones/phoneModels');
  return this.phoneModels;
  }
}

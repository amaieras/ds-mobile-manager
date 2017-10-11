
import {Injectable} from "@angular/core";
import {PhoneBrand} from "./PhoneBrand";
import {PhoneModel} from "./PhoneModel";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Injectable()
export class PhoneModelService {
  constructor(private db: AngularFireDatabase) {
  }
  phoneBrands: FirebaseListObservable<PhoneBrand[]> = null;
  phoneModels: FirebaseListObservable<PhoneModel[]> = null;

  getPhoneBrands(): FirebaseListObservable<PhoneBrand[]> {
    this.phoneBrands = this.db.list('phones/phoneBrands',);
    return this.phoneBrands;
  }

  getPhoneModels(): FirebaseListObservable<PhoneModel[]> {
  this.phoneModels = this.db.list('phones/phoneModels');
  return this.phoneModels;
  }
}

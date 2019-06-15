import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {OfferModel} from '../model/OfferModel';



@Injectable()
export class OfferService {
  offers: AngularFireList<OfferModel> = null;
  partPrices: AngularFireList<any> = null;
  constructor(private db: AngularFireDatabase) {
    this.offers = db.list('/offers');
    this.partPrices = db.list('parts-pf');
  }

  public getAllOffers() {
    return this.offers.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public addOffer(offer: OfferModel): void {
    this.offers.push(offer);
  }


  public getPartPrices() {
    return this.partPrices.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  updateItem(key: string, value: any): void {
    delete(value.$key);
    this.offers.update(key, value);
  }


}



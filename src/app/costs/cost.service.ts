
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class CostService {
  costTypeList: AngularFireList<any> = null;
  costList: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.costTypeList = db.list('/cost-type-list');
    this.costList = db.list('/cost-list');
  }

  addCostType({costType, costValue}) {
    this.costTypeList.push({
      costType,
      costValue
    });
  }

  addCost({addedDate, costType, costValue}) {
      this.costList.push({
        addedDate,
        costType,
        costValue
      });
  }
  getCostList() {
    return this.costList.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public getCostTypeList() {
    return this.costTypeList.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  updateCostType(key: string, costValue: any) {
    return this.costTypeList.update(key, {costValue} );
  }

}

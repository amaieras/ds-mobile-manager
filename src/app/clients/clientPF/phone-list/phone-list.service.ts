import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {UtilService} from '../../../utils/util.service';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PhoneListService implements OnInit {
  brandList: AngularFireList<any> = null;
  modelList: AngularFireList<any> = null;
  partsPrices: AngularFireList<any> = null;
  constructor(private db: AngularFireDatabase, private _utilService: UtilService) {
    this.brandList = this.db.list('phones/phoneBrands');
    this.modelList = this.db.list('phones/phoneModels');
    this.partsPrices = this.db.list('parts-pf');
  }
  ngOnInit() {
  }
  public getBrandList() {
    return this.brandList.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public getModelList() {
    return this.modelList.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public getMaxIdFromBrands(): Observable<any> {
    return this.getBrandList().take(1).map(item => {
      return this._utilService.getMaxIdNewItems(item);
    });
  }
  public getMaxIdFromModels(): Observable<any> {
    return this.getModelList().take(1).map(item => {
      return this._utilService.getMaxIdNewItems(item);
    });
  }

  public getPartPrices() {
    return this.partsPrices.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });

  }
  public addNewBrand(newBrandMaxId: number, brandName: string) {
    this.brandList.push({id: newBrandMaxId , name: brandName});
  }

  public addNewModel(newModelMaxId: number, modelName: string, brandId: number) {
    this.modelList.push({id: newModelMaxId , name: modelName, phoneId: brandId});
  }
}

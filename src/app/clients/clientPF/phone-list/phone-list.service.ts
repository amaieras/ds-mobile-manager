import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {UtilService} from '../../../utils/util.service';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PhoneListService implements OnInit {
  brandList: AngularFireList<any> = null;
  modelList: AngularFireList<any> = null;
  item:  Observable<string>;
  constructor(private _db: AngularFireDatabase) {
    this.brandList = this._db.list('phones/phoneBrands');
    this.modelList = this._db.list('phones/phoneModels');
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

  public addNewBrand(brandName: string) {
    return this.brandList.push({name: brandName});
  }

  public addNewModel(modelName: string, brandId: string) {
    return  this.modelList.push({name: modelName, phoneId: brandId});
  }

  public getModelsOfBrands(brand: string){
    return this.modelList.snapshotChanges().map(arr => {
      return arr
        .filter(snap => {
          return snap.payload.val().phoneId.toLowerCase() === brand.toLowerCase()})
        .map(snap => Object.assign(snap.payload.val(), {$key: snap.key})
      )
    })
  }

  public getModelsOfSeries(brand:string, series: string) {
   return this.modelList.snapshotChanges().map(arr => {
      return arr
        .filter(snap => {
          if(series === 'NOTE') {
            if (snap.payload.val().name.includes(series) && snap.payload.val().phoneId === brand) {
              return true
            } else return false

          }else{
            if (snap.payload.val().name.startsWith(series) && snap.payload.val().phoneId === brand)
              return true;
            else return false;
          }
        })
        .map(snap => Object.assign(snap.payload.val(), {$key: snap.key})
        )
   })

  }


}

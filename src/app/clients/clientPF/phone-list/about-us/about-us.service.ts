import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {UtilService} from "../../../../utils/util.service";

@Injectable()
export class AboutUsService {
  aboutUsList: AngularFireList<any> = null;
  item:  Observable<any>;   //   single object
  constructor(private db: AngularFireDatabase, private _utilService: UtilService) {
    this.aboutUsList = this.db.list('aboutus-list');
  }

  getAboutUsList() {
    return this.aboutUsList.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public getMaxIdFromAboutUs(): Observable<any> {
    return this.getAboutUsList().take(1).map(item => {
      return this._utilService.getMaxIdNewItems(item);
    });
  }
  public addNewAboutUs(newAboutUsMaxId: string, aboutUsVal: string) {
    this.aboutUsList.push({id: newAboutUsMaxId , name: aboutUsVal});
  }
  public getAboutUsById(key: string) {
    const itemPath = `'aboutus-list'/${key}`;
    // this.item = this.db.object()
  }
}

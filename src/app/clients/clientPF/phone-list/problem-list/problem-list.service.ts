import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {UtilService} from '../../../../utils/util.service';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';
import {DataSharedService} from "../../../../shared/data-shared.service";

@Injectable()
export class ProblemListService {

  problemList: AngularFireList<any> = null;
  newPrblMaxId: string;
  constructor(private db: AngularFireDatabase, private _utilService: UtilService,
              private _dataSharedService: DataSharedService) {
    this.problemList = this.db.list('problems-list');
  }

  public getProblemList() {
    return this.problemList.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  public getMaxIdFromProblems(): Observable<any> {
    return this.getProblemList().take(1).map(item => {
      return this._utilService.getMaxIdNewItems(item);
    });
  }
  public addNewProblem(problem: string) {
      // this.getMaxIdFromProblems().subscribe(item => {
      //   if (this._utilService.isNullOrUndefined(item)) {
          this._dataSharedService.currentPartId.subscribe(partId => this.newPrblMaxId = partId);
           this.problemList.push({id: parseInt(this.newPrblMaxId) + 1 , name: problem});
        // }
      // });
  }

}

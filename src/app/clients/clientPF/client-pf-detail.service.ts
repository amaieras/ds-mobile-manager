import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {UtilService} from "../../utils/util.service";
import {ClientPF} from "../../model/ClientPF";
import {ProblemList} from "../../model/ProblemList";


export class ProblemComputePrice {

}

@Injectable()
export class ClientPFService {
  problemList:AngularFireList<any> = null;
  clientsPF:AngularFireList<ClientPF> = null;

  constructor(private db:AngularFireDatabase, private _utilService:UtilService) {
    this.clientsPF = db.list('/clients/pf');
  }


  public addPFClient(clientPF:ClientPF):void {
    this.clientsPF.push(clientPF);
  }

  public getProblemList() {
    this.problemList = this.db.list('problems-list');
    return this.problemList.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}))
    });
  }

  public addNewProblem(problem:string) {
    const maxId = this._utilService.getMaxIdNewItems(this.problemList);
    if (this._utilService.isNullOrUndefined(maxId)) {
      this.problemList.push({id: maxId + 1, name: problem});
    }
  }


  private handleError(error) {
    console.log(error);
  }
}



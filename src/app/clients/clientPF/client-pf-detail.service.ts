import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {UtilService} from "../../utils/util.service";
import {isNull} from "util";
import {ClientPF} from "../../model/ClientPF";


export class ProblemComputePrice {

}

@Injectable()
export class ClientPFService {
  problemList:AngularFireList<any> = null;
  clientsPF:AngularFireList<ClientPF> = null;

  constructor(private db:AngularFireDatabase, private _utilService:UtilService) {
    this.clientsPF = db.list('/clients/pf');
  }


  addPFClient(clientPF:ClientPF):void {
    this.clientsPF.push(clientPF);
  }

  getProblemList() {
    this.problemList = this.db.list('problems-list');
    return this.problemList.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}))
    });
  }

  checkIfNewProblemExist(newProb, allProbs) {

  }

  addNewProblem(prbl) {
    const maxId = this._utilService.getMaxIdNewItems(this.problemList);
    if (maxId === null) {
      return false;
    }
    else {
      this.problemList.push({id: maxId + 1, name: prbl});
      return true;
    }
  }

  private handleError(error) {
    console.log(error);
  }
}



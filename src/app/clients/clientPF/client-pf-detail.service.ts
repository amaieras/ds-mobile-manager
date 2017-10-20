import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {UtilService} from "../../utils/util.service";
import {isNull} from "util";


export class ClientPF {
  constructor(
  ) { }
  $key: string;
  addedDate: string;
  lastname: string;
  firstname: string;
  email: string;
  firm: string;
  phone: string;
  phoneList: PhoneList[];
  tested: string;
  imei: string;
  priceOffer: string;
  appointmentDate: string;
  aboutUs: string;


}

export class PhoneList {
  phoneBrand = '';
  phoneModel = '';
  phoneColor = '';
  phoneQuantity = 1;
  problemList: ProblemList[]  = [];
  observation = '';
}

export class ProblemList {
  problem = 'Sticla';
  pricePerPart = 0;
  partName = '';
}
export class ProblemComputePrice {

}

@Injectable()
export class ClientPFService {
  problemList: AngularFireList<any> = null;
  clientsPF: AngularFireList<ClientPF> = null;

  constructor(private db: AngularFireDatabase, private _utilService: UtilService) {
    this.clientsPF = db.list('/clients/pf');
  }


  addPFClient(clientPF: ClientPF): void {
    this.clientsPF.push(clientPF);
  }

  getProblemList() : AngularFireList<any[]>  {
    this.problemList = this.db.list('problems-list',);
    return this.problemList;
  }

  addNewProblem(prbl){
    var maxId = this._utilService.containsObject(prbl, this.problemList);
    if (maxId === null){
      return false;
    }
    else{
      this.problemList.push({id: maxId + 1, name: prbl});
      return true;
    }
  }
  private handleError(error) {
    console.log(error);
  }
}



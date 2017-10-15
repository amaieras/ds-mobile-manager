import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
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
  problemList: FirebaseListObservable<any[]> = null;
  constructor(private db: AngularFireDatabase, private _utilService: UtilService) {
    this.clientsPF = db.list('/clients/pf');
  }

  clientsPF: FirebaseListObservable<ClientPF[]> = null;

  addPFClient(clientPF: ClientPF): void {
    this.clientsPF.push(clientPF)
      .catch(error => this.handleError(error));
  }

  getProblemList() : FirebaseListObservable<any[]>  {
    this.problemList = this.db.list('problems-list',);
    return this.problemList;
  }

  addNewProblem(prbl){
    var maxId = this._utilService.containsObject(prbl, this.problemList);
    if (maxId === null){
      console.log('Problem exists');
    }
    else{
      this.problemList.push({id: maxId + 1, name: prbl.partName});
    }
  }
  private handleError(error) {
    console.log(error);
  }
}



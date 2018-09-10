import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {UtilService} from "../../utils/util.service";

@Injectable()
export class ClientService {
  problemList: AngularFireList<any> = null;
  partPrices: AngularFireList<any> = null;
  existingPartPrices = [];
  constructor(private _db: AngularFireDatabase,
              private _utilService: UtilService) {
    this.problemList = this._db.list('problems-list');
    this.partPrices = this._db.list('part-price-list');
  }
  /**
   * Add a new problem name
   * @param formModel
   */
  public addNewProblemName(formModel: any) {
    for (let i = 0; i < formModel.phoneList.length; i++) {
      for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
        const item = formModel.phoneList[i].problems[j];
        if (item.partName !== undefined) {
          this.problemList.push({name: item.partName});
        }
      }
    }
  }

  /**
   * Remove new properties when new item name is added eg. new part name, new brand, new model
   * @param saveClient
   * @returns {any}
   */
  public removeCtrlForNewItems(saveClient) {
    saveClient.phoneList.forEach(phone => {
      phone.problems.forEach(problem => {
        if (problem.partName !== undefined) {
          problem.problem = problem.partName;
          delete problem.partName;
        }
      })
      if (phone.newBrand !== undefined) {
        phone.phoneBrand = phone.newBrand
        delete phone.newBrand;
      }
      if (phone.newModel !== undefined) {
        phone.phoneModel = phone.newModel;
        delete phone.newModel;
      }
      if (phone.newSingleModel !== undefined) {
        phone.phoneModel = phone.newSingleModel;
        delete phone.newSingleModel;
      }
    });
    return saveClient;
  }

  /**
   * Returns the list of problem names
   * @returns {Observable<any>}
   */
  public getProblemList() {
    return this.problemList.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  /**
   * Returns the list of problem names along side withe their prices based on brand+model phones
   * @returns {Observable<any>}
   */
  public getPartPrices() {
    return this.partPrices.snapshotChanges().map(arr => {
      //noinspection TypeScriptUnresolvedVariable
      return arr.map(snap => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }
  /**
   * When the selected problem is 'Altele' this method will add new price for that problem given the selected phoneBrand + phoneModel
   * When the selected problem is not 'Altele' this method will update the price for the selected phoneBrand + phoneModel + problem
   * @param formModel
   */
   addNewPartPrice(formModel: any): any {
    this.getPartPrices().take(1).subscribe(part => {
      for (let i = 0; i < formModel.phoneList.length; i++) {
        for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
          const phoneItem = formModel.phoneList[i];
          const problemItem = formModel.phoneList[i].problems[j];
          let phoneProblem = problemItem.partName === undefined || problemItem.partName === 'Altele' ? problemItem.problem.toLowerCase() : problemItem.partName.toLowerCase();
          //When new model need to be added for an existing brand, need to get the new model name
          phoneItem.phoneModel = phoneItem.phoneModel === undefined ? phoneItem.newSingleModel : phoneItem.phoneModel;
          this.existingPartPrices = part.filter(item => item.phoneBrand.toLowerCase() === phoneItem.phoneBrand.toLowerCase()
            && item.phoneModel.toLowerCase() === phoneItem.phoneModel.toLowerCase()
            && item.problemId.toLowerCase() === phoneProblem);
          if (this.existingPartPrices.length > 0) {
            this.partPrices.update(this.existingPartPrices[0].$key,{price: problemItem.pricePerPart} )
          }
          else {
            let phoneBrand = phoneItem.phoneBrand.toLowerCase() === 'altele' ? phoneItem.newBrand.toLowerCase() : phoneItem.phoneBrand.toLowerCase();
            let phoneModel = phoneItem.phoneModel.toLowerCase();
            if (phoneItem.phoneModel.toLowerCase() === 'altele') {
              phoneModel = this._utilService.isNullOrUndefined(phoneItem.newSingleModel) ?  phoneItem.newSingleModel : phoneItem.newModel;
            }
            this.partPrices.push({phoneBrand: phoneBrand, phoneModel: phoneModel, price: +problemItem.pricePerPart, problemId: phoneProblem});
          }
        }
      }
    })
  }

}

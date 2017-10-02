import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {PhoneModelService} from "./phone-model.service";
import {PhoneBrand} from "./PhoneBrand";
import {PhoneModel} from "./PhoneModel";
import {UtilService} from "../../utils/util.service";
import {isUndefined} from "util";

@Component({
  selector: 'phone-model-cascading-list',
  templateUrl: 'phone-model-cascading-list.component.html',
  providers: [PhoneModelService]
})
export class PhoneModelCascadingListComponent implements OnInit {
  @Input() inputModel: any;
  @Input() pIndex: string;
  @Output('update') updateModel = new EventEmitter<any>();

  phoneBrands: PhoneBrand[];
  phoneModels: PhoneModel[];
  newModel: any;
  mainArray: any = [];
  cascadedModels: PhoneModel[];
  constructor(private _phoneModelService: PhoneModelService, private _utilService: UtilService){
  }

  ngOnInit() {
    this.phoneBrands = this._phoneModelService.getPhoneBrands();
    this.phoneModels = this._phoneModelService.getPhoneModels();
    this.newModel = this.inputModel;
    this.newModel.pIndex = this.pIndex;
    this.mainArray[this.pIndex] = this.newModel;
    // this._utilService.addOrUpdateArr(this.mainArray, this.newModel, this.arrIndex);
    this.cascadedModels = this.phoneModels.filter((item) => item.phoneid == 1);
    this.updateModel.emit(this.mainArray);

  }

  onSelect(phoneid) {
    this.cascadedModels = this.phoneModels.filter((item) => item.phoneid == phoneid)
    this.newModel.phoneId = parseInt(phoneid);
    this.newModel.modelId = this.phoneModels.filter((item) => item.phoneid == phoneid)[0].value;
    this.newModel.pIndex = this.pIndex;
    this.mainArray[this.pIndex] = this.newModel;
    // this._utilService.addOrUpdateArr(this.mainArray, this.newModel, this.arrIndex);
    this.updateModel.emit(this.mainArray);
  }

  onModelSelect(modelid) {
    this.newModel.modelId = parseInt(modelid);
    // this._utilService.addOrUpdateArr(this.mainArray, this.newModel, this.arrIndex);
    this.newModel.pIndex = this.pIndex;
    console.log(this.newModel.phoneId + ' new model model')
    this.mainArray[this.pIndex] = this.newModel;
    console.log(this.mainArray)
    this.updateModel.emit(this.mainArray);
    this.mainArray.forEach((item, index) => {
      console.log(item.phoneId + ' phoneId')
      console.log(item.modelId + ' modelId')
      console.log(item.pIndex + ' index')
    })
  }
}

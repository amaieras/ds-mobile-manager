import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {PhoneModelService} from "./phone-model.service";
import {PhoneModel} from "./PhoneModel";
import {Observable} from "rxjs/Observable";
import {PhoneBrand} from "./PhoneBrand";
import {PhoneCascadeService} from "../../shared/phone-cascade.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'phone-model-cascading-list',
  templateUrl: 'phone-model-cascading-list.component.html',
  providers: [PhoneModelService, PhoneCascadeService]
})
export class PhoneModelCascadingListComponent implements OnInit {
  @Input() inputModel: any;
  @Input() pIndex: string;
  @Output('update') updateModel = new EventEmitter<any>();
  @Input('group') phoneListGroup: FormGroup;
  phoneBrandsArray: any = [];
  phoneModelsArray: any = [];
  newModel: any;
  mainArray: any = [];
  cascadedModels: Observable<PhoneModel[]>;
  cascadedBrands: Observable<PhoneBrand[]>;

  constructor(private _phoneModelService: PhoneModelService, private _phoneCascadeService: PhoneCascadeService){
  }

  ngOnInit() {
    this._phoneModelService.getPhoneBrands().subscribe(phoneModels => {
      phoneModels.forEach(snapshot => {
        this.phoneBrandsArray.push({label: snapshot.name, value: snapshot.id})
      })
      this.cascadedBrands = this.phoneBrandsArray;
    });
    this._phoneModelService.getPhoneModels().subscribe(phoneBrands => {
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId})
      })
      this.cascadedModels = this.phoneModelsArray.filter((item) => item.phoneId == 1);
    });
    this.newModel = this.inputModel;
    this.newModel.pIndex = this.pIndex;
    this.mainArray[this.pIndex] = this.newModel;
    this._phoneCascadeService.addToArr(this.newModel);
    this.updateModel.emit(this.mainArray);
  }

  onSelect(phoneId) {
    this._phoneModelService.getPhoneModels().subscribe(phoneBrands => {
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId})
      })
      this.cascadedModels = this.phoneModelsArray.filter((item) => item.phoneId == phoneId);
      this.newModel.modelId = this.phoneModelsArray.filter((item) => item.phoneId == phoneId)[0].value
    });
    this.newModel.phoneId = parseInt(phoneId);
    this.newModel.pIndex = this.pIndex;
    this.mainArray[this.pIndex] = this.newModel;
    this._phoneCascadeService.addToArr(this.newModel);
    console.log(this._phoneCascadeService.getArr());
    this.updateModel.emit(this.mainArray);
  }

  onModelSelect(modelId) {
    this.newModel.modelId = parseInt(modelId);
    this.newModel.pIndex = this.pIndex;
    this.mainArray[this.pIndex] = this.newModel;
    this.updateModel.emit(this.mainArray);
    this._phoneCascadeService.addToArr(this.newModel);
    // this.mainArray.forEach((item, index) => {
    //   console.log(item.phoneId + ' phoneId')
    //   console.log(item.modelId + ' modelId')
    //   console.log(item.pIndex + ' index')
    // })
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {PhoneModelService} from "./phone-model.service";
import {PhoneBrand} from "./PhoneBrand";
import {PhoneModel} from "./PhoneModel";

@Component({
  selector: 'phone-model-cascading-list',
  templateUrl: 'phone-model-cascading-list.component.html',
  providers: [PhoneModelService]
})
export class PhoneModelCascadingListComponent implements OnInit {
  @Input() inputModel: any;
  @Output() updateModel = new EventEmitter<any>();

  phoneBrands: PhoneBrand[];
  phoneModels: PhoneModel[];
  newModel: any;
  cascadedModels: PhoneModel[];

  constructor(private _phoneModelService: PhoneModelService){ }

  ngOnInit() {
    this.phoneBrands = this._phoneModelService.getPhoneBrands();
    this.phoneModels = this._phoneModelService.getPhoneModels();
    this.newModel = this.inputModel;
    this.cascadedModels = this.phoneModels.filter((item) => item.phoneid == 1);
  }

  onSelect(phoneid) {
    this.cascadedModels = this.phoneModels.filter((item) => item.phoneid == phoneid)
    this.newModel.phoneId = parseInt(phoneid);
    this.newModel.modelId = this.phoneModels.filter((item) => item.phoneid == phoneid)[0].value;
    this.updateModel.emit(this.newModel);
  }

  onModelSelect(modelid) {
    this.newModel.modelId = parseInt(modelid);
    this.updateModel.emit(this.newModel);
  }
}

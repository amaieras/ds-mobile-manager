import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PhoneCascadeService} from "../../../shared/phone-cascade.service";
import {Observable} from "../../../../../node_modules/rxjs/Observable.d";
import {PhoneBrand} from "app/clients/phone-models/PhoneBrand";
import {PhoneModel} from "../../phone-models/PhoneModel";
import {PhoneModelService} from "app/clients/phone-models/phone-model.service";
import {ClientPF} from "../../../model/ClientPF";

@Component({
  selector: 'phone-list',
  templateUrl: 'phone-list.component.html',
  providers: [PhoneCascadeService]
})
export class PhoneListComponent implements OnInit {
  @Input('group') phoneListGroup:FormGroup;
  @Output('change') phoneItem = new EventEmitter<any>();
  @Input('clientPF') clientPF:ClientPF;
  newItem:any;
  mainArray:Array<any> = [];
  cascadedModels:Observable<PhoneModel[]>;
  cascadedBrands:Observable<PhoneBrand[]>;
  phoneBrandsArray:any = [];
  phoneModelsArray:any = [];

  constructor(private fb:FormBuilder, private _phoneModelService:PhoneModelService) {
  }

  ngOnInit() {
    this.newItem = {
      phoneId: 1,
      modelId: 1
    }
    this.mainArray.push((this.newItem));
    this.addProblem();

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
  }

  addProblem() {
    const problemArray = <FormArray>this.phoneListGroup.controls['problems'];
    const newProblem = this.initProblem();
    problemArray.push(newProblem);
  }

  removeProblem(idx:number) {
    const problemArray = <FormArray>this.phoneListGroup.controls['problems'];
    problemArray.removeAt(idx);
  }

  private initProblem() {
    return this.fb.group({
      problem: '',
      pricePerPart: '',
    })
  }

  onSelect(phoneId) {
    this._phoneModelService.getPhoneModels().subscribe(phoneBrands => {
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId})
      })
      this.cascadedModels = this.phoneModelsArray.filter((item) => item.phoneId == phoneId);
    });
  }
}

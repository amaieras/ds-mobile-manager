import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhoneCascadeService} from '../../../shared/phone-cascade.service';
import {Observable} from 'rxjs/Observable';
import {PhoneModelService} from 'app/clients/phone-models/phone-model.service';
import {ClientPF} from '../../../model/ClientPF';
import {UtilService} from "../../../utils/util.service";
import {forbiddenStringInput} from "../../../shared/forbiddenStringInput";
import {ProblemPrice} from "../../../model/ProblemPrice";
import {ProblemListService} from "./problem-list/problem-list.service";

@Component({
  selector: 'app-phone-list',
  templateUrl: 'phone-list.component.html',
  providers: [PhoneCascadeService]
})
export class PhoneListComponent implements OnInit {
  @Input('group') phoneListGroup: FormGroup;
  @Output('change') phoneItem = new EventEmitter<any>();
  @Input('clientPF') clientPF: ClientPF;
  newItem: any;
  mainArray: Array<any> = [];
  phoneBrandsArray: any = [];
  phoneModelsArray: any = [];
  problemsPriceList: any = [];
  isRequired = false;
  isRequiredModel = false;
  newBrandNameExists = false;
  newModelNameExists = false;
  selectedModel = '1';
  constructor(private fb: FormBuilder, private _phoneModelService: PhoneModelService, private _utilService: UtilService,
              private _problemListService: ProblemListService) {
  }

  ngOnInit() {
    this.newItem = {
      phoneId: 1,
      modelId: 1
    };
    this.mainArray.push((this.newItem));
    this.addProblem();

    this._phoneModelService.getPhoneBrands().subscribe(phoneModels => {
      this.phoneBrandsArray = [];
      phoneModels.forEach(snapshot => {
        this.phoneBrandsArray.push({label: snapshot.name, value: snapshot.id});
      });
    });
    this._phoneModelService.getPhoneModels().subscribe(phoneBrands => {
      this.phoneModelsArray = [];
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId});
      });
      this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === 1);
      this.phoneModelsArray.unshift({label: "Altele", value: "0", phoneId: 0});
    });
  }

  addProblem() {
    const problemArray = <FormArray>this.phoneListGroup.controls['problems'];
    const newProblem = this.initProblem();
    problemArray.push(newProblem);

  }

  removeProblem(idx: number) {
    const problemArray = <FormArray>this.phoneListGroup.controls['problems'];
    problemArray.removeAt(idx);
  }

  private initProblem() {
    return this.fb.group({
      problem: '',
      pricePerPart: new FormControl(650, [
        Validators.required,
        forbiddenStringInput(/^\\d+$/)
      ]),
    });
  }

  onSelect(phoneId) {
    this._problemListService.getProblemPriceList().subscribe(problemsPriceList => {
      this.problemsPriceList = [];
      problemsPriceList.forEach(snapshot => {
        this.problemsPriceList.push(new ProblemPrice(snapshot.id, snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price))
      })
      this.problemsPriceList = this.problemsPriceList.filter((item) => item._phoneBrand === phoneId);
    })
    this.checkIsOtherBrandModel(phoneId)
    if(this.newModel !== null) {
      this.checkIfNewModelExists(this.newModel.value)
    }
    this._phoneModelService.getPhoneModels().subscribe(phoneBrands => {
      this.phoneModelsArray = [];
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId});
      });
      this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === phoneId);
      if(!this._utilService.containsObject("Altele", this.phoneModelsArray)) {
        this.phoneModelsArray.push({label: "Altele", value: "0", phoneId: 0});
      }
    });
  }

  onModelSelect(modelId) {
    this.checkIsOtherModel(modelId);
  }
  checkIfNewBrandExists(newBrandName) {
    if(this._utilService.isNullOrUndefined(newBrandName)) {
      this.newBrandNameExists = this._utilService.containsObject(newBrandName, this.phoneBrandsArray);
    }
  }
  checkIfNewModelExists(newModelName) {
    if(this._utilService.isNullOrUndefined(newModelName)) {
      this._phoneModelService.getPhoneModels().subscribe(phoneBrands => {
        this.phoneModelsArray = [];
        phoneBrands.forEach(snapshot => {
          this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId});
        });
        this.newModelNameExists = this._utilService.containsObject(newModelName, this.phoneModelsArray);
        if(!this.newModelNameExists) {
          this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === 0);
        }
      });
    }
  }
  checkIsOtherBrandModel(val) {
    this.isRequired = this._utilService.checkIsOther(val);
    if (this.isRequired) {
      this.isRequiredModel = false;
      this.phoneListGroup.addControl('newBrand',
        new FormControl('', Validators.required, this.newBrandNameValidator.bind(this)
        ));
      this.phoneListGroup.addControl('newModel',
        new FormControl('', Validators.required, this.newModelNameValidator.bind(this)//TODO repiar validation
        ));
    } else {
      this.phoneListGroup.removeControl('newBrand');
      this.phoneListGroup.removeControl('newModel');
    }
  }

  checkIsOtherModel(val) {
    this.isRequiredModel = this._utilService.checkIsOther(parseInt(val));
    if(this.isRequiredModel) {
      this.phoneListGroup.addControl('newSingleModel',
        new FormControl('', Validators.required, this.newSingleModelNameValidator.bind(this)//TODO repiar validation
        ));
    } else {
      this.phoneListGroup.removeControl('newSingleModel');
    }
  }

  newBrandNameValidator() {
    const brandNames = this.phoneBrandsArray;
    return Observable
      .of(this._utilService.containsObject(this.newBrand.value, brandNames))
      .map(result => !result ? null : { invalid: true });
  }

  newModelNameValidator() {
    const modelNames = this.phoneModelsArray;
    let modelName = this.newModel.value;
    return Observable
      .of(this._utilService.containsObject(modelName, modelNames))
      .map(result => !result ? null : { invalid: true });
  }

  newSingleModelNameValidator() {
    const modelNames = this.phoneModelsArray;
    let modelName = this.newSingleModel.value;
    return Observable
      .of(this._utilService.containsObject(modelName, modelNames))
      .map(result => !result ? null : { invalid: true });
  }
  get newBrand() {
    //noinspection TypeScriptUnresolvedFunction
    return this.phoneListGroup.get('newBrand');
  }
  get newModel() {
    //noinspection TypeScriptUnresolvedFunction
    return this.phoneListGroup.get('newModel');
  }
  get newSingleModel() {
    //noinspection TypeScriptUnresolvedFunction
    return this.phoneListGroup.get('newSingleModel');
  }
}

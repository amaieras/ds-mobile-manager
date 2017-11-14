import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhoneCascadeService} from '../../../shared/phone-cascade.service';
import {Observable} from 'rxjs/Observable';
import {UtilService} from "../../../utils/util.service";
import {forbiddenStringInput} from "../../../shared/forbiddenStringInput";
import {ProblemPrice} from "../../../model/ProblemPrice";
import {PhoneListService} from "./phone-list.service";
import {imeiValidator} from "../../../shared/imei-validator.directive";

@Component({
  selector: 'app-phone-list',
  templateUrl: 'phone-list.component.html',
  providers: [PhoneCascadeService]
})
export class PhoneListComponent implements OnInit {
  @Input('group') phoneListGroup: FormGroup;
  @Input('clientPFForm') clientPFForm: FormGroup;
  @Output('change') phoneItem = new EventEmitter<any>();
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
  constructor(private fb: FormBuilder, private _utilService: UtilService,
              private _phoneListService: PhoneListService) {
  }

  ngOnInit() {
    this.populateAllDropDowns();
    this.initBrandModelList();
  }

  private populateAllDropDowns() {
    this._phoneListService.getBrandList().subscribe(phoneModels => {
      this.phoneBrandsArray = [];
      phoneModels.forEach(snapshot => {
        this.phoneBrandsArray.push({label: snapshot.name, value: snapshot.id});
      });
    });
    this._phoneListService.getModelList().subscribe(phoneBrands => {
      this.phoneModelsArray = [];
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId});
      });
      this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === 1);
      //Add as first value of model dropdown 'Altele' so after each change on brand dropdown value, this value will appear first
      this.phoneModelsArray.unshift({label: "Altele", value: "0", phoneId: 0});
    });
  }

  private initBrandModelList() {
    this.newItem = {
      phoneId: 1,
      modelId: 1
    };
    this.mainArray.push((this.newItem));
    this.addProblem();
  }

  addProblem() {
    const problemArray = <FormArray>this.phoneListGroup.controls['problems'];
    const newProblem = this.initProblem();
    problemArray.push(newProblem);
    this._phoneListService.getPartPrices().subscribe(parts => {
      this.problemsPriceList = [];
      parts.forEach(snapshot => {
        this.problemsPriceList.push(new ProblemPrice(snapshot.id, snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
      })
      const firstModelId = this.getFirstModelOfBrand(1)
      const that = this;
      problemArray.controls.forEach(item => {
        const results = this.problemsPriceList.filter(function (part) {
          return part._phoneBrand.toString() === that.newItem.phoneId.toString()
            && part._phoneModel === firstModelId
            && part._problemId === item.value.problem.toString();
        })
        for (let i = 0; i < problemArray.length; i++) {
          const itemInput = <FormGroup>problemArray.at(i)
          itemInput.patchValue({pricePerPart: results[0]._price});
        }
      })
    });

  }

  removeProblem(idx: number) {
    const problemArray = <FormArray>this.phoneListGroup.controls['problems'];
    problemArray.removeAt(idx);
  }

  private initProblem() {
    return this.fb.group({
      problem: '',
      pricePerPart: new FormControl(500, [
        Validators.required,
        forbiddenStringInput(/^\\d+$/)
      ]),
    });
  }

  onSelect(phoneId) {
    const problemArray = this.phoneListGroup.controls['problems'] as FormArray;
    const firstModelOfBrandPrint = this.getFirstModelOfBrand(1);
    this.onModelSelect(firstModelOfBrandPrint);
    this.checkIsOtherBrandModel(phoneId);
    if(this.newModel !== null) {
      this.checkIfNewModelExists(this.newModel.value)
    }
    this._phoneListService.getModelList().subscribe(phoneBrands => {
      this.phoneModelsArray = [];
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId});
      });
      this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === phoneId);
      if(!this._utilService.containsObject("Altele", this.phoneModelsArray)) {
        this.phoneModelsArray.push({label: "Altele", value: "0", phoneId: 0});
      }
    });

    for (let i=0; i < problemArray.length; i++) {
      const that = this;
      const itemInput = <FormGroup>problemArray.at(i)
      const firstModelOfBrand = this.getFirstModelOfBrand(+itemInput.controls['problem'].value);
      const results = this.problemsPriceList.filter(function(part) {
        return +part._phoneBrand === +that.newItem.phoneId
          && +part._phoneModel === +firstModelOfBrand
          && +part._problemId === +itemInput.controls['problem'].value;
      })
      if(results.length > 0) {
        if (results[0] !== undefined) {
          itemInput.controls['pricePerPart'].setValue(results[0]._price)
        } else {
          itemInput.controls['pricePerPart'].setValue(0)
        }
      } else {
          itemInput.controls['pricePerPart'].setValue(0);
      }
    }
  }

  private getFirstModelOfBrand(problemId) {
    const firstModelId = this.problemsPriceList.filter(phone => +phone._phoneBrand === +this.newItem.phoneId
      && +phone._problemId === problemId)
    const firsModelOfBrand = firstModelId[0] === undefined ? null : firstModelId[0]._phoneModel;
    return firsModelOfBrand;
  }

  onModelSelect(modelId) {
    const problemArray = this.phoneListGroup.controls['problems'] as FormArray;
    this.checkIsOtherModel(modelId);
    this.selectedModel = modelId;
    const that = this;
    for (let i=0; i < problemArray.length; i++) {
      const itemInput = <FormGroup>problemArray.at(i);
      const items = this.problemsPriceList.filter(phone => {
        return phone._phoneBrand.toString() === that.newItem.phoneId.toString()
          && phone._phoneModel === modelId
          && phone._problemId.toString() === itemInput.controls['problem'].value.toString();
      });
      if (items[0] !== undefined) {
        itemInput.controls['pricePerPart'].setValue(items[0]._price)
      } else {
        itemInput.controls['pricePerPart'].setValue(0);
      }
    }
  }
  checkIfNewBrandExists(newBrandName) {
    if(this._utilService.isNullOrUndefined(newBrandName)) {
      this.newBrandNameExists = this._utilService.containsObject(newBrandName, this.phoneBrandsArray);
    }
  }
  checkIfNewModelExists(newModelName) {
    if(this._utilService.isNullOrUndefined(newModelName)) {
      this._phoneListService.getModelList().subscribe(phoneBrands => {
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
        new FormControl('', Validators.required, this.newModelNameValidator.bind(this)
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
        new FormControl('', Validators.required, this.newSingleModelNameValidator.bind(this)
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
    const modelName = this.newModel.value;
    return Observable
      .of(this._utilService.containsObject(modelName, modelNames))
      .map(result => !result ? null : { invalid: true });
  }

  newSingleModelNameValidator() {
    const modelNames = this.phoneModelsArray;
    const modelName = this.newSingleModel.value;
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

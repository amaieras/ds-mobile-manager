import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhoneCascadeService} from '../../../shared/phone-cascade.service';
import {Observable} from '../../../../../node_modules/rxjs/Observable.d';
import {PhoneBrand} from 'app/clients/phone-models/PhoneBrand';
import {PhoneModel} from '../../phone-models/PhoneModel';
import {PhoneModelService} from 'app/clients/phone-models/phone-model.service';
import {ClientPF} from '../../../model/ClientPF';
import {AboutUsService} from 'app/clients/clientPF/phone-list/about-us/about-us.service';
import {UtilService} from "../../../utils/util.service";

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
  isRequired = false;

  constructor(private fb: FormBuilder, private _phoneModelService: PhoneModelService, private _utilService: UtilService) {
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
      pricePerPart: '',
    });
  }

  onSelect(phoneId) {
    this.checkIsOther(phoneId)
    this._phoneModelService.getPhoneModels().subscribe(phoneBrands => {
      this.phoneModelsArray = [];
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.id, phoneId: snapshot.phoneId});
      });
      this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === phoneId);
    });
  }

  checkIsOther(val) {
    this.isRequired = this._utilService.checkIsOther(val);
    if (this.isRequired) {
      this.phoneListGroup.addControl('newBrand',
        new FormControl('', Validators.required
        ));
      this.phoneListGroup.addControl('newModel',
        new FormControl('', Validators.required
        ));
    } else {
      this.phoneListGroup.removeControl('newBrand');
      this.phoneListGroup.removeControl('newModel');
    }
  }
}

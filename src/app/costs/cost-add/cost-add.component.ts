import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../utils/util.service';
import {Observable} from 'rxjs/Observable';
import {CostService} from '../cost.service';

@Component({
  selector: 'app-cost-add',
  templateUrl: './cost-add.component.html',
  styleUrls: ['./cost-add.component.scss']
})
export class CostAddComponent implements OnInit {
  @Input('group') costTypeGroup: FormGroup;
  @Input('costForm') costForm: FormGroup;
  @Output('change') costTypeItem = new EventEmitter<any>();

  costTypes: any[] = [];
  isOtherRequired = false;
  costTypeValExists = false;
  selectedOtherCostType: String = "";
  selectedCost: String = "Transport";

  constructor(
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _costService: CostService
  ) {}

  ngOnInit() {
    this._costService.getCostTypeList().subscribe(costTypes => {
      this.costTypes = [];
      costTypes.forEach(ct => {
        this.costTypes.push({ label: ct.costType, value: ct.costType, key: ct.$key });
      });
    });

    this.costForm = this._fb.group({
      costList: this._fb.array([]),
    });
  }
  checkIfCostTypeExists(newValue) {
    if (this._utilService.isNotNullOrUndefined(newValue)) {
      this.costTypeValExists = this._utilService.containsObject(newValue, this.costTypes);
    }
  }
  onCostTypeChange(val) {
    this.checkIsOther(val);
    // TODO set price of existing cost
  }
  checkIsOther(val) {
    this.isOtherRequired = this._utilService.checkIsOther(val.value);
    if (this.isOtherRequired) {
      this.costTypeGroup.addControl('costTypeName',
        new FormControl('', Validators.required, this.costTypeNameValidator.bind(this)
        ));
    } else {
      this.costTypeGroup.removeControl('costTypeName');
    }
  }
  costTypeNameValidator() {
    return Observable
      .of(this._utilService.containsObject(this.selectedOtherCostType, this.costTypes))
      .map(result => !result ? null : { invalid: true });
  }

  submit(costForm) {
    const costList = costForm.get("costList").controls;
    costList.forEach(item => {
      const costType = item["controls"]["costType"].value.toLowerCase() === "altele"
        ? item["controls"]["costTypeName"].value
        : item["controls"]["costType"].value;
      const costValue = item["controls"]["costValue"].value;
      const addedDate = new Date().getTime().toString();
      const costData = {
        costType,
        costValue,
        addedDate
      };
      this._costService.addCost(costData);
      const costTypeData = {
              costType,
              costValue
            };
      const keyCostType = this.getKeyOfCostType(costTypeData);
      if (keyCostType !== null) {
        this._costService.updateCostType(keyCostType, +costValue);
      } else {
        this._costService.addCostType(costTypeData);
      }
    });
    this.resetForm(costForm);
  }
  resetForm(costForm) {
    costForm.controls['costList'] = this._fb.array([]);
    costForm.controls['costList'].push(this.initCostList());
  }
  initCostList() {
    return this._fb.group({
      costType: "",
      costValue: 0,
    });
  }
  getKeyOfCostType(costTypeData) {
    if (this._utilService.containsObject(costTypeData.costType, this.costTypes)) {
      const existingCostType = this.costTypes.filter(ct => {
        return ct.value.toLowerCase().trim() === costTypeData.costType.toLowerCase().trim();
      });
      return existingCostType[0].key;
    };
    return null;
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import { Message } from "primeng/api";
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CostAddComponent} from '../cost-add/cost-add.component';
import {UtilService} from '../../utils/util.service';

@Component({
  selector: "app-cost",
  templateUrl: "./cost.component.html",
  styleUrls: ["./cost.component.scss"]
})
export class CostComponent implements OnInit {
  msgs: Message[] = [];
  costForm: FormGroup;
  costTypeItem: FormGroup;
  @ViewChild(CostAddComponent) costAddCmp: CostAddComponent;

  constructor(
    private _fb: FormBuilder,
    private _utilService: UtilService
  ) {}

  ngOnInit() {
    this.costForm = this._fb.group({
      costList: this._fb.array([]),
    });
    this.addInCostList();
  }

  addInCostList(): any {
    const costListArray = <FormArray>this.costForm.controls['costList'];
    const newCost = this.initCostList();
    costListArray.push(newCost);
  }

  initCostList() {
    return this._fb.group({
      costType: "",
      costValue: 0,
    });
  }
  getCostTypeItem(val) {
    this.costTypeItem = val;
  }

  removeFromCostList(idx: number) {
    const costListArray = <FormArray>this.costForm.controls['costList'];
    costListArray.removeAt(idx);
  }

  onSubmit(e) {
    this.costAddCmp.submit(this.costForm);
    this.msgs = this._utilService.succesAddMessage('Adauga cheltuiala',
      'success', 'Cheltuiala adaugata cu succes.');
  }
}

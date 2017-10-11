

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PhoneCascadeService} from "../../shared/phone-cascade.service";

@Component({
  selector: 'phone-list',
  templateUrl: 'phone-list.component.html',
  providers: [PhoneCascadeService]
})
export class PhoneListComponent implements OnInit {
  @Input('group') phoneListGroup: FormGroup;
  @Input('pIndex') phoneIndex: string;
  @Output('change') phoneItem = new EventEmitter<any>();
  newItem: any;
  mainArray: Array<any>;
  constructor(private fb: FormBuilder, private _phoneCascadeService: PhoneCascadeService) {
    this.mainArray = [];
  }

  updateModel(val) {
    // console.log(this._phoneCascadeService.getArr());
    // this.phoneItem.emit(val);
  }
  ngOnInit() {
    this.newItem = {
      phoneId: 1,
      modelId: 1
    }
    this.mainArray.push((this.newItem));
    this.addProblem();
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
      problem:'',
      pricePerPart: '',
      partName: ''
    })
  }
}

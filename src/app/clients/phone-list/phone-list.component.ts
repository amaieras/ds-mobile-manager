

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'phone-list',
  templateUrl: 'phone-list.component.html'
})
export class PhoneListComponent implements OnInit {
  @Input('group') phoneListGroup: FormGroup;
  @Input('pIndex') phoneIndex: string;
  @Output('change') phoneItem = new EventEmitter<any>();
  newItem: any;
  mainArray: Array<any>;
  constructor(private fb: FormBuilder) {
    this.mainArray = [];
  }

  updateModel(val) {
    this.phoneItem.emit(val);
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

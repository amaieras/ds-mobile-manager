

import {Component, Input, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'phone-gsm-list',
  templateUrl: 'phone-gsm-list.component.html'
})
export class PhoneGSMListComponent implements OnInit {
  @Input('group') phoneListGroup: FormGroup;
  newItem: any;
  mainArray: Array<any>;

  constructor(private fb: FormBuilder) {
    this.mainArray = [];
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

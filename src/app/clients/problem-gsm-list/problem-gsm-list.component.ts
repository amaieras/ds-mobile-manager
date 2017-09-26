

import {FormGroup} from "@angular/forms";
import {Component, Input} from "@angular/core";
import {SelectItem} from "primeng/primeng";

@Component({
  selector: 'problem-gsm-list',
  templateUrl: 'problem-gsm-list.component.html'
})
export class ProblemGSMListComponent{
  @Input('group') problemGSMListGroup: FormGroup;
  problemsGSM: SelectItem[];
  constructor() {
    this.problemsGSM = [];
    this.problemsGSM.push({label:'Sticla', value: 'Sticla' });
    this.problemsGSM.push({label:'Display', value: 'Display' });
    this.problemsGSM.push({label:'Vanzare Display', value: 'Vanzare Display' });
    this.problemsGSM.push({label:'Altele', value: 'Altele' });
  }
}

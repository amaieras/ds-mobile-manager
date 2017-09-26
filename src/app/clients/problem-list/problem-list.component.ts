

import {FormGroup} from "@angular/forms";
import {Component, Input} from "@angular/core";
import {SelectItem} from "primeng/primeng";

@Component({
  selector: 'problem-list',
  templateUrl: 'problem-list.component.html'
})
export class ProblemListComponent {
  @Input('group') problemListGroup: FormGroup;
  problems: SelectItem[];
  problemsGSM: SelectItem[];
  constructor() {
    this.problems = [];
    this.problemsGSM = [];
    this.problems.push({label:'Sticla', value: 'Sticla' });
    this.problems.push({label:'Display', value: 'Display' });
    this.problems.push({label:'Altele', value: 'Altele' });

    this.problemsGSM.push({label:'Sticla', value: 'Sticla' });
    this.problemsGSM.push({label:'Display', value: 'Display' });
    this.problemsGSM.push({label:'Vanzare Display', value: 'Vanzare Display' });
    this.problemsGSM.push({label:'Altele', value: 'Altele' });
  }
}

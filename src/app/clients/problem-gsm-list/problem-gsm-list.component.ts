import {FormGroup} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UtilService} from '../../utils/util.service';
import {ProblemListService} from '../clientPF/phone-list/problem-list/problem-list.service';

@Component({
  selector: 'app-problem-gsm-list',
  templateUrl: 'problem-gsm-list.component.html'
})
export class ProblemGSMListComponent {
  @Input('group') problemGSMListGroup: FormGroup;
  problems: Observable<any[]>;
  problemsList: any = [];
  selectedProblem = 'Sticla';
  constructor(private _problemListService: ProblemListService, private _utilService: UtilService) {
    this._problemListService.getProblemList().subscribe(problemsList => {
      problemsList.forEach(snapshot => {
        this.problemsList.push({label: snapshot.name, value: snapshot.id});
      });
      this.problems = this.problemsList;
    });
  }

  checkIsOther() {
    return this._utilService.checkIsOther(this.selectedProblem);
  }
}

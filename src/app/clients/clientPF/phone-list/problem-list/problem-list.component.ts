import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UtilService} from '../../../../utils/util.service';
import {DropdownModel} from '../../../../model/DropdownModel';
import {ClientPF} from '../../../../model/ClientPF';
import {Observable} from 'rxjs/Observable';
import {ProblemListService} from './problem-list.service';


@Component({
  selector: 'app-problem-list',
  templateUrl: 'problem-list.component.html'
})
export class ProblemListComponent implements OnInit {
  @Input('group') problemListGroup: FormGroup;
  @Input('clientPF') clientPF: ClientPF;
  problemsList: any = [];
  problems: Array<{}>;
  selectedProblem = '1';

  private isRequired = false;
  private isPresent = false;

  constructor(private _problemListService: ProblemListService, private _utilService: UtilService,
              private changeDetector: ChangeDetectorRef) { }
  ngOnInit() {
    this._problemListService.getProblemList().subscribe(problemsList => {
      this.problemsList = [];
      problemsList.forEach(snapshot => {
        this.problemsList.push(new DropdownModel(snapshot.name, snapshot.id));
      });
      this.problems = this.problemsList;
    });
  }
  newPartNameValidator() {
    const problems = this.problemsList;
    return Observable
      .of(this._utilService.containsObject(this.partName.value, problems))
      .map(result => !result ? null : { invalid: true });
  }
  checkIfPartExists(newValue) {
    this.isPresent = this._utilService.containsObject(newValue, this.problemsList);
  }

  checkIsOther(val) {
    this.isRequired = this._utilService.checkIsOther(val.selectedProblem);
    if (this.isRequired) {
      this.problemListGroup.addControl('partName',
        new FormControl('', Validators.required, this.newPartNameValidator.bind(this)
        ));
    } else {
      this.problemListGroup.removeControl('partName');
    }
    this.changeDetector.detectChanges();
  }

  get partName() {
    //noinspection TypeScriptUnresolvedFunction
    return this.problemListGroup.get('partName');
  }
}

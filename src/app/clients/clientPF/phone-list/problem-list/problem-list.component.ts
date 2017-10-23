import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ClientPFService} from '../../../clientPF/client-pf-detail.service';
import {UtilService} from '../../../../utils/util.service';
import {DropdownModel} from '../../../../model/DropdownModel';
import {ClientPF} from '../../../../model/ClientPF';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-problem-list',
  templateUrl: 'problem-list.component.html'
})
export class ProblemListComponent {
  @Input('group') problemListGroup: FormGroup;
  @Input('clientPF') clientPF: ClientPF;
  problemsList: any = [];
  problems: Array<{}>;
  selectedProblem: string;
  newPartName = '';

  private isRequired = false;
  private isPresent = false;

  constructor(private _clientPFService: ClientPFService, private _utilService: UtilService,
              private changeDetector: ChangeDetectorRef) {
    this._clientPFService.getProblemList().subscribe(problemsList => {
      problemsList.forEach(snapshot => {
        this.problemsList.push(new DropdownModel(snapshot.name, snapshot.id));
      });
      this.problems = this.problemsList;
    });
  }
  createValidator() {
      const problems = this.problemsList;
      return Observable
        .of(this._utilService.containsObject(this.partName.value, problems))
        .map(result => !result ? null : { invalid: true });
  }
  checkIfPartExists(newValue) {
    this.isPresent = this._utilService.containsObject(this.newPartName, this.problemsList);
    this._clientPFService.addNewProblem(newValue);
  }

  checkIsOther() {
    const fieldElement = <HTMLInputElement>document.getElementById('partName');
    this.problemListGroup.addControl('partName',
      new FormControl('', Validators.required, this.createValidator.bind(this)
      ));
    if (fieldElement !== null && this.isRequired) {
      this.newPartName = '';
      this.problemListGroup.removeControl('partName');
    }
    this.isRequired = this._utilService.checkIsOther(this.selectedProblem);
    this.changeDetector.detectChanges();
  }

  get partName() {
    //noinspection TypeScriptUnresolvedFunction
    return this.problemListGroup.get('partName');
  }
}

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangeDetectorRef, Component, Input} from "@angular/core";
import {ClientPFService} from "../clientPF/client-pf-detail.service";
import {Observable} from "rxjs/Observable";
import {UtilService} from "../../utils/util.service";

@Component({
  selector: 'problem-list',
  templateUrl: 'problem-list.component.html'
})
export class ProblemListComponent {
  @Input('group') problemListGroup: FormGroup;
  problemsList: any = [];
  problems: Observable<any[]>;
  selectedProblem: string = 'Sticla';
  newPartName: string = '';
  private isRequired: boolean = false;

  constructor(private _clientPFService: ClientPFService, private _utilService: UtilService, private changeDetector: ChangeDetectorRef) {
    this._clientPFService.getProblemList().subscribe(problemsList => {
      problemsList.forEach(snapshot => {
        this.problemsList.push({label: snapshot.name, value: snapshot.id})
      })
      this.problems = this.problemsList;
    });
  }
  checkIfPartExists(newValue){
    if(this._clientPFService.addNewProblem(newValue)) {
      console.log('Problema nu exista')
    }
  }
  checkIsOther() {
    var fieldElement = <HTMLInputElement>document.getElementById('partName');
    this.problemListGroup.addControl('partName',new FormControl('', [ Validators.required ]));
    if (fieldElement !== null && this.isRequired) {
      this.newPartName = '';
      this.problemListGroup.removeControl('partName');
    }
    this.isRequired = this._utilService.checkIsOther(this.selectedProblem);
    this.changeDetector.detectChanges();
  }
}

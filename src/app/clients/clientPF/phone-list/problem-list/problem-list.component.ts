import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangeDetectorRef, Component, Input} from "@angular/core";
import {ClientPFService} from "../../../clientPF/client-pf-detail.service";
import {UtilService} from "../../../../utils/util.service";
import {DropdownModel} from "../../../../model/DropdownModel";
import {ClientPF} from "../../../../model/ClientPF";

@Component({
  selector: 'problem-list',
  templateUrl: 'problem-list.component.html'
})
export class ProblemListComponent {
  @Input('group') problemListGroup:FormGroup;
  @Input('clientPF') clientPF:ClientPF;
  problemsList:any = [];
  problems:Array<{}>;
  selectedProblem:string = 'Sticla';
  newPartName:string = '';
  private isRequired:boolean = false;
  private isPresent: boolean = false;

  constructor(private _clientPFService:ClientPFService, private _utilService:UtilService, private changeDetector:ChangeDetectorRef) {
    this._clientPFService.getProblemList().subscribe(problemsList => {
      problemsList.forEach(snapshot => {
        this.problemsList.push(new DropdownModel(snapshot.name, snapshot.id));
      })
      this.problems = this.problemsList;
    });
  }

  checkIfPartExists(newValue) {
    this.isPresent = this._utilService.containsObject(newValue, this.problemsList);
    this._clientPFService.addNewProblem(newValue)
  }

  checkIsOther() {
    var fieldElement = <HTMLInputElement>document.getElementById('partName');
    this.problemListGroup.addControl('partName', new FormControl('', [Validators.required]));
    if (fieldElement !== null && this.isRequired) {
      this.newPartName = '';
      this.problemListGroup.removeControl('partName');
    }
    this.isRequired = this._utilService.checkIsOther(this.selectedProblem);
    this.changeDetector.detectChanges();
  }
}

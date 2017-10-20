

import {FormGroup} from "@angular/forms";
import {Component, Input} from "@angular/core";
import {SelectItem} from "primeng/primeng";
import {Observable} from "rxjs/Observable";
import {ClientPFService} from "../clientPF/client-pf-detail.service";
import {UtilService} from "../../utils/util.service";

@Component({
  selector: 'problem-gsm-list',
  templateUrl: 'problem-gsm-list.component.html'
})
export class ProblemGSMListComponent{
  @Input('group') problemGSMListGroup: FormGroup;
  problems: Observable<any[]>;
  problemsList: any = [];
  selectedProblem: string = 'Sticla';
  constructor(private _clientPFService: ClientPFService, private _utilService: UtilService) {
    // this._clientPFService.getProblemList().subscribe(problemsList => {
    //   problemsList.forEach(snapshot => {
    //     this.problemsList.push({label: snapshot.name, value: snapshot.id})
    //   })
    //   this.problems = this.problemsList;
    // });
  }

  checkIsOther() {
    return this._utilService.checkIsOther(this.selectedProblem);
  }
}

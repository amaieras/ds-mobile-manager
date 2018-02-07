import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UtilService} from '../../utils/util.service';
import {DropdownModel} from '../../model/DropdownModel';
import {Observable} from 'rxjs/Observable';
import {ProblemListService} from './problem-list.service';
import {ProblemPrice} from "../../model/ProblemPrice";
import {PhoneListService} from "../../clients/clientPF/phone-list/phone-list.service";


@Component({
  selector: 'app-problem-list',
  templateUrl: 'problem-list.component.html'
})
export class ProblemListComponent implements OnInit {
  @Input('group') problemListGroup: FormGroup;
  @Input('phoneGroup') phoneGroup: FormGroup;
  @Output() selectedPartName = new EventEmitter<string>();
  problemsList: any = [];
  problems: Array<{}>;
  selectedProblem = 'Sticla';
  problemsPriceList: any = [];
  isRequired = false;
  isPresent = false;

  constructor(private _problemListService: ProblemListService, private _utilService: UtilService,
              private _changeDetector: ChangeDetectorRef, private _phoneListService: PhoneListService) { }
  ngOnInit() {
    this._problemListService.getProblemList().subscribe(problemsList => {
      this.problemsList = [];
      problemsList.forEach(snapshot => {
        this.problemsList.push(new DropdownModel(snapshot.name, snapshot.name));
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
    this.setPriceForPart();
    this.selectedPartName.emit(val.selectedProblem);
    this._problemListService.getProblemPriceList().subscribe(problemsPriceList => {
      this.problemsPriceList = [];
      problemsPriceList.forEach(snapshot => {
        this.problemsPriceList.push(new ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
      });
      this.problemsPriceList = this.problemsPriceList.filter((item) => item._problemId === val.selectedProblem);
    })
    this.isRequired = this._utilService.checkIsOther(val.selectedProblem);
    if (this.isRequired) {
      this.problemListGroup.addControl('partName',
        new FormControl('', Validators.required, this.newPartNameValidator.bind(this)
        ));
    } else {
      this.problemListGroup.removeControl('partName');
    }
    if (!this._changeDetector['destroyed']) {
      this._changeDetector.detectChanges();
    }
  }
  setPriceForPart() {
    let phoneBrand = this.phoneGroup.controls['phoneBrand'].value.toLowerCase();
    let phoneModel = this.phoneGroup.controls['phoneModel'].value.toLowerCase();
    this.setPriceOnGUI(phoneBrand, phoneModel);
  }

  private setPriceOnGUI(phoneBrand: string, phoneModel: string) {
    this._phoneListService.getPartPrices().subscribe(parts => {
      this.problemsPriceList = [];
      parts.forEach(snapshot => {
        this.problemsPriceList.push(new ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
      })
      const items = this.problemsPriceList.filter(phone => {
        return phone._phoneBrand.toLowerCase() === phoneBrand
          && phone._phoneModel.toLowerCase() === phoneModel
          && phone._problemId.toLowerCase() === this.selectedProblem.toLowerCase();
      });
      if (items[0] !== undefined) {
        this.problemListGroup.controls['pricePerPart'].setValue(items[0]._price)
      } else {
        this.problemListGroup.controls['pricePerPart'].setValue(0);
      }
    })
  }

  get partName() {
    //noinspection TypeScriptUnresolvedFunction
    return this.problemListGroup.get('partName');
  }
  get phoneBrand() {
    //noinspection TypeScriptUnresolvedFunction
    return this.phoneGroup.get('phoneBrand');
  }
}

import {Component, Input, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SelectItem} from "primeng/primeng";
import {PhoneListService} from "../../clientPF/phone-list/phone-list.service";
import {ProblemPrice} from "../../../model/ProblemPrice";

@Component({
  selector: 'phone-gsm-list',
  templateUrl: 'phone-gsm-list.component.html'
})
export class PhoneGSMListComponent implements OnInit {
  @Input('group') phoneListGroup: FormGroup;
  newItem: any;
  mainArray: Array<any>;
  selectedModel: SelectItem;
  isRequiredModel: boolean = false;
  isRequired: boolean = false;
  phoneModelsArray: any = [];
  phoneBrandsArray: any = [];
  problemsPriceList: any = [];
  constructor(private fb: FormBuilder, private _phoneListService: PhoneListService) {
    this.mainArray = [];
  }

  ngOnInit() {
    this.newItem = {
      phoneId: 1,
      modelId: 1
    }
    this.mainArray.push((this.newItem));
    this.addProblem();
    this.populateAllDropDowns();
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

  onSelect(event) {

  }

  onModelSelect(event) {

  }
  private initProblem() {
    return this.fb.group({
      problem:'',
      pricePerPart: '',
      partName: ''
    })
  }
  private populateAllDropDowns() {
    this._phoneListService.getBrandList().subscribe(phoneModels => {
      this.phoneBrandsArray = [];
      phoneModels.forEach(snapshot => {
        this.phoneBrandsArray.push({label: snapshot.name, value: snapshot.name});
      });
    });
    this._phoneListService.getModelList().subscribe(phoneBrands => {
      this.phoneModelsArray = [];
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.name, phoneId: snapshot.phoneId});
        this.phoneBrandsArray = this.phoneModelsArray;
      });
      this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === "iphone" || item.phoneId === 'altele');
    });
    this._phoneListService.getPartPrices().subscribe(parts => {
      this.problemsPriceList = [];
      parts.forEach(snapshot => {
        this.problemsPriceList.push(new ProblemPrice(snapshot.problemId, snapshot.phoneBrand, snapshot.phoneModel, snapshot.price));
      })
    })
  }

}

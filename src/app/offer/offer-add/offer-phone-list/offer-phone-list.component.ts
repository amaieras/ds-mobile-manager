import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {PhoneListService} from "../../../clients/clientPF/phone-list/phone-list.service";
import {ProblemPrice} from "app/model/ProblemPrice";


@Component({
  selector: 'app-offer-phone-list',
  templateUrl: 'offer-phone-list.component.html'
})
export class OfferPhoneListComponent implements OnInit {
  @Input('group') phoneListGroup: FormGroup;
  @Output('change') phoneItem = new EventEmitter<any>();

  selectedModel = 'iPhone 7 Plus';
  selectedBrand = 'Iphone';
  newItem: any;
  mainArray: Array<any> = [];
  phoneBrandsArray: any = [];
  phoneModelsArray: any = [];
  modelsArray: any = [];
  problemsPriceList: any = [];
  constructor(private _phoneListService: PhoneListService) { }

  ngOnInit() {
    this.populateAllDropDowns();
    this.initBrandModelList();
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
        this.modelsArray = this.phoneModelsArray;
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

  private initBrandModelList() {
    this.newItem = {
      phoneId: "iphone",
      modelId: "iPhone 7 Plus"
    };
    this.mainArray.push(this.newItem);
  }
}

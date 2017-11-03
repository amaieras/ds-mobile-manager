import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import {UtilService} from '../../utils/util.service';
import {isValidPhoneNumber} from '../../shared/phone-validator.directive';
import {ClientPF} from '../../model/ClientPF';
import {ClientPFService} from './client-pf-detail.service';
import {PhoneList} from '../../model/PhoneList';
import {ProblemListService} from './phone-list/problem-list/problem-list.service';
import {AboutUsService} from './phone-list/about-us/about-us.service';
import {Observable} from 'rxjs/Observable';
import {DropdownModel} from 'app/model/DropdownModel';
import {PhoneListService} from 'app/clients/clientPF/phone-list/phone-list.service';
import {PrintReceiptComponent} from "../../print/print-receipt.component";


@Component({
  selector: 'app-client-pf-detail',
  templateUrl: './client-pf-detail.component.html',
})
export class ClientPfDetailComponent implements OnInit {
  clientPF: ClientPF = new ClientPF();
  msgs: Message[] = [];
  tests: SelectItem[];
  clientPFForm: FormGroup;
  defaultDate: Date = new Date();
  saveClientPF: ClientPF = new ClientPF();
  phoneList: FormGroup;
  newItem: any;
  mainArray: Array<any>;
  newPrblMaxId: string;
  newBrandMaxId: string;
  newModelMaxId: string;
  newAboutUsMaxId: string;
  partPricesMaxId: string;
  isOtherRequired = false;
  aboutUsValExists = false;
  aboutUsList: any = [];
  selectedAboutUs = 'FACEBOOK';
  selectedOtherName = '';
  totalPrice = 0;
  @ViewChild(PrintReceiptComponent ) child: PrintReceiptComponent;

  constructor(private _clientPFService: ClientPFService, private fb: FormBuilder,
              private _utilService: UtilService, private _problemListService: ProblemListService,
              private _aboutUsService: AboutUsService, private _phoneListService: PhoneListService) {
    this.tests = [];
    this.mainArray = [];
    this.tests.push({label: 'NU', value: 'NU'});
    this.tests.push({label: 'DA', value: 'DA'});
  }

  ngOnInit(): void {
    this.populateDropDowns();
    this.defaultDate.setHours(12, 0);
    this.clientPFForm = this.fb.group({
      'lastname': new FormControl('', [
        // Validators.required
      ]),
      'firstname': new FormControl('', [
        // Validators.required
      ]),
      'email': new FormControl('', []),
      'firm': new FormControl('', []),
      'phone': new FormControl('', [
        Validators.required,
        isValidPhoneNumber
      ]),
      phoneList: this.fb.array([]),
      'tested': new FormControl('', []),
      'priceOffer': new FormControl({value: 0, disabled: true}),
      'appointment': new FormControl('', []),
      'aboutUs': new FormControl('FACEBOOK', [])
    });
    this.aboutUsList.push({label: 'Altele', value: 'Altele'});
    this.initForm();
  }
  onSubmit(event: Event) {
    this.prepareSavePhoneList();
    this.clientPF = this.saveClientPF;
    this.clientPF.appointmentDate = this.defaultDate.getTime().toString();
    this.clientPF.addedDate = new Date().getTime().toString();
    this.checkInputForNullOrUndefined();
    this._clientPFService.addPFClient(this.clientPF);
    this.clientPF = new ClientPF();
    this.clientPFForm.controls['phoneList'] = this.fb.array([]);
    this.successMessage();
    this.clientPFForm.reset();
    this.ngOnInit();
    this.getMaxIds();
  }
  calculateTotalPrice() {
    const formModel = this.clientPFForm.value;
    let totalPrice = 0;
    for (let i = 0; i < formModel.phoneList.length; i++) {
      for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
        const item = formModel.phoneList[i].problems[j];
        if (item.pricePerPart !== '') {
          totalPrice = totalPrice + item.pricePerPart;
        }
      }
    }
    this.totalPrice = totalPrice;
  }

  prepareSavePhoneList() {
    const formModel = this.clientPFForm.value;
    const PhoneListDeepCopy: PhoneList[] = formModel.phoneList.map(
      (phoneList: PhoneList) => Object.assign({}, phoneList)
    );

    this.addNewPartPrice(formModel);
    this.addNewProblemSynced(formModel);
    this.addNewBrandModelSynced(formModel);
    this.addNewSingleModelSynced(formModel);
    if (this._utilService.isNullOrUndefined(this.newAboutUsMaxId) && this.selectedOtherName !== '') {
      this._aboutUsService.addNewAboutUs(this.newAboutUsMaxId + 1, this.selectedOtherName);
    }
    this.saveClientPF.phoneList = PhoneListDeepCopy;
    this.saveClientPF.phone = formModel.phone;
    this.saveClientPF.aboutUs = formModel.aboutUs;
    this.saveClientPF.priceOffer = this.totalPrice === null ? '0' : this.totalPrice.toString() ;
  }

  addInPhoneList(): any {
    const phoneListArray = <FormArray>this.clientPFForm.controls['phoneList'];
    const newPhone = this.initPhoneList();
    phoneListArray.push(newPhone);
  }

  removeFromPhoneList(idx: number) {
    const phoneListArray = <FormArray>this.clientPFForm.controls['phoneList'];
    phoneListArray.removeAt(idx);
  }

  private addNewProblemSynced(formModel: any) {
    //used to increment part id when new part is added based on how many phone and problem components are present
    let incrVal = 0;
    for (let i = 0; i < formModel.phoneList.length; i++) {
      for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
        const item = formModel.phoneList[i].problems[j];
        if (item.partName !== '' && this._utilService.isNullOrUndefined(item.partName)) {
          incrVal++;
          item.problem = parseInt(this.newPrblMaxId) + incrVal;
          this._problemListService.addNewProblem(item.problem, item.partName);
        }
      }
    }
  }

  private addNewPartPrice(formModel: any) {
    for (let i = 0; i < formModel.phoneList.length; i++) {
      for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
        const phoneItem = formModel.phoneList[i];
        const problemItem = formModel.phoneList[i].problems[j];
        if (phoneItem.phoneBrand.toString() === '0' || phoneItem.phoneModel.toString() === '0' || problemItem.problem.toString() === '0') {
          phoneItem.phoneBrand = phoneItem.phoneBrand === 0 ? this.newBrandMaxId + 1 : phoneItem.phoneBrand;
          phoneItem.phoneModel = parseInt(phoneItem.phoneModel) === 0 ? this.newModelMaxId + 1 : phoneItem.phoneModel;
          problemItem.problem = problemItem.problem === 0 ? this.newPrblMaxId + 1 : problemItem.problem;
          this._clientPFService.addNewPartPrice(this.partPricesMaxId + 1, phoneItem.phoneBrand, parseInt(phoneItem.phoneModel), problemItem.pricePerPart, problemItem.problem)
        }
      }
    }
  }

  private addNewBrandModelSynced(formModel: any) {
    let incrVal = 0;
    for (let i = 0; i < formModel.phoneList.length; i++) {
        const item = formModel.phoneList[i];
        if (item.newBrand !== '' && this._utilService.isNullOrUndefined(item.newBrand)
          && item.newModel !== '' && this._utilService.isNullOrUndefined(item.newModel)) {
          incrVal++;
          const brandMaxId = parseInt(this.newBrandMaxId) + incrVal;
          const modelMaxId = parseInt(this.newModelMaxId) + incrVal;
          this._phoneListService.addNewBrand(brandMaxId, item.newBrand);
          this._phoneListService.addNewModel(modelMaxId, item.newModel, brandMaxId);
        }
    }
  }

  private addNewSingleModelSynced(formModel: any){
    let incrVal = 0;
    for (let i = 0; i < formModel.phoneList.length; i++) {
      const item = formModel.phoneList[i];
      if (item.newSingleModel !== '' && this._utilService.isNullOrUndefined(item.newSingleModel)) {
        incrVal++;
        const brandId = item.phoneBrand;
        const modelMaxId = parseInt(this.newModelMaxId) + incrVal;
        this._phoneListService.addNewModel(modelMaxId, item.newSingleModel, brandId);
      }
    }

  }
  initPhoneList() {
    return this.fb.group({
      phoneBrand: '',
      phoneModel: '',
      phoneColor: '',
      imei: '',
      problems: this.fb.array([]),
      observation: ''
    });
  }

  getPhoneItem(val) {
    this.newItem = {
      phoneId: val.phoneId,
      modelId: val.modelId
    };
    this.mainArray.push(this.newItem);
  }

  initForm() {
    this.priceOffer.setValue(0);
    this.addInPhoneList();
    this.getMaxIds();
  }

  private populateDropDowns() {
    this._aboutUsService.getAboutUsList().subscribe(aboutUsList => {
      this.aboutUsList = [];
      aboutUsList.forEach(snapshot => {
        this.aboutUsList.push(new DropdownModel(snapshot.name, snapshot.id));
      });
    });
  }

  private getMaxIds() {
    this._problemListService.getMaxIdFromProblems().subscribe(partItem => {
      this.newPrblMaxId = partItem;
    });
    this._aboutUsService.getMaxIdFromAboutUs().subscribe(aboutUsItem => {
      this.newAboutUsMaxId = aboutUsItem;
      this.resetAboutAs();
    });
    this._phoneListService.getMaxIdFromBrands().subscribe(brandMaxId => {
      this.newBrandMaxId = brandMaxId;
    });
    this._phoneListService.getMaxIdFromModels().subscribe(modelMaxId => {
      this.newModelMaxId = modelMaxId;
    });
    this._clientPFService.getMaxIdFromPartsList().subscribe(partPriceMaxId => {
      this.partPricesMaxId = partPriceMaxId;
    });
  }

  private checkInputForNullOrUndefined() {
    if (!this._utilService.isNullOrUndefined(this.clientPF.imei)) {
      this.clientPF.imei = null;
    }
    if (!this._utilService.isNullOrUndefined(this.clientPF.firm)) {
      this.clientPF.firm = null;
    }
    if (!this._utilService.isNullOrUndefined(this.clientPF.email)) {
      this.clientPF.email = null;
    }
    if (!this._utilService.isNullOrUndefined(this.clientPF.firstname)) {
      this.clientPF.firstname = null;
    }
    if (!this._utilService.isNullOrUndefined(this.clientPF.lastname)) {
      this.clientPF.lastname = null;
    }
  }


  private resetAboutAs() {
    if (this.selectedAboutUs !== '1'){
      this.selectedAboutUs = '1';
    }
    this.clientPFForm.removeControl('aboutAsName');
    this.isOtherRequired = false;
  }

  aboutUsNameValidator() {
    const aboutUs = this.aboutUsList;
    return Observable
      .of(this._utilService.containsObject(this.selectedOtherName, aboutUs))
      .map(result => !result ? null : { invalid: true });
  }

  checkIsOther(val) {
    this.isOtherRequired = this._utilService.checkIsOther(val.value);
    if (this.isOtherRequired) {
      this.clientPFForm.addControl('aboutAsName',
        new FormControl('', Validators.required, this.aboutUsNameValidator.bind(this)
        ));
    } else {
      this.clientPFForm.removeControl('aboutAsName');
    }
  }
  checkIfAboutUsExists(newValue) {
    if (this._utilService.isNullOrUndefined(newValue)) {
      this.aboutUsValExists = this._utilService.containsObject(newValue, this.aboutUsList);
    }
  }
  print() {
    this.child.print();
  }

  successMessage() {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Adauga Client PF', detail: 'Client adaugat cu success.'});
  }

  get lastname() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('lastname');
  }

  get firstname() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('firstname');
  }

  get email() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('email');
  }

  get firm() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('firm');
  }

  get phone() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('phone');
  }

  get tested() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('tested');
  }

  get priceOffer() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('priceOffer');
  }

  get appointment() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('appointment');
  }

  get aboutUs() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('aboutUs');
  }

  get aboutAsName() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('aboutAsName');
  }
}


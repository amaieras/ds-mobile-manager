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
import {PhoneListService} from 'app/clients/clientPF/phone-list/phone-list.service';
import {PrintReceiptComponent} from "../../shared/print/print-receipt.component";
import {WarrantyInfo} from "../../model/WarrantyInfo";

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
  phoneItem: FormGroup;
  mainArray: Array<any>;
  isOtherRequired = false;
  aboutUsValExists = false;
  aboutUsList: any = [];
  selectedAboutUs = '';
  selectedOtherName = '';
  totalPrice = 0;
  noOfClients: number = 0;
  existingPartPrices = [];
  warrantyInfo: WarrantyInfo;

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

    this._clientPFService.getAllClients().subscribe( client => {
      this.noOfClients = client.length;
    })
    this.populateDropDowns();
    this.clientPF.tested = this.saveClientPF.tested;
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
      'tested': new FormControl('NU', []),
      'priceOffer': new FormControl({value: 0, disabled: true}),
      'appointment': new FormControl(this.defaultDate.getTime().toString(), []),
      'aboutUs': new FormControl('FACEBOOK', [])
    });
    this.initForm();
  }
  onSubmit(event: Event) {
    this.prepareSavePhoneList();
    this.clientPF = this.saveClientPF;
    this.checkInputForNullOrUndefined();
    this._clientPFService.addPFClient(this.clientPF);
    this.resetAfterSubumit();
    this.successMessage();
  }

  private resetAfterSubumit() {
    this.clientPF = new ClientPF();
    this.clientPFForm.controls['phoneList'] = this.fb.array([]);
    this.clientPFForm.reset();
    this.ngOnInit();
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
    if (this.selectedOtherName !== '') {
      this._aboutUsService.addNewAboutUs(this.selectedOtherName);
    }
    this.saveClientPF.addedDate = new Date().getTime().toString();
    this.saveClientPF.phoneList = PhoneListDeepCopy;
    this.removeCtrlForNewItems();
    this.addNewBrandModelSynced(formModel);
    this.addNewSingleModelSynced(formModel);
    this.saveClientPF.phone = formModel.phone;
    this.saveClientPF.tested = formModel.tested;
    this.saveClientPF.aboutUs = this.selectedOtherName !== '' ? this.selectedOtherName : formModel.aboutUs;
    this.saveClientPF.priceOffer = this.totalPrice === null ? '0' : this.totalPrice.toString() ;
    this.saveClientPF.appointmentDate = this.defaultDate.getTime().toString();
  }

  private removeCtrlForNewItems() {
    this.saveClientPF.phoneList.forEach(phone => {
      phone.problems.forEach(problem => {
        if (problem.partName !== undefined) {
          problem.problem = problem.partName;
          delete problem.partName;
        }
      })
      if (phone.newBrand !== undefined) {
        phone.phoneBrand = phone.newBrand
        delete phone.newBrand;
      }
      if (phone.newModel !== undefined) {
        phone.phoneModel = phone.newModel;
        delete phone.newModel;
      }
      if (phone.newSingleModel !== undefined) {
        phone.phoneModel = phone.newSingleModel;
        delete phone.newSingleModel;
      }
    });
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

  /**
   * Add a new problem to be listed in problems dropdown
   * @param formModel
   */
  private addNewProblemSynced(formModel: any) {
    for (let i = 0; i < formModel.phoneList.length; i++) {
      for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
        const item = formModel.phoneList[i].problems[j];
        if (item.partName !== undefined) {
          this._problemListService.addNewProblem(item.partName);
        }
      }
    }
  }

  /**
   * When the selected problem is 'Altele' this method will add new price for that problem given the selected phoneBrand + phoneModel
   * When the selected problem is not 'Altele' this method will update the price for the selected phoneBrand + phoneModel + problem
   * @param formModel
   */
  private addNewPartPrice(formModel: any) {
    this._clientPFService.getPartPrices().take(1).subscribe(part => {
      for (let i = 0; i < formModel.phoneList.length; i++) {
        for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
          const phoneItem = formModel.phoneList[i];
          const problemItem = formModel.phoneList[i].problems[j];
          let phoneProblem = problemItem.partName === undefined || problemItem.partName === 'Altele' ? problemItem.problem.toLowerCase() : problemItem.partName.toLowerCase();
          this.existingPartPrices = part.filter(item => item.phoneBrand.toLowerCase() === phoneItem.phoneBrand.toLowerCase()
                                                     && item.phoneModel.toLowerCase() === phoneItem.phoneModel.toLowerCase()
                                                     && item.problemId.toLowerCase() === phoneProblem);
          if (this.existingPartPrices.length > 0) {
            this._clientPFService.updateItem(this.existingPartPrices[0].$key, problemItem.pricePerPart)
          }
          else {
            let phoneBrand = phoneItem.phoneBrand.toLowerCase() === 'altele' ? phoneItem.newBrand.toLowerCase() : phoneItem.phoneBrand.toLowerCase();
            let phoneModel = phoneItem.phoneModel.toLowerCase();
            if (phoneItem.phoneModel.toLowerCase() === 'altele') {
              phoneModel = this._utilService.isNullOrUndefined(phoneItem.newSingleModel) ?  phoneItem.newSingleModel : phoneItem.newModel;
            }
            this._clientPFService.addNewPartPrice(phoneBrand, phoneModel, +problemItem.pricePerPart, phoneProblem)
          }
        }
      }
    })

  }

  private addNewBrandModelSynced(formModel: any) {
    for (let i = 0; i < formModel.phoneList.length; i++) {
        const item = formModel.phoneList[i];
        if (item.newBrand !== '' && this._utilService.isNullOrUndefined(item.newBrand)
          && item.newModel !== '' && this._utilService.isNullOrUndefined(item.newModel)) {
          this._phoneListService.addNewBrand(item.newBrand);
          this._phoneListService.addNewModel(item.newModel, item.newBrand.toLowerCase());
        }
    }
  }

  private addNewSingleModelSynced(formModel: any){
    for (let i = 0; i < formModel.phoneList.length; i++) {
      const item = formModel.phoneList[i];
      if (item.newSingleModel !== '' && this._utilService.isNullOrUndefined(item.newSingleModel)) {
        const brandId = item.phoneBrand.toLowerCase();
        this._phoneListService.addNewModel(item.newSingleModel, brandId);
      }
    }
  }
  initPhoneList() {
    return this.fb.group({
      phoneBrand: '',
      phoneModel: '',
      phoneColor: '',
      problems: this.fb.array([]),
      observation: '',
      phoneCode: new FormControl('', [
            Validators.required
          ]),
      imei: new FormControl('', [
        Validators.maxLength(15),
        // imeiValidator(/^\d+$/i)
      ])
    });
  }

  getPhoneItem(val) {
    this.phoneItem = val;
    console.log()
  }

  initForm() {
    this.priceOffer.setValue(0);
    this.addInPhoneList();
    this.resetAboutAs();
  }

  private populateDropDowns() {
    this._aboutUsService.getAboutUsList().subscribe(aboutUsList => {
      this.aboutUsList = [];
      aboutUsList.forEach(snapshot => {
        this.aboutUsList.push({label: snapshot.name, value: snapshot.name});
      });
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
    if (this.selectedAboutUs !== 'FACEBOOK'){
      this.selectedAboutUs = 'FACEBOOK';
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
    this.clientPFForm.patchValue({appointment: this.defaultDate.getTime().toString()});
    let event: Event;
    // this.onSubmit(event);
    const formModel = this.clientPFForm.value;
    // this.warrantyInfo.brandName = formModel.phoneList[0].phoneBrand;
    // this.warrantyInfo.modelName = formModel.phoneList[0].phoneModel;
    let problems = [];
    formModel.phoneList[0].problems.forEach(prbl=> {
      let problemName = prbl.problem.toLowerCase() === 'altele' ? prbl.partName : prbl.problem;
      problems.push(problemName);
      this.warrantyInfo = new WarrantyInfo(formModel.lastname,
        formModel.firstname, formModel.phone, this.totalPrice, formModel.phoneList[0].phoneColor, formModel.phoneList[0].imei, '', '',
        formModel.phoneList[0].observation, formModel.tested, formModel.aboutUs, problems, formModel.appointment, formModel.phoneList[0].phoneCode,
        this.noOfClients)
    })
    this.child.print(this.warrantyInfo);
  }

  searchClient(clientLastName) {
    let q = clientLastName.target.value;
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

  get isRepaired(){
    return this.clientPFForm.get('isRepaired');
  }

  get deliveredDate(){
    return this.clientPFForm.get('deliveredDate');
  }
  get phoneCode(){
    return this.clientPFForm.get('phoneCode');
  }
}


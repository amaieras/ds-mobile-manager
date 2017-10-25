import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import {UtilService} from '../../utils/util.service';
import {isValidPhoneNumber} from '../../shared/phone-validator.directive';
import {ClientPF} from '../../model/ClientPF';
import {ClientPFService} from './client-pf-detail.service';
import {PhoneList} from '../../model/PhoneList';
import {ProblemListService} from './phone-list/problem-list/problem-list.service';
import {AboutUsService} from "./phone-list/about-us/about-us.service";
import {Observable} from "rxjs/Observable";
import {DropdownModel} from 'app/model/DropdownModel';


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
  newAboutUsMaxId: string;
  isOtherRequired = false;
  aboutUsValExists = false;
  aboutUsList: any = [];
  selectedAboutUs = '1';
  selectedOtherName = '';
  constructor(private _clientPFService: ClientPFService, private fb: FormBuilder,
              private _utilService: UtilService, private _problemListService: ProblemListService,
              private _aboutUsService: AboutUsService) {
    this.tests = [];
    this.mainArray = [];
    this.tests.push({label: 'NU', value: 'NU'});
    this.tests.push({label: 'DA', value: 'DA'});
  }

  ngOnInit(): void {
    this._aboutUsService.getAboutUsList().subscribe(aboutUsList => {
      this.aboutUsList = [];
      aboutUsList.forEach(snapshot => {
        this.aboutUsList.push(new DropdownModel(snapshot.name, snapshot.id));
      });
    });
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
      'priceOffer': new FormControl({value: '0', disabled: true}),
      'appointment': new FormControl('', []),
      'aboutUs': new FormControl('FACEBOOK', [])
    });
    this.aboutUsList.push({label: 'Altele', value: 'Altele'});
    this.initFormAfterSubmit();
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

  onSubmit(event: Event) {
    this.prepareSavePhoneList();
    this.clientPF = this.saveClientPF;
    this.clientPF.appointmentDate = this.defaultDate.getTime().toString();
    this.clientPF.addedDate = new Date().getTime().toString();
    event.preventDefault();
    this.checkInputForNullOrUndefined();
    this._clientPFService.addPFClient(this.clientPF);
    this.clientPF = new ClientPF();
    this.clientPFForm.controls['phoneList'] = this.fb.array([]);
    this.successMessage();
    this.clientPFForm.reset();
    this.ngOnInit();
    this._problemListService.getMaxIdFromProblems().subscribe(partItem => {
      this.newPrblMaxId = partItem;
    });
    this._aboutUsService.getMaxIdFromAboutUs().subscribe(aboutUsItem => {
      this.newAboutUsMaxId = aboutUsItem;
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
  initFormAfterSubmit() {
    this.priceOffer.setValue(0);
    this.addInPhoneList();
    // this.prepareSavePhoneList();
    this._problemListService.getMaxIdFromProblems().subscribe(partItem => {
      this.newPrblMaxId = partItem;
    });
    this._aboutUsService.getMaxIdFromAboutUs().subscribe(aboutUsItem => {
      this.newAboutUsMaxId = aboutUsItem;
    });
    this.resetAboutAs();

  }

  private resetAboutAs() {
    this.selectedAboutUs = '1';
    this.clientPFForm.removeControl('aboutAsName');
    this.isOtherRequired = false;
  }

  prepareSavePhoneList() {
    const formModel = this.clientPFForm.value;
    const PhoneListDeepCopy: PhoneList[] = formModel.phoneList.map(
      (phoneList: PhoneList) => Object.assign({}, phoneList)
    );
    this.addNewProblemSynced(formModel);
    if(this._utilService.isNullOrUndefined(this.newAboutUsMaxId)) {
      this._aboutUsService.addNewAboutUs(this.newAboutUsMaxId + 1, this.selectedOtherName)
    }
    this.saveClientPF.phoneList = PhoneListDeepCopy;
    this.saveClientPF.phone = formModel.phone;
    this.saveClientPF.aboutUs = formModel.aboutUs;
  }

  private addNewProblemSynced(formModel: any) {
    //used to increment part id when new part is added
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
  otherAboutUsNameValidator() {
    const aboutus = this.aboutUsList;
    return Observable
      .of(this._utilService.containsObject(this.selectedOtherName, aboutus))
      .map(result => !result ? null : { invalid: true });
  }

  checkIsOther(val) {
    this.isOtherRequired = this._utilService.checkIsOther(val.value);
    if (this.isOtherRequired) {
      this.clientPFForm.addControl('aboutAsName',
        new FormControl('', Validators.required, this.otherAboutUsNameValidator.bind(this)
        ));
    } else {
      this.clientPFForm.removeControl('aboutAsName');
    }
    // this.clientPFForm.detectChanges();
  }
  checkIfAboutUsExists(newValue) {
    if(this._utilService.isNullOrUndefined(newValue)) {
      this.aboutUsValExists = this._utilService.containsObject(newValue, this.aboutUsList);
    }
  }
  getPhoneItem(val) {
    this.newItem = {
      phoneId: val.phoneId,
      modelId: val.modelId
    };
    this.mainArray.push(this.newItem);
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
}

import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientPF, ClientPFService, PhoneList} from "./client-pf-detail.service";
import { Message, SelectItem } from "primeng/primeng";
import {UtilService} from "../../utils/util.service";
import {isOkPhoneFormat} from "../../shared/phone-validator.directive";
import {isUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {PhoneBrand} from 'app/clients/phone-models/PhoneBrand';
import {PhoneModel} from "../phone-models/PhoneModel";
import {PhoneModelService} from "../phone-models/phone-model.service";


@Component({
  selector: 'client-pf-detail',
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
  aboutUsList: SelectItem[];
  problem: string = 'Sticla';
  newItem: any;
  mainArray: Array<any>;

  constructor( private _clientPFService: ClientPFService, private fb: FormBuilder, private _utilService: UtilService) {
    this.tests = [];
    this.aboutUsList = [];
    this.mainArray = [];
    this.aboutUsList.push({label:'FACEBOOK', value: 'FACEBOOK' });
    this.aboutUsList.push({label:'GOOGLE', value: 'GOOGLE' });
    this.aboutUsList.push({label:'OLX', value: 'OLX' });
    this.aboutUsList.push({label:'RECOMANDARE', value: 'RECOMANDARE' });
    this.aboutUsList.push({label:'Altele', value: 'Altele' });

    this.tests.push({label:'-', value: '-' });
    this.tests.push({label:'DA', value: 'DA' });
    this.tests.push({label:'NU', value: 'NU' });

  }

  ngOnInit(): void {
    this.defaultDate.setHours(12,0);
    this.saveClientPF.tested = '-';
    this.clientPFForm = this.fb.group({
      'lastname': new FormControl('', [
          // Validators.required
        ]),
      'firstname': new FormControl('', [
          // Validators.required
        ]),
      'email': new FormControl('', [ ]),
      'firm': new FormControl('', [ ]),
      'phone': new FormControl('', [
          Validators.required,
          isOkPhoneFormat
        ]),
      phoneList: this.fb.array([
      ]),
      'tested': new FormControl('', [ ]),
      'imei': new FormControl('', []),
      'priceOffer': new FormControl('', [
          Validators.required
        ]),
      'appointment': new FormControl('', []),
      'aboutUs': new FormControl('FACEBOOK', [ ])
    })
    this.addInPhoneList();

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
    if (!this._utilService.check(this.clientPF.imei)) {
      this.clientPF.imei = null;
    }
    if (!this._utilService.check(this.clientPF.firm)) {
      this.clientPF.firm = null;
    }
    if (!this._utilService.check(this.clientPF.email)) {
      this.clientPF.email = null;
    }
    if(!this._utilService.check(this.clientPF.firstname)) {
      this.clientPF.firstname = null;
    }
    if(!this._utilService.check(this.clientPF.lastname)) {
      this.clientPF.lastname = null;
    }
    this._clientPFService.addPFClient(this.clientPF);
    this.clientPFForm.reset();
    this.clientPF = new ClientPF();
    this.clientPFForm.controls['phoneList'] = this.fb.array([]);
    this.successMessage();
  }

  initPhoneList() {
    return this.fb.group({
      phoneBrand: '',
      phoneModel: '',
      phoneColor: '',
      phoneQuantity: '',
      problems: this.fb.array([]),
      observation: ''
    })
  }
  prepareSavePhoneList(){
    const formModel = this.clientPFForm.value;
    const PhoneListDeepCopy: PhoneList[] = formModel.phoneList.map(
      (phoneList: PhoneList) => Object.assign({}, phoneList)
    );
    formModel.phoneList.forEach(item => {
    item.problems.forEach( snapshot => {
      if (snapshot.partName != '') {
        this._clientPFService.addNewProblem(snapshot);
      }
    })
  })
    this.saveClientPF.phoneList = PhoneListDeepCopy;
    this.saveClientPF.phone = formModel.phone;
    this.saveClientPF.aboutUs = formModel.aboutUs;
}
  getPhoneItem(val){
    this.newItem = {
      phoneId: val.phoneId,
      modelId: val.modelId
    }
    this.mainArray.push(this.newItem)
  }
  successMessage() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Adauga Client PF', detail:'Client adaugat cu success.'});
  }

  get lastname() { return this.clientPFForm.get('lastname'); }
  get firstname() { return this.clientPFForm.get('firstname'); }
  get email() { return this.clientPFForm.get('email'); }
  get firm() { return this.clientPFForm.get('firm'); }
  get phone() { return this.clientPFForm.get('phone'); }
  get tested() { return this.clientPFForm.get('tested'); }
  get imei() { return this.clientPFForm.get('imei'); }
  get priceOffer() { return this.clientPFForm.get('priceOffer'); }
  get appointment() { return this.clientPFForm.get('appointment'); }
  get aboutUs() { return this.clientPFForm.get('aboutUs'); }
}

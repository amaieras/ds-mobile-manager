import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientPF, ClientPFService, PhoneList} from "./client-pf-detail.service";
import { Message, SelectItem } from "primeng/primeng";
import {UtilService} from "../../utils/util.service";
import {isUndefined} from "util";

@Component({
  selector: 'client-pf-detail',
  templateUrl: './client-pf-detail.component.html',
})
export class ClientPfDetailComponent implements OnInit{
  clientPF: ClientPF = new ClientPF();
  msgs: Message[] = [];
  problems: SelectItem[];
  tests: SelectItem[];
  clientPFForm: FormGroup;
  defaultDate: Date = new Date();
  saveClientPF: ClientPF = new ClientPF();
  mainArray: Array<any>;
  newItem: any;

  constructor( private clientPFService: ClientPFService, private fb: FormBuilder, private utilService: UtilService) {
    this.problems = [];
    this.tests = [];
    this.mainArray = [];
    this.problems.push({label:'Sticla', value: 'Sticla' });
    this.problems.push({label:'Display', value: 'Display' });
    this.problems.push({label:'Altele', value: 'Altele' });

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
          Validators.required
        ]),
      'phoneList': this.fb.array([]),
      'tested': new FormControl('', [ ]),
      'imei': new FormControl('', []),
      'priceOffer': new FormControl('', [
          Validators.required
        ]),
      'appointment': new FormControl('', []),
      'aboutUs': new FormControl('', [
          Validators.required
        ])
    })
    this.phoneList.push(this.fb.group(new PhoneList()));
    this.newItem = {
      phoneId: 1,
      modelId: 1
    }
    this.mainArray.push((this.newItem));
  }
  onSubmit(event: Event) {
    this.prepareSavePhoneList();
    this.clientPF = this.saveClientPF;
    this.clientPF.appointmentDate = this.defaultDate.getTime().toString();
    this.clientPF.addedDate = new Date().getTime().toString();
    event.preventDefault();
    if (!this.utilService.check(this.clientPF.imei)) {
      this.clientPF.imei = null;
    }
    if (!this.utilService.check(this.clientPF.firm)) {
      this.clientPF.firm = null;
    }
    if (!this.utilService.check(this.clientPF.email)) {
      this.clientPF.email = null;
    }
    if(!this.utilService.check(this.clientPF.firstname)) {
      this.clientPF.firstname = null;
    }
    if(!this.utilService.check(this.clientPF.lastname)) {
      this.clientPF.lastname = null;
    }
    this.clientPFService.addPFClient(this.clientPF);
    this.clientPFForm.reset();
    this.clientPF = new ClientPF();
    this.clientPFForm.controls['phoneList'] = this.fb.array([]);

    this.mainArray = [];
    this.successMessage();
  }
  addPhoneInPhoneList() {
      this.phoneList.push(this.fb.group(new PhoneList()));
      let obj = {
        phoneId: 1,
        modelId: 1
      }
      this.newItem = obj;
      this.mainArray.push(this.newItem);
  }
  prepareSavePhoneList(){
    const formModel = this.clientPFForm.value;
    const PhoneListDeepCopy: PhoneList[] = formModel.phoneList.map(
      (phoneList: PhoneList) => Object.assign({}, phoneList)
    );
    this.saveClientPF.phoneList = PhoneListDeepCopy;
    this.mainArray.forEach((item, index) => {
      if (isUndefined(this.saveClientPF.phoneList[index])) {
        this.saveClientPF.phoneList[index] = {phoneModel:'1',phoneBrand:'2',problem:'Sticla',phoneColor:'',pricePerPart:0,phoneQuantity:1,observation:''}
      }
      this.saveClientPF.phoneList[index].phoneBrand = item.phoneId;
      this.saveClientPF.phoneList[index].phoneModel = item.modelId;
    })
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
  get phoneList(): FormArray {
    return this.clientPFForm.get('phoneList') as FormArray;
  }
}

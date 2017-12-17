

import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from "@angular/forms";
import {PhoneList} from "../../model/PhoneList";
import {ClientGSMDisplay} from "../../model/ClientGSMDisplay";
import {ClientGSMDisplayService} from "./client-gsm-display-detail.service";
import {Message} from "primeng/primeng";


@Component({
  selector: 'app-client-gsm-display',
  templateUrl: './client-gsm-display.component.html'
})

export class ClientGSMDisplayComponent implements OnInit {
  msgs: Message[] = [];
  clientGSMDisplayForm: FormGroup;
  clientGSMDisplay: ClientGSMDisplay = new ClientGSMDisplay();
  saveclientGSMDisplay: ClientGSMDisplay = new ClientGSMDisplay();
  totalPrice = 0;

  constructor( private fb: FormBuilder, private _clientGSMDisplayService: ClientGSMDisplayService) {
  }

  ngOnInit(){
    this.clientGSMDisplayForm = new FormGroup({
      'lastname': new FormControl('', [
        Validators.required
      ]),
      'phone': new FormControl('', [
        Validators.required
      ]),
      'priceOffer': new FormControl({value: 0, disabled: true}),
      phoneList: this.fb.array([ ]),
      'city': new FormControl('', [
        Validators.required
      ]),
    });
    this.addInPhoneList();
    this.priceOffer.setValue(0);
  }
  onSubmit(event: Event) {
    this.prepareSaveclientGSMDisplay();
    this.clientGSMDisplay = this.saveclientGSMDisplay;
    event.preventDefault();
    this._clientGSMDisplayService.addGSMDisplayClient(this.clientGSMDisplay);
    this.resetAfterSubumit();
    this.successMessage();
  }
  private resetAfterSubumit() {
    this.clientGSMDisplay = new ClientGSMDisplay();
    this.clientGSMDisplayForm.controls['phoneList'] = this.fb.array([]);
    this.clientGSMDisplayForm.reset();
    this.ngOnInit();
  }
  prepareSaveclientGSMDisplay() {
    const formModel = this.clientGSMDisplayForm.value;
    const PhoneListDeepCopy: PhoneList[] = formModel.phoneList.map(
      (phoneList: PhoneList) => Object.assign({}, phoneList)
    );
    console.log(formModel);
    this.saveclientGSMDisplay.phoneList = PhoneListDeepCopy;
    this.saveclientGSMDisplay.lastname = formModel.lastname;
    this.saveclientGSMDisplay.phone = formModel.phone;
    this.saveclientGSMDisplay.city = formModel.city;
    this.saveclientGSMDisplay.priceOffer = this.totalPrice;
    this.saveclientGSMDisplay.addedDate = new Date().getTime().toString();
  }


  addInPhoneList(): any {
    const phoneListArray = <FormArray>this.clientGSMDisplayForm.controls['phoneList'];
    const newPhone = this.initPhoneList();
    phoneListArray.push(newPhone);
  }
  removeFromPhoneList(idx: number) {
    const phoneListArray = <FormArray>this.clientGSMDisplayForm.controls['phoneList'];
    phoneListArray.removeAt(idx);
  }
  calculateTotalPrice() {
    const formModel = this.clientGSMDisplayForm.value;
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

  initPhoneList() {
    return this.fb.group({
      phoneBrand: '',
      phoneModel: '',
      phoneColor: '',
      phoneQuantity: '',
      problems: this.fb.array([]),
      observation: '',
      displayOpType: ''

    })
  }
  successMessage() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Adauga Client GSM Display', detail:'Client GSM Display adaugat cu success.'});
  }
  get lastname() { return this.clientGSMDisplayForm.get('lastname'); }
  get phone() { return this.clientGSMDisplayForm.get('phone'); }
  get priceOffer() { return this.clientGSMDisplayForm.get('priceOffer'); }
  get city() { return this.clientGSMDisplayForm.get('city'); }
}

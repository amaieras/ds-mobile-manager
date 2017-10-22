import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/primeng";
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from "@angular/forms";
import {Address, AppointmentDate, ClientGSM, ClientGSMService} from "./client-gsm-detail.service";
import {UtilService} from "../../utils/util.service";

@Component({
  selector: 'client-gsm-detail',
  templateUrl: './client-gsm-detail.component.html'
})
export class ClientGSMDetailComponent implements OnInit {
  msgs: Message[] = [];
  clientGSMForm: FormGroup;
  clientGSM: ClientGSM = new ClientGSM();
  saveClientGSM: ClientGSM = new ClientGSM();
  constructor(
    private fb: FormBuilder,
    private clientGSMService: ClientGSMService,
    private utilService: UtilService
  ) { }

  ngOnInit(){
    this.clientGSMForm = new FormGroup({
      'lastname': new FormControl('', [
        Validators.required
      ]),
      'firstname': new FormControl('', [
        Validators.required
      ]),
      'firm': new FormControl('', [
        Validators.required
      ]),
      'phone': new FormControl('', [
        Validators.required
      ]),
      'email': new FormControl('', [
        Validators.required
      ]),
      'priceOffer': new FormControl('', [
        Validators.required
      ]),
      'country': new FormControl('', [
        Validators.required
      ]),
      phoneList: this.fb.array([ ]),
      'city': new FormControl('', [
        Validators.required
      ]),
      'billingAddress': this.fb.array([]),
      'shipmentAddress': this.fb.array([])
    });
    this.addInPhoneList();
  }
  addInPhoneList(): any {
    const phoneListArray = <FormArray>this.clientGSMForm.controls['phoneList'];
    const newPhone = this.initPhoneList();
    phoneListArray.push(newPhone);
  }
  removeFromPhoneList(idx: number) {
    const phoneListArray = <FormArray>this.clientGSMForm.controls['phoneList'];
    phoneListArray.removeAt(idx);
  }
  initPhoneList() {
    return this.fb.group({
      // phoneBrand: '',
      phoneModel: '',
      phoneColor: '',
      phoneQuantity: '',
      problems: this.fb.array([]),
      observation: ''
    })
  }
  onSubmit(event: Event) {
    this.prepareSaveClientGSM();
    event.preventDefault();
    if (!this.utilService.isNullOrUndefined(this.clientGSM.firm)) {
      this.clientGSM.firm = null;
    }
    this.clientGSMService.addGSMClient(this.clientGSM);
    this.clientGSMForm.reset();
    this.clientGSM = new ClientGSM();
    this.successMessage();

  }

  addBillingAddress() {
    if(this.billingAddress.length == 0) {
      this.billingAddress.push(this.fb.group(new Address()));
    }
  }
  addShipmentAddress() {
    if(this.shipmentAddress.length == 0) {
      this.shipmentAddress.push(this.fb.group(new Address()));
    }
  }
  successMessage() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Adauga Client GSM', detail:'Client GSM adaugat cu success.'});
  }
  prepareSaveClientGSM(){
    const formModel = this.clientGSMForm.value;
    const billingAddressDeepCopy: Address[] = formModel.billingAddress.map(
      (address: Address) => Object.assign({}, address)
    );
    const shipmentAddressDeepCopy: Address[] = formModel.shipmentAddress.map(
      (address: Address) => Object.assign({}, address)
    );
    this.saveClientGSM.billingAddress = billingAddressDeepCopy;
    this.saveClientGSM.shipmentAddress = shipmentAddressDeepCopy;
    this.saveClientGSM.addedDate.day = new Date().getUTCDate().toString();
    this.saveClientGSM.addedDate.month = (new Date().getUTCMonth() + 1) .toString();
    this.saveClientGSM.addedDate.year = new Date().getUTCFullYear().toString();
    this.saveClientGSM.addedDate.timestamp = new Date().getTime().toString();
  }
  get lastname() { return this.clientGSMForm.get('lastname'); }
  get firstname() { return this.clientGSMForm.get('firstname'); }
  get firm() { return this.clientGSMForm.get('firm'); }
  get phone() { return this.clientGSMForm.get('phone'); }
  get email() { return this.clientGSMForm.get('email'); }
  get priceOffer() { return this.clientGSMForm.get('priceOffer'); }
  get country() { return this.clientGSMForm.get('country'); }
  get city() { return this.clientGSMForm.get('city'); }
  get billingAddress(): FormArray {
    return this.clientGSMForm.get('billingAddress') as FormArray;
  }
  get shipmentAddress(): FormArray {
    return this.clientGSMForm.get('shipmentAddress') as FormArray;
  }
}

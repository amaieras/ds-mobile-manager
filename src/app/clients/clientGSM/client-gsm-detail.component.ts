import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/primeng";
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from "@angular/forms";
import {Address, AppointmentDate, ClientGSM, ClientGSMService} from "./client-gsm-detail.service";

@Component({
  selector: 'client-gsm-detail',
  templateUrl: './client-gsm-detail.component.html'
})
export class ClientGSMDetailComponent implements OnInit {
  msgs: Message[] = [];
  clientGSMForm: FormGroup;
  clientGSM: ClientGSM = new ClientGSM();

  constructor(
    private fb: FormBuilder,
    private clientGSMService: ClientGSMService
  ) { }

  ngOnInit(){
    this.clientGSMForm = new FormGroup({
      'lastname': new FormControl('', [
        Validators.required
      ]),
      'firstname': new FormControl('', [
        Validators.required
      ]),
      'firm': new FormControl('', [ ]),
      'phone': new FormControl('', [
        Validators.required
      ]),
      'email': new FormControl('', [
        Validators.required
      ]),
      'country': new FormControl('', [
        Validators.required
      ]),
      'city': new FormControl('', [
        Validators.required
      ]),
      'billingAddress': this.fb.array([]),
      'shipmentAddress': this.fb.array([])
    });
  }
  onSubmit(event: Event) {
    this.clientGSM = this.prepareSaveClientGSM();
    event.preventDefault();
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

    const saveClientGSM: ClientGSM = {
      addedDate: new AppointmentDate() as AppointmentDate,
      lastname: formModel.lastname as  string,
      firstname: formModel.firstname as  string,
      firm: formModel.firm as string,
      phone: formModel.phone as string,
      email: formModel.email as string,
      country: formModel.country as string,
      city: formModel.city as string,
      billingAddress: billingAddressDeepCopy as Address[],
      shipmentAddress: shipmentAddressDeepCopy as Address[],
    }
    saveClientGSM.addedDate.day = new Date().getUTCDate().toString();
    saveClientGSM.addedDate.month = (new Date().getUTCMonth() + 1) .toString();
    saveClientGSM.addedDate.year = new Date().getUTCFullYear().toString();
    saveClientGSM.addedDate.timestamp = new Date().getTime().toString();

    return saveClientGSM;
  }

  get lastname() { return this.clientGSMForm.get('lastname'); }
  get firstname() { return this.clientGSMForm.get('firstname'); }
  get firm() { return this.clientGSMForm.get('firm'); }
  get phone() { return this.clientGSMForm.get('phone'); }
  get email() { return this.clientGSMForm.get('email'); }
  get country() { return this.clientGSMForm.get('country'); }
  get city() { return this.clientGSMForm.get('city'); }
  get billingAddress(): FormArray {
    return this.clientGSMForm.get('billingAddress') as FormArray;
  }
  get shipmentAddress(): FormArray {
    return this.clientGSMForm.get('shipmentAddress') as FormArray;
  }
}

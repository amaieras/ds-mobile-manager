import {Component, Input, OnChanges, Output} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ClientType } from "../data-model";
import { Client } from "../data-model-client"
import { ClientService }           from './client-detail.service';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnChanges {
  @Input() selectedClientType: ClientType;
  client: Client;

  clientForm: FormGroup;
  // nameChangeLog: string[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService) {
    this.selectedClientType = undefined;
    this.createForm();
    // this.logNameChange();
  }

  createForm() {
    this.clientForm = this.fb.group({
      firstname: '',
      lastname: '',
      firm: '',
      phone: '',
      modelPhone: '',
      imei: '',
      problem: '',
      price: '',
      appointment: '',
      where: '',
      email: '',
      country: '',
      city: '',
      addressPaper: '',
      addressDeliver: ''
    });
  }

  ngOnChanges() {
    this.clientForm.reset({
      name: this.selectedClientType.type
    });
  }



  onSubmit() {
    this.client = this.prepareSaveClient();
    this.clientService.updateClient(this.client).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveClient(): Client {
    const formModel = this.clientForm.value;


    const saveClient: Client = {
      id: this.client.id,
      firstname: formModel.firstname as string,
      lastname: formModel.lastname as string,
      phone: formModel.phone as string
    };
    return saveClient;
  }
  select(clientType: ClientType) { this.selectedClientType = clientType; }
  // revert() { this.ngOnChanges(); }

  // logNameChange() {
  //   const nameControl = this.clientForm.get('name');
  //   nameControl.valueChanges.forEach(
  //     (value: string) => this.nameChangeLog.push(value)
  //   );
  // }
}


import {Component, Input, OnChanges, Output} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ClientType } from "../data-model";
import { Client } from "../data-mode-client"
import { ClientService }           from './client-detail.service';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnChanges {
  @Input() clientType: ClientType;
  @Output() client: Client;
  clientForm: FormGroup;
  nameChangeLog: string[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService) {

    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.clientForm = this.fb.group({
      firstname: '',
      lastname: '',
      phone: ''
    });
  }

  ngOnChanges() {
    this.clientForm.reset({
      name: this.clientType.type
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

  revert() { this.ngOnChanges(); }

  logNameChange() {
    const nameControl = this.clientForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

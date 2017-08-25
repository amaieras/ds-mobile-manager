import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";

@Component({
  selector: 'client-pf-detail',
  templateUrl: './client-pf-detail.component.html'
})
export class ClientPfDetailComponent implements OnInit{

  clientPFForm: FormGroup;

  ngOnInit(): void {
    this.clientPFForm = new FormGroup({
      'lastname': new FormControl('', [
        Validators.required
      ]),
      'firstname': new FormControl('', [
        Validators.required
      ])
    });
  }
  get lastname() { return this.clientPFForm.get('lastname'); }
  get firstname() { return this.clientPFForm.get('firstname'); }
}

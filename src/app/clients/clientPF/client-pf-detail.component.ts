import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClientPF, ClientPFService, AppointmentDate } from "./client-pf-detail.service";
import {Message, SelectItem} from "primeng/primeng";

@Component({
  selector: 'client-pf-detail',
  templateUrl: './client-pf-detail.component.html'
})
export class ClientPfDetailComponent implements OnInit{
  clientPF: ClientPF = new ClientPF();
  msgs: Message[] = [];
  problems: SelectItem[];
  clientPFForm: FormGroup;
  selectedProblem: string = 'Sticla';
  defaultDate: Date = new Date();

  constructor( private clientPFService: ClientPFService) {
    this.problems = [];
    this.problems.push({label:'Sticla', value: 'Sticla' });
    this.problems.push({label:'Display', value: 'Display' });
    this.problems.push({label:'Altele', value: 'Altele' });
  }

  ngOnInit(): void {
    this.defaultDate.setHours(12,0);
    this.clientPFForm = new FormGroup({
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
      'phoneModel': new FormControl('', [
        Validators.required
      ]),
      'problem': new FormControl('', [ ]),
      'imei': new FormControl('', []),
      'priceOffer': new FormControl('', [
        Validators.required
      ]),
      'appointment': new FormControl('', []),
      'aboutUs': new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit(event: Event) {
     this.clientPF = this.prepareSaveClientPF();
     event.preventDefault();
     this.clientPFService.addPFClient(this.clientPF);
     this.clientPFForm.reset();
     this.clientPF = new ClientPF();
     this.successMessage();
  }
  prepareSaveClientPF(){
    const formModel = this.clientPFForm.value;

    const saveClientPF: ClientPF = {
      addedDate: new AppointmentDate() as AppointmentDate,
      lastname: formModel.lastname as  string,
      firstname: formModel.firstname as  string,
      firm: formModel.firm as string,
      phone: formModel.phone as string,
      phoneModel: formModel.phoneModel as string,
      problem: formModel.problem as string,
      imei: '',
      priceOffer: formModel.priceOffer as string,
      appointment: new AppointmentDate() as AppointmentDate,
      aboutUs: formModel.aboutUs as string
    }
    saveClientPF.problem = this.selectedProblem;
    saveClientPF.appointment.day = this.defaultDate.getUTCDate().toString();
    saveClientPF.appointment.month = (this.defaultDate.getUTCMonth() + 1).toString();
    saveClientPF.appointment.year = this.defaultDate.getUTCFullYear().toString();
    saveClientPF.appointment.timestamp = this.defaultDate.getTime().toString();

    saveClientPF.addedDate.day = new Date().getUTCDate().toString();
    saveClientPF.addedDate.month = (new Date().getUTCMonth() + 1) .toString();
    saveClientPF.addedDate.year = new Date().getUTCFullYear().toString();
    saveClientPF.addedDate.timestamp = new Date().getTime().toString();

    return saveClientPF;
  }

  successMessage() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Adauga Client PF', detail:'Client adaugat cu success.'});
  }
  get lastname() { return this.clientPFForm.get('lastname'); }
  get firstname() { return this.clientPFForm.get('firstname'); }
  get firm() { return this.clientPFForm.get('firm'); }
  get phone() { return this.clientPFForm.get('phone'); }
  get phoneModel() { return this.clientPFForm.get('phoneModel'); }
  get problem() { return this.clientPFForm.get('problem'); }
  get imei() { return this.clientPFForm.get('imei'); }
  get priceOffer() { return this.clientPFForm.get('priceOffer'); }
  get appointment() { return this.clientPFForm.get('appointment'); }
  get aboutUs() { return this.clientPFForm.get('aboutUs'); }

}

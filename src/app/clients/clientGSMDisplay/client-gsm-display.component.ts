import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from "@angular/forms";
import {PhoneList} from "../../model/PhoneList";
import {ClientGSMDisplay} from "../../model/ClientGSMDisplay";
import {ClientGSMDisplayService} from "./client-gsm-display-detail.service";
import {Message} from "primeng/primeng";
import {PrintGsmReceiptComponent} from "../../shared/print/print-gsm/print-gsm-receipt.component";
import {WarrantyGSMInfo} from "../../model/WarrantyGSMInfo";


@Component({
  selector: 'app-client-gsm-display',
  templateUrl: './client-gsm-display.component.html'
})

export class ClientGSMDisplayComponent implements OnInit {
  msgs: Message[] = [];
  clientGSMDisplayForm: FormGroup;
  defaultDate: Date = new Date();
  clientGSMDisplay: ClientGSMDisplay = new ClientGSMDisplay();
  saveclientGSMDisplay: ClientGSMDisplay = new ClientGSMDisplay();
  totalPrice = 0;
  noOfClients: number = 0;
  totalNoQuantity = 0;
  warrantyGSMInfo: WarrantyGSMInfo;
  @ViewChild(PrintGsmReceiptComponent ) child: PrintGsmReceiptComponent;

  constructor( private fb: FormBuilder, private _clientGSMDisplayService: ClientGSMDisplayService) {
  }

  ngOnInit(){
    this._clientGSMDisplayService.getAllClients().subscribe( client => {
      this.noOfClients = client.length;
    })
    this.clientGSMDisplayForm = new FormGroup({
      'lastname': new FormControl('', [
        Validators.required
      ]),
      'phone': new FormControl('', [
        Validators.required
      ]),
      'priceOffer': new FormControl({value: 0, disabled: true}),
      'totalQuantity': new FormControl({value: 0, disabled: true}),
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
    this.saveclientGSMDisplay.phoneList = PhoneListDeepCopy;
    this.saveclientGSMDisplay.lastname = formModel.lastname;
    this.saveclientGSMDisplay.phone = formModel.phone;
    this.saveclientGSMDisplay.city = formModel.city;
    this.saveclientGSMDisplay.priceOffer = this.totalPrice;
    this.saveclientGSMDisplay.totalQuantity = this.totalNoQuantity;
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
  calculateTotalQuantity() {
    this.calculateTotalPrice();
    const formModel = this.clientGSMDisplayForm.value;
    let totalQuantity = 0;
    for (let i = 0; i < formModel.phoneList.length; i++) {
      const item = formModel.phoneList[i];
      totalQuantity = totalQuantity + +item.phoneQuantity;
    }
    this.totalNoQuantity = totalQuantity;
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
  print() {
    this.clientGSMDisplayForm.patchValue({appointment: this.defaultDate.getTime().toString()});
    this.setWarrantyInfo();
    this.child.print(this.warrantyGSMInfo);
    let event: Event;
    this.onSubmit(event);
  }

  private setWarrantyInfo() {
    const formModel = this.clientGSMDisplayForm.value;
    let problems = [];
    formModel.phoneList[0].problems.forEach(prbl => {
      let problemName = prbl.problem.toLowerCase() === 'altele' ? prbl.partName : prbl.problem;
      problems.push(problemName);
      let dateNow = Date.now().toString();
      this.warrantyGSMInfo = new WarrantyGSMInfo(dateNow, formModel.lastname, formModel.phone, this.totalPrice,
        formModel.phoneList[0].phoneColor, formModel.phoneList[0].phoneBrand
        , formModel.phoneList[0].phoneModel, formModel.phoneList[0].observation, this.noOfClients + 1, formModel.phoneList, problems)
    })
  }
  successMessage() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Adauga Client GSM Display', detail:'Client GSM Display adaugat cu success.'});
  }
  get lastname() { return this.clientGSMDisplayForm.get('lastname'); }
  get phone() { return this.clientGSMDisplayForm.get('phone'); }
  get priceOffer() { return this.clientGSMDisplayForm.get('priceOffer'); }
  get totalQuantity() { return this.clientGSMDisplayForm.get('totalQuantity'); }
  get city() { return this.clientGSMDisplayForm.get('city'); }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Message} from "primeng/primeng";
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from "@angular/forms";
import { ClientGSMService} from "./client-gsm-detail.service";
import {Address} from "../../model/Address";
import {ClientGSM} from "../../model/ClientGSM";
import {PhoneList} from "../../model/PhoneList";
import {WarrantyGSMInfo} from "../../model/WarrantyGSMInfo";
import {PrintGsmReceiptComponent} from "../../shared/print/print-gsm/print-gsm-receipt.component";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UtilService} from "../../utils/util.service";
import {ClientGSMType} from "../../model/ClientGSMType";

@Component({
  selector: 'client-gsm-detail',
  templateUrl: './client-gsm-detail.component.html',
  styleUrls: ['./client-gsm-detail.component.css']
})
export class ClientGSMDetailComponent implements OnInit {
  msgs: Message[] = [];
  clientGSMForm: FormGroup;
  clientGSM: ClientGSM = new ClientGSM();
  clientGSMSearch;
  clientsGSM;
  clientGSMTypeKey;
  saveClientGSM: ClientGSM = new ClientGSM();
  defaultDate: Date = new Date();
  totalPrice = 0;
  totalNoQuantity = 0;
  warrantyGSMInfo: WarrantyGSMInfo;
  @ViewChild(PrintGsmReceiptComponent ) child: PrintGsmReceiptComponent;
  noOfClients: number = 0;
  startAt: BehaviorSubject<string|null> = new BehaviorSubject("cxzx");
  endAt: BehaviorSubject<string|null> = new BehaviorSubject("cxzx\uf8ff");
  newClientGSMExists: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _clientGSMService: ClientGSMService,
    private _utilService: UtilService
  ) { }

  ngOnInit() {
    this._clientGSMService.getAllClients().subscribe( clients => {
      this.noOfClients = clients.length;
    });
    this._clientGSMService.getAllClientsList().subscribe(itme => {
      this.clientsGSM = [];
      itme.forEach(snapshot => {
        this.clientsGSM.push({label: snapshot.name, value: snapshot.name});
      });
    })
    this._clientGSMService.getAllClientsListByName(this.startAt, this.endAt)
      .subscribe(clientGSMSearch => {
        this.clientGSMSearch = clientGSMSearch;

      });
    this.clientGSMForm = new FormGroup({
      'lastname': new FormControl('', [
        Validators.required
      ]),
      // 'firstname': new FormControl('', [
      //   // Validators.required
      // ]),
      // 'firm': new FormControl('', [
      //   // Validators.required
      // ]),
      'phone': new FormControl('', [
        // Validators.required
      ]),
      // 'email': new FormControl('', [
      //   // Validators.required
      // ]),
      'priceOffer': new FormControl({value: 0, disabled: true}),
      'totalQuantity': new FormControl({value: 0, disabled: true}),
      // 'country': new FormControl('', [
      //   // Validators.required
      // ]),
      phoneList: this.fb.array([ ]),
      'city': new FormControl('', [
        Validators.required
      ]),
      // 'billingAddress': this.fb.array([]),
      // 'shipmentAddress': this.fb.array([])
    });
    this.addInPhoneList();
    this.priceOffer.setValue(0);
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
  calculateTotalPrice() {
    const formModel = this.clientGSMForm.value;
    let totalPrice = 0;
    for (let i = 0; i < formModel.phoneList.length; i++) {
      let phoneQuantity = +formModel.phoneList[i].phoneQuantity;
      for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
        const item = formModel.phoneList[i].problems[j];
        if (item.pricePerPart !== '') {
          totalPrice = totalPrice + item.pricePerPart * phoneQuantity;
        }
      }
    }
    this.totalPrice = totalPrice;
  }
  calculateTotalQuantity() {
    this.calculateTotalPrice();
    const formModel = this.clientGSMForm.value;
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
      phoneQuantity: '0',
      totalPricePerPhone: '0',
      problems: this.fb.array([]),
      observation: ''
    })
  }
  onSubmit(event: Event) {
    this.prepareSaveClientGSM();
    this.clientGSM = this.saveClientGSM;
    this._clientGSMService.addGSMClient(this.clientGSM);
    this.resetAfterSubumit();
    this.successMessage();
  }
  private resetAfterSubumit() {
    this.clientGSM = new ClientGSM();
    this.clientGSMForm.controls['phoneList'] = this.fb.array([]);
    this.clientGSMForm.reset();
    this.ngOnInit();
  }
  prepareSaveClientGSM() {
    const formModel = this.clientGSMForm.value;
    // const billingAddressDeepCopy: Address[] = formModel.billingAddress.map(
    //   (address: Address) => Object.assign({}, address)
    // );
    // const shipmentAddressDeepCopy: Address[] = formModel.shipmentAddress.map(
    //   (address: Address) => Object.assign({}, address)
    // );
    const PhoneListDeepCopy: PhoneList[] = formModel.phoneList.map(
      (phoneList: PhoneList) => Object.assign({}, phoneList)
    );
    // this.saveClientGSM.billingAddress = billingAddressDeepCopy;
    // this.saveClientGSM.shipmentAddress = shipmentAddressDeepCopy;
    this.saveClientGSM.clientNo = this.noOfClients + 1;
    this.saveClientGSM.phoneList = PhoneListDeepCopy;
    this.saveClientGSM.lastname = formModel.lastname;
    this.saveClientGSM.phone = formModel.phone;
    this.saveClientGSM.city = formModel.city;
    this.saveClientGSM.priceOffer = this.totalPrice;
    this.saveClientGSM.priceOfferCash = this.totalPrice === null ? 0 : +this.totalPrice;
    this.saveClientGSM.addedDate = new Date().getTime().toString();
    let clientGSMObj = new ClientGSMType(this.clientGSMTypeKey, formModel.lastname, formModel.phone, formModel.city);
    if (!this.checkIfNewClientGSMExists(formModel.lastname)){
      this.addNewClientGSMType(clientGSMObj) ;
    }
    else {
      this.updateClientGSMType(clientGSMObj);
    }
  }
  private addNewClientGSMType(clientTypeGSM) {
   this._clientGSMService.addGSMClientList(clientTypeGSM);
   this.resetClientGSMListFilter('cxvx');
  }

  private updateClientGSMType(clientTypeGSM) {
    this._clientGSMService.updateClientGSM(clientTypeGSM.$key, {phone:clientTypeGSM.phone, city:clientTypeGSM.city });
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
  print() {
    this.clientGSMForm.patchValue({appointment: this.defaultDate.getTime().toString()});
    this.setWarrantyInfo();
    let event: Event;
    this.onSubmit(event);
  }

  private setWarrantyInfo() {
    const formModel = this.clientGSMForm.value;
    formModel.phoneList.forEach(phone=> {
      let totalPricePerPhone = 0;
      phone.problems.forEach(prbl=> {
        totalPricePerPhone = totalPricePerPhone + prbl.pricePerPart;
        /**
         * Set on warranty print the new name of the problem if new one is needed
         */
        if (prbl.problem.toLowerCase() === 'altele') {
          prbl.problem = prbl.partName;
        }
      })
      phone.totalPricePerPhone = totalPricePerPhone * phone.phoneQuantity;
    })
    const dateNow = Date.now().toString();
    this.warrantyGSMInfo = new WarrantyGSMInfo(dateNow, formModel.lastname, formModel.phone, this.totalPrice,
      this.noOfClients + 1, formModel.phoneList);
    this.child.print(this.warrantyGSMInfo);
  }

  successMessage() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Adauga Client GSM', detail:'Client GSM adaugat cu success.'});
  }

  search(event) {
    if(event === "") {
      this.resetClientGSMListFilter('cxzx');
    } else {
      this.resetClientGSMListFilter(event);
    }
  }

  fillInfo(clientGSM) {
    this.resetClientGSMListFilter('cxzx');
    this.clientGSMForm.patchValue({lastname: clientGSM.name, phone: clientGSM.phone, city: clientGSM.city});
    this.clientGSMTypeKey = clientGSM.key;
 }

  private resetClientGSMListFilter(event) {
    this.startAt.next(event);
    this.endAt.next(event + "\uf8ff");
  }
  checkIfNewClientGSMExists(newClientGSM) {
    if(this._utilService.isNullOrUndefined(newClientGSM)) {
      this.newClientGSMExists = this._utilService.containsObject(newClientGSM, this.clientsGSM);
    }
    return this.newClientGSMExists;
  }
  get lastname() { return this.clientGSMForm.get('lastname'); }
  get firstname() { return this.clientGSMForm.get('firstname'); }
  get firm() { return this.clientGSMForm.get('firm'); }
  get phone() { return this.clientGSMForm.get('phone'); }
  get email() { return this.clientGSMForm.get('email'); }
  get priceOffer() { return this.clientGSMForm.get('priceOffer'); }
  get country() { return this.clientGSMForm.get('country'); }
  get city() { return this.clientGSMForm.get('city'); }
  get totalQuantity() { return this.clientGSMForm.get('totalQuantity'); }
  get billingAddress(): FormArray {
    return this.clientGSMForm.get('billingAddress') as FormArray;
  }
  get shipmentAddress(): FormArray {
    return this.clientGSMForm.get('shipmentAddress') as FormArray;
  }

}

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
import {ClientService} from "../shared/client.service";
import {PaymentMethod} from "../../model/PaymentMethod";
import {PhoneListService} from "../clientPF/phone-list/phone-list.service";

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
  constructor(
    private fb: FormBuilder,
    private _clientGSMService: ClientGSMService,
    private _utilService: UtilService,
    private _clientService: ClientService,
    private _phoneListService: PhoneListService
  ) { }

  ngOnInit() {
    this._clientGSMService.getAllClients().subscribe( clients => {
      this.noOfClients = clients.length;
    });
    this._clientGSMService.getAllClientsList().subscribe(item => {
      this.clientsGSM = [];
      item.forEach(snapshot => {
        this.clientsGSM.push({$key: snapshot.$key ,label: snapshot.name, value: snapshot.name});
      });
    });
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
      'firm': new FormControl('', [
        // Validators.required
      ]),
      'phone': new FormControl('', [
        // Validators.required
      ]),
      // 'email': new FormControl('', [
      //   // Validators.required
      // ]),
      'advancePayment': new FormControl(0,[]),
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
      for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
        let phoneQuantity = +formModel.phoneList[i].problems[j].phoneQuantity;
        const item = formModel.phoneList[i].problems[j];
        if (item.pricePerPart !== '') {
          totalPrice = totalPrice + item.pricePerPart * phoneQuantity;
        }
      }
    }
    this.totalPrice = totalPrice - formModel.advancePayment;
  }
  calculateTotalQuantity() {
    this.calculateTotalPrice();
    const formModel = this.clientGSMForm.value;
    let totalQuantity = 0;
    for (let i = 0; i < formModel.phoneList.length; i++) {
      for(let j=0; j < formModel.phoneList[i].problems.length; j++) {
        const item = formModel.phoneList[i].problems[j];
        totalQuantity = totalQuantity + +item.phoneQuantity;
      }
    }
    this.totalNoQuantity = totalQuantity;
  }
  initPhoneList() {
    return this.fb.group({
      phoneBrand: '',
      phoneModel: '',
      phoneColor: '',
      totalPricePerPhone: '0',
      problems: this.fb.array([]),
      observation: ''
    })
  }
  onSubmit(event: Event) {
    this.prepareSaveClientGSM();
    this.clientGSM = this.saveClientGSM;
    this._clientGSMService.addGSMClient(this.clientGSM)
      // .then(item => {
        this.clientGSMForm.patchValue({appointment: this.defaultDate.getTime().toString()});
        this.print();
        this.resetAfterSubumit();
        this.msgs = this._utilService.succesAddMessage('Adauga client GSM',
          'success', 'Client adaugat cu succes.');
      // });


  }
  private resetAfterSubumit() {
    this.clientGSM = new ClientGSM();
    this.clientGSMForm.controls['phoneList'] = this.fb.array([]);
    this.clientGSMForm.reset();
    this.ngOnInit();
  }
  prepareSaveClientGSM() {
    const formModel = this.clientGSMForm.value;
    let clientName = formModel.lastname.toLowerCase();
    let clientCity = formModel.city.toLowerCase();
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
    this._clientService.addNewPartPrice(formModel);
    this._clientService.addNewProblemName(formModel);
    this.saveClientGSM.clientNo = this.noOfClients + 1;
    this.saveClientGSM.phoneList = PhoneListDeepCopy;

    this.removeCtrlForNewItems();
    this.addNewBrandModelSynced(formModel);
    this.addNewSingleModelSynced(formModel);
    this.saveClientGSM.lastname = formModel.lastname;
    this.saveClientGSM.phone = formModel.phone;
    this.saveClientGSM.city = formModel.city;
    this.saveClientGSM.firm = formModel.firm;
    this.saveClientGSM.paymentMethod = new PaymentMethod(this.totalPrice,0,0,0,formModel.advancePayment);
    this.saveClientGSM.priceOffer = this.totalPrice;
    this.saveClientGSM.priceOfferCash = this.totalPrice === null ? 0 : +this.totalPrice;
    this.saveClientGSM.addedDate = new Date().getTime().toString();
    let clientGSMObj = new ClientGSMType(this.clientGSMTypeKey, clientName, formModel.phone, formModel.firm, clientCity);
    if (this.checkIfNewClientGSMExists(clientName) === ''){
      this.addNewClientGSMType(clientGSMObj);
    }
    else {
      clientGSMObj.$key = this.checkIfNewClientGSMExists(clientName);
      this.updateClientGSMType(clientGSMObj);
    }
  }

  private removeCtrlForNewItems() {
    this.saveClientGSM = this._clientService.removeCtrlForNewItems(this.saveClientGSM);
  }
  private addNewBrandModelSynced(formModel: any) {
    for (let i = 0; i < formModel.phoneList.length; i++) {
      const item = formModel.phoneList[i];
      if (item.newBrand !== '' && this._utilService.isNullOrUndefined(item.newBrand)
        && item.newModel !== '' && this._utilService.isNullOrUndefined(item.newModel)) {
        this._phoneListService.addNewBrand(item.newBrand);
        this._phoneListService.addNewModel(item.newModel, item.newBrand.toLowerCase());
      }
    }
  }

  private addNewSingleModelSynced(formModel: any){
    for (let i = 0; i < formModel.phoneList.length; i++) {
      const item = formModel.phoneList[i];
      if (item.newSingleModel !== '' && this._utilService.isNullOrUndefined(item.newSingleModel)) {
        const brandId = item.phoneBrand.toLowerCase();
        this._phoneListService.addNewModel(item.newSingleModel, brandId);
      }
    }
  }

  private addNewClientGSMType(clientTypeGSM) {
   this._clientGSMService.addGSMClientList(clientTypeGSM)
     // .then(item => {
       this.resetClientGSMListFilter('cxvx');
     // });
  }

  private updateClientGSMType(clientTypeGSM) {
    this._clientGSMService.updateClientGSM(clientTypeGSM.$key,
      {phone: clientTypeGSM.phone, city: clientTypeGSM.city, firm:clientTypeGSM.firm })
      // .then(item => {
        this._utilService.successUpdateMessage(clientTypeGSM.lastname, '',
          clientTypeGSM.phone, 'Valoare ')
      // });
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
    this.setWarrantyInfo();
    this.child.print(this.warrantyGSMInfo);
  }

  private setWarrantyInfo() {
    const dateNow = Date.now().toString();
    const formModel = this.clientGSMForm.value;
    const payMethod = new PaymentMethod(0, 0, formModel.advancePayment, 0, 0);
    this.saveClientGSM.phoneList.forEach(phone=> {
      let totalPricePerPhone = 0;
      phone.phoneBrand = phone.phoneBrand !== undefined && phone.phoneBrand.toLowerCase() === 'altele' ? phone.newBrand : phone.phoneBrand;
      phone.phoneModel = phone.phoneModel !== undefined && phone.phoneModel.toLowerCase() === 'altele' ? phone.newModel : phone.phoneModel;

      phone.problems.forEach(prbl=> {
        totalPricePerPhone = totalPricePerPhone + prbl.pricePerPart * +prbl.phoneQuantity;
        prbl.problem = prbl.problem.toLowerCase() === 'altele' ? prbl.partName : prbl.problem;
      })
      phone.totalPricePerPhone = totalPricePerPhone;
    })
    this.warrantyGSMInfo = new WarrantyGSMInfo(dateNow, this.saveClientGSM.lastname, this.saveClientGSM.phone, this.totalPrice,
      this.noOfClients + 1, this.saveClientGSM.phoneList, payMethod);
  }


  search(event) {
    if(event === "") {
      this.resetClientGSMListFilter('cxzx');
    } else {
      this.resetClientGSMListFilter(event);
    }
  }

  fillInfo(clientGSM) {
    const firm = clientGSM.firm === undefined ? '' : this._utilService.toTitleCase(clientGSM.firm);
    this.resetClientGSMListFilter('cxzx');
    this.clientGSMForm.patchValue({lastname: this._utilService.toTitleCase(clientGSM.name), phone: clientGSM.phone,
      city: this._utilService.toTitleCase(clientGSM.city), firm: firm});
    this.clientGSMTypeKey = clientGSM.$key;
 }

  private resetClientGSMListFilter(event) {
    this.startAt.next(event);
    this.endAt.next(event + "\uf8ff");
  }
  checkIfNewClientGSMExists(newClientGSM) {
    if(this._utilService.isNullOrUndefined(newClientGSM)) {
      if (this._utilService.containsObject(newClientGSM, this.clientsGSM)) {
        let existingClient = this.clientsGSM.filter(function(client) {
          return client.value.toLowerCase() === newClientGSM.toLowerCase();
        })
        return existingClient[0].$key;
      };
      return '';
    }
    return '';
  }

  get lastname() { return this.clientGSMForm.get('lastname'); }
  get firstname() { return this.clientGSMForm.get('firstname'); }
  get firm() { return this.clientGSMForm.get('firm'); }
  get phone() { return this.clientGSMForm.get('phone'); }
  get email() { return this.clientGSMForm.get('email'); }
  get priceOffer() { return this.clientGSMForm.get('priceOffer'); }
  get advancePayment() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientGSMForm.get('advancePayment');
  }
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

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import {UtilService} from '../../utils/util.service';
import {isValidPhoneNumber} from '../../shared/phone-validator.directive';
import {ClientPF} from '../../model/ClientPF';
import {ClientPFService} from './client-pf-detail.service';
import {PhoneList} from '../../model/PhoneList';
import {AboutUsService} from './phone-list/about-us/about-us.service';
import {Observable} from 'rxjs/Observable';
import {PhoneListService} from 'app/clients/clientPF/phone-list/phone-list.service';
import {PrintReceiptComponent} from "../../shared/print/print-pf/print-receipt.component";
import {WarrantyInfo} from "../../model/WarrantyInfo";
import {ClientService} from 'app/clients/shared/client.service';
import {PaymentMethod} from "../../model/PaymentMethod";

@Component({
  selector: 'app-client-pf-detail',
  templateUrl: './client-pf-detail.component.html'
})
export class ClientPfDetailComponent implements OnInit {
  name: any;
  state: string = '';
  clientPF: ClientPF = new ClientPF();
  paymentMethodType: PaymentMethod = new PaymentMethod(0,0,0,0,0);
  msgs: Message[] = [];
  tests: SelectItem[];
  clientPFForm: FormGroup;
  defaultDate: Date = new Date();
  saveClientPF: ClientPF = new ClientPF();
  phoneList: FormGroup;
  phoneItem: FormGroup;
  mainArray: Array<any>;
  isOtherRequired = false;
  aboutUsValExists = false;
  aboutUsList: any = [];
  selectedAboutUs = '';
  selectedOtherName = '';
  totalPrice = 0;
  noOfClients: number = 0;
  warrantyInfo: WarrantyInfo;

  @ViewChild(PrintReceiptComponent ) child: PrintReceiptComponent;

  constructor(private _clientPFService: ClientPFService, private fb: FormBuilder,
              private _utilService: UtilService,
              private _aboutUsService: AboutUsService, private _phoneListService: PhoneListService,
              private _clientService: ClientService) {
    this.tests = [];
    this.mainArray = [];
    this.tests.push({label: 'NU', value: 'NU'});
    this.tests.push({label: 'DA', value: 'DA'});

  }
  ngOnInit(): void {
    this._clientPFService.getAllClients().subscribe( client => {
      this.noOfClients = client.length;
    })
    this.populateDropDowns();
    this.clientPF.tested = this.saveClientPF.tested;
    this.defaultDate.setHours(12, 0);
    this.clientPFForm = this.fb.group({
      'lastname': new FormControl('', [
        // Validators.required
      ]),
      'firstname': new FormControl('', [
        // Validators.required
      ]),
      'email': new FormControl('', []),
      'firm': new FormControl('', []),
      'phone': new FormControl('', [
        Validators.required,
        isValidPhoneNumber
      ]),
      phoneList: this.fb.array([]),
      'tested': new FormControl('NU', []),
      'advancePayment': new FormControl(0,[]),
      'priceOffer': new FormControl({value: this.paymentMethodType.cash, disabled: true}),
      'appointment': new FormControl(this.defaultDate.getTime().toString(), []),
      'aboutUs': new FormControl('FACEBOOK', [])
    });
    this.initForm();
  }
  onSubmit(event: Event) {
    this.prepareSavePhoneList();
    this.clientPF = this.saveClientPF;
    this.checkInputForNullOrUndefined();
    this._clientPFService.addPFClient(this.clientPF);
      // .then(item => {
      this.print();
      this.resetAfterSubumit();
      this.clientPFForm.patchValue({appointment: this.defaultDate.getTime().toString()});
      this.msgs = this._utilService.succesAddMessage('Adauga client PF',
        'success', 'Client adaugat cu succes.');
    // })
  }

  private resetAfterSubumit() {
    this.clientPF = new ClientPF();
    this.clientPFForm.controls['phoneList'] = this.fb.array([]);
    this.clientPFForm.reset();
    this.ngOnInit();
  }

  calculateTotalPrice() {
    const formModel = this.clientPFForm.value;
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

  prepareSavePhoneList() {
    const formModel = this.clientPFForm.value;
    const PhoneListDeepCopy: PhoneList[] = formModel.phoneList.map(
      (phoneList: PhoneList) => Object.assign({}, phoneList)
    );
    this._clientService.addNewPartPrice(formModel);
    this._clientService.addNewProblemName(formModel);
    if (this.selectedOtherName !== '') {
      this._aboutUsService.addNewAboutUs(this.selectedOtherName);
    }
    this.saveClientPF.addedDate = new Date().getTime().toString();
    this.saveClientPF.phoneList = PhoneListDeepCopy;
    this.removeCtrlForNewItems();
    this.addNewBrandModelSynced(formModel);
    this.addNewSingleModelSynced(formModel);
    this.saveClientPF.clientNo = this.noOfClients + 1;
    this.saveClientPF.phone = formModel.phone;
    this.saveClientPF.tested = formModel.tested;
    this.saveClientPF.paymentMethod = new PaymentMethod(this.totalPrice,0,formModel.advancePayment,0,0);
    this.saveClientPF.aboutUs = this.selectedOtherName !== '' ? this.selectedOtherName : formModel.aboutUs;
    this.saveClientPF.priceOffer = this.totalPrice === null ? '0' : this.totalPrice.toString();
    this.saveClientPF.priceOfferCash = this.totalPrice === null ? '0' : this.totalPrice.toString();
    this.saveClientPF.appointmentDate = this.defaultDate.getTime().toString();
  }

  private removeCtrlForNewItems() {
    this.saveClientPF = this._clientService.removeCtrlForNewItems(this.saveClientPF);
  }

  addInPhoneList(): any {
    const phoneListArray = <FormArray>this.clientPFForm.controls['phoneList'];
    const newPhone = this.initPhoneList();
    phoneListArray.push(newPhone);
  }

  removeFromPhoneList(idx: number) {
    const phoneListArray = <FormArray>this.clientPFForm.controls['phoneList'];
    phoneListArray.removeAt(idx);
  }

  private addNewBrandModelSynced(formModel: any) {
    for (let i = 0; i < formModel.phoneList.length; i++) {
        const item = formModel.phoneList[i];
        if (item.newBrand !== '' && this._utilService.isNullOrUndefined(item.newBrand)
          && item.newModel !== '' && this._utilService.isNullOrUndefined(item.newModel)) {
          // this._phoneListService.addNewBrand(item.newBrand).then(item => {
            this.infoMessage('Adauga brand nou', 'Un nou brand: ' +
              item.newBrand + ' a fost adaugat')
          // });
          this._phoneListService.addNewModel(item.newModel, item.newBrand.toLowerCase())
            // .then(item => {
              this.infoMessage('Adaugare model nou.', 'Un nou model: ' + item.newModel + ' a fost adaugat pentru brandul: ' +
                item.newBrand);
          // });
        }
    }
  }

  private addNewSingleModelSynced(formModel: any){
    for (let i = 0; i < formModel.phoneList.length; i++) {
      const item = formModel.phoneList[i];
      if (item.newSingleModel !== '' && this._utilService.isNullOrUndefined(item.newSingleModel)) {
        const brandId = item.phoneBrand.toLowerCase();
        this._phoneListService.addNewModel(item.newSingleModel, brandId)
          // .then(item => {
            this.infoMessage('Adaugare model nou.', 'Un nou model: ' + item.newSingleModel
              + ' a fost adaugat');
          // });
      }
    }
  }
  initPhoneList() {
    return this.fb.group({
      phoneBrand: '',
      phoneModel: '',
      phoneColor: '',
      problems: this.fb.array([]),
      observation: '',
      phoneCode: new FormControl('', [
            Validators.required
          ]),
      imei: new FormControl('', [
        Validators.maxLength(15),
        // imeiValidator(/^\d+$/i)
      ])
    });
  }

  getPhoneItem(val) {
    this.phoneItem = val;
  }

  initForm() {
    this.priceOffer.setValue(0);
    this.addInPhoneList();
    this.resetAboutAs();
  }

  private populateDropDowns() {
    this._aboutUsService.getAboutUsList().subscribe(aboutUsList => {
      this.aboutUsList = [];
      aboutUsList.forEach(snapshot => {
        this.aboutUsList.push({label: snapshot.name, value: snapshot.name});
      });
    });
  }


  private checkInputForNullOrUndefined() {
    if (!this._utilService.isNullOrUndefined(this.clientPF.imei)) {
      this.clientPF.imei = null;
    }
    if (!this._utilService.isNullOrUndefined(this.clientPF.firm)) {
      this.clientPF.firm = null;
    }
    if (!this._utilService.isNullOrUndefined(this.clientPF.email)) {
      this.clientPF.email = null;
    }
    if (!this._utilService.isNullOrUndefined(this.clientPF.firstname)) {
      this.clientPF.firstname = null;
    }
    if (!this._utilService.isNullOrUndefined(this.clientPF.lastname)) {
      this.clientPF.lastname = null;
    }
  }


  private resetAboutAs() {
    if (this.selectedAboutUs !== 'FACEBOOK'){
      this.selectedAboutUs = 'FACEBOOK';
    }
    this.clientPFForm.removeControl('aboutAsName');
    this.isOtherRequired = false;
  }

  aboutUsNameValidator() {
    const aboutUs = this.aboutUsList;
    return Observable
      .of(this._utilService.containsObject(this.selectedOtherName, aboutUs))
      .map(result => !result ? null : { invalid: true });
  }

  checkIsOther(val) {
    this.isOtherRequired = this._utilService.checkIsOther(val.value);
    if (this.isOtherRequired) {
      this.clientPFForm.addControl('aboutAsName',
        new FormControl('', Validators.required, this.aboutUsNameValidator.bind(this)
        ));
    } else {
      this.clientPFForm.removeControl('aboutAsName');
    }
  }
  checkIfAboutUsExists(newValue) {
    if (this._utilService.isNullOrUndefined(newValue)) {
      this.aboutUsValExists = this._utilService.containsObject(newValue, this.aboutUsList);
    }
  }
  print() {
    this.setWarrantyInfo();
    this.child.print(this.warrantyInfo);
  }

  private setWarrantyInfo() {
    const formModel = this.clientPFForm.value;
    let dateNow = Date.now().toString();
    const payMethod = new PaymentMethod(0, 0, +formModel.advancePayment, 0, 0);
    for (let i = 0; i < formModel.phoneList.length; i++) {
      const phoneBrand = formModel.phoneList[i].phoneBrand.toLowerCase();
      const phoneModel = formModel.phoneList[i].phoneModel.toLowerCase();
      formModel.phoneList[i].phoneBrand = phoneBrand === 'altele' ? formModel.phoneList[i].newBrand : phoneBrand;
      formModel.phoneList[i].phoneModel = phoneModel === 'altele' ? formModel.phoneList[i].newModel : phoneModel;
      for (let j = 0; j < formModel.phoneList[i].problems.length; j++) {
        const problemName = formModel.phoneList[i].problems[j].problem.toLowerCase();
        formModel.phoneList[i].problems[j].problem = problemName === 'altele' ? formModel.phoneList[i].problems[j].partName : problemName;
      }
      this.warrantyInfo = new WarrantyInfo(dateNow, formModel.lastname, formModel.firstname, formModel.phone, this.totalPrice,
        formModel.tested, formModel.aboutUs,formModel.phoneList, formModel.appointment, this.noOfClients + 1, payMethod);
    }

  }


  infoMessage(summary, detail) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: summary, detail: detail});
  }
  get lastname() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('lastname');
  }

  get firstname() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('firstname');
  }

  get email() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('email');
  }

  get firm() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('firm');
  }

  get phone() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('phone');
  }

  get tested() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('tested');
  }

  get priceOffer() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('priceOffer');
  }
  get advancePayment() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('advancePayment');
  }

  get appointment() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('appointment');
  }

  get aboutUs() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('aboutUs');
  }

  get aboutAsName() {
    //noinspection TypeScriptUnresolvedFunction
    return this.clientPFForm.get('aboutAsName');
  }

  get isRepaired(){
    return this.clientPFForm.get('isRepaired');
  }

  get deliveredDate(){
    return this.clientPFForm.get('deliveredDate');
  }
  get phoneCode(){
    return this.clientPFForm.get('phoneCode');
  }
}


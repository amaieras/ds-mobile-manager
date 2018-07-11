import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "primeng/api";
import {OfferModel} from "app/main/apps/offers/offer.model";
import {UtilService} from "app/utils/util.service";
import {Observable} from "rxjs/Observable";
import {AboutUsService} from "app/main/apps/clients/client-pf/phone-pf-list/about-us/about-us.service";
import {PhoneList} from "app/model/PhoneList";
import {OfferService} from "app/main/apps/offers/offer.service";

@Component({
  selector: 'app-add-offer-list',
  templateUrl: './add-offer.component.html',
  providers: [OfferService]
})
export class AddOfferComponent implements OnInit {
  offerPFForm: FormGroup;
  msgs: Message[] = [];
  saveOffer: OfferModel = new OfferModel();
  phoneItem: FormGroup;
  totalPrice = 0;
  isOtherRequired = false;
  aboutUsValExists = false;
  aboutUsList: any = [];
  selectedOtherName = '';
  constructor( private _fb: FormBuilder, private _utilService: UtilService,
               private _aboutUsService: AboutUsService, private _offerService: OfferService) { }

  ngOnInit() {
    this.offerPFForm = this._fb.group({
      'name': new FormControl('', [
        // Validators.required
      ]),
      'phone': new FormControl('', [
        Validators.required
      ]),
      phoneList: this._fb.array([]),
      'priceOffer': new FormControl({value: 0, disabled: true}),
      'aboutUs': new FormControl('FACEBOOK', [])
    });
    this.initForm();
  }

  onSubmit(event: Event) {
    this.prepareSavePhoneList();
    this._offerService.addOffer(this.saveOffer);
    this.successMessage();
    this.resetAfterSubumit();
  }
  private prepareSavePhoneList() {
    const formModel = this.offerPFForm.value;
    const PhoneListDeepCopy: PhoneList[] = formModel.phoneList.map(
      (phoneList: PhoneList) => Object.assign({}, phoneList)
    );

    if (this.selectedOtherName !== '') {
      this._aboutUsService.addNewAboutUs(this.selectedOtherName);
    }
    this.saveOffer.addedDate = new Date().getTime().toString();
    this.saveOffer.phoneList = PhoneListDeepCopy;
    this.removeCtrlForNewItems();
    this.saveOffer.phone = formModel.phone;
    this.saveOffer.aboutUs = this.selectedOtherName !== '' ? this.selectedOtherName : formModel.aboutUs;
    this.saveOffer.priceOffer = this.totalPrice === null ? '0' : this.totalPrice.toString();
  }
  private resetAfterSubumit() {
    this.saveOffer = new OfferModel();
    this.offerPFForm.controls['phoneList'] = this._fb.array([]);
    this.offerPFForm.reset();
    this.ngOnInit();
  }
  initForm() {
    this.addInPhoneList();
    this.populateDropDowns();
  }
  private populateDropDowns() {
    this._aboutUsService.getAboutUsList().subscribe(aboutUsList => {
      this.aboutUsList = [];
      aboutUsList.forEach(snapshot => {
        this.aboutUsList.push({label: snapshot.name, value: snapshot.name});
      });
    });
  }
  getPhoneItem(val) {
    this.phoneItem = val;
  }
  addInPhoneList(): any {
    const phoneListArray = <FormArray>this.offerPFForm.controls['phoneList'];
    const newPhone = this.initPhoneList();
    phoneListArray.push(newPhone);
  }
  initPhoneList() {
    return this._fb.group({
      phoneBrand: '',
      phoneModel: '',
      problems: this._fb.array([]),
      observation: '',
      phoneQuantity: 1
    });
  }
  removeFromPhoneList(idx: number) {
    const phoneListArray = <FormArray>this.offerPFForm.controls['phoneList'];
    phoneListArray.removeAt(idx);
  }

  calculateTotalPrice() {
    const formModel = this.offerPFForm.value;
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
  checkIsOther(val) {
    this.isOtherRequired = this._utilService.checkIsOther(val.value);
    if (this.isOtherRequired) {
      this.offerPFForm.addControl('aboutAsName',
        new FormControl('', Validators.required, this.aboutUsNameValidator.bind(this)
        ));
    } else {
      this.offerPFForm.removeControl('aboutAsName');
    }
  }
  checkIfAboutUsExists(newValue) {
    if (this._utilService.isNullOrUndefined(newValue)) {
      this.aboutUsValExists = this._utilService.containsObject(newValue, this.aboutUsList);
    }
  }
  aboutUsNameValidator() {
    const aboutUs = this.aboutUsList;
    return Observable
      .of(this._utilService.containsObject(this.selectedOtherName, aboutUs))
      .map(result => !result ? null : { invalid: true });
  }

  private removeCtrlForNewItems() {
    this.saveOffer.phoneList.forEach(phone => {
      phone.problems.forEach(problem => {
        if (problem.partName !== undefined) {
          problem.problem = problem.partName;
          delete problem.partName;
        }
      })
      if (phone.newBrand !== undefined) {
        phone.phoneBrand = phone.newBrand
        delete phone.newBrand;
      }
      if (phone.newModel !== undefined) {
        phone.phoneModel = phone.newModel;
        delete phone.newModel;
      }
      if (phone.newSingleModel !== undefined) {
        phone.phoneModel = phone.newSingleModel;
        delete phone.newSingleModel;
      }
    });
  }
  successMessage() {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Adauga Oferta', detail: 'Oferta adaugata cu success.'});
  }
  get name() {
    //noinspection TypeScriptUnresolvedFunction
    return this.offerPFForm.get('name');
  }
  get phone() {
    //noinspection TypeScriptUnresolvedFunction
    return this.offerPFForm.get('phone');
  }


}


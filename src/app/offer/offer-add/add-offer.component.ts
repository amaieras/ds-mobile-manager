import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "primeng/api";
import {OfferModel} from "../../model/OfferModel";

@Component({
  selector: 'app-add-offer-list',
  templateUrl: './add-offer.component.html'
})
export class AddOfferComponent implements OnInit {
  offerPFForm: FormGroup;
  msgs: Message[] = [];
  saveOffer: OfferModel = new OfferModel();
  constructor( private _fb: FormBuilder) { }

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
  }

  onSubmit(event: Event) {
  }

  successMessage() {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Adauga Client PF', detail: 'Client adaugat cu success.'});
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

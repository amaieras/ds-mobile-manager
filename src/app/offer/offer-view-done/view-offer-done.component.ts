import {Component, OnInit} from '@angular/core';
import {OfferModel} from '../../model/OfferModel';
import {OfferService} from '../offer.service';
import {Message, SelectItem} from 'primeng/api';
import {ClientPF} from '../../model/ClientPF';

@Component({
  selector: 'app-view-offer-done-list',
  templateUrl: './view-offer-done.component.html',
  providers: [OfferService]
})
export class ViewOfferDoneComponent implements OnInit {
  offers: OfferModel[];
  cols: any[];
  columnOptions: SelectItem[];
  msgs: Message[] = [];
  constructor(private _offerService: OfferService) { }


  ngOnInit() {
    this._offerService.getAllOffers().subscribe(offers => {
      this.offers = offers.filter(function(item) {
        return item.isDone;
      }); ;
      this.cols = [
        { field: 'addedDate', header: 'Data introducerii', filter: true, sortable: true },
        { field: 'name', header: 'Nume', filter: true, editable: true, sortable: true },
        { field: 'phone', header: 'Numar telefon', filter: true, editable: true, sortable: true },
        { field: 'phoneList', header: 'Model', filter: true, sortable: true },
        { field: 'problems', header: 'Problema', filter: true, sortable: true  },
        { field: 'observation', header: 'Observatii', filter: true, editable: true, sortable: true  },
        { field: 'priceOffer', header: 'Oferta de pret', filter: true, editable: true, sortable: true  },
        { field: 'aboutUs', header: 'Cum a aflat de noi?', filter: true, editable: true, sortable: true  },
        { field: 'isDone', header: 'Terminat?', filter: true, sortable: true}
      ];
      this.columnOptions = [];

      for (let i = 0; i < this.cols.length; i++) {
        this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
      }
    });

  }

  updateField(row) {
    this._offerService.updateItem(row.data.$key, row.data);
    this.successMessage(row.data.lastname, row.data.phone, 'Valoare');
  }

  updateRepairFinnish(row) {
    this._offerService.updateItem(row.$key, {isDone: row.isDone});
  }
  disabledRow(rowData: OfferModel) {
    return rowData.isDone ? 'disabled-account-row' : '';
  }

  successMessage(lastname, phone, msg) {
    this.msgs = [];
    let msgAux = '';
    if (lastname === undefined) {
      msgAux = ' modificata pentru clientul cu numarul de telefon: ' + phone;
    }
    else {
      msgAux = ' modificata pentru clientul: ' + lastname;
    }
    this.msgs.push({
      severity: 'success',
      summary: msg  + msgAux,
      detail: 'Date modificate.'
    });
  }
}

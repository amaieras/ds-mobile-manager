import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { ClientType }        from '../data-model';
import { ClientTypeService } from './client-type.service';

@Component({
  selector: 'client-type-list',
  templateUrl: './client-type-list.component.html'
})
export class ClientTypeListComponent implements OnInit {
  clientTypes: Observable<ClientType[]>;
  isLoading = false;
  selectedClientType: ClientType;

  constructor(private clientTypeService: ClientTypeService) { }

  ngOnInit() { this.getClientTypes(); }

  getClientTypes() {
    this.isLoading = true;
    this.clientTypes = this.clientTypeService.getClientTypes()
    // Todo: error handling
      .finally(() => this.isLoading = false);
    this.selectedClientType = undefined;
  }

  select(clientType: ClientType) { this.selectedClientType = clientType; }
}

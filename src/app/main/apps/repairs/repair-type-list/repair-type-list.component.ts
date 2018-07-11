import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { ClientType, ClientTypeService } from "app/main/apps/clients/client-type-list/client-type.service"

@Component({
  selector: 'repair-type-list',
  templateUrl: './repair-type-list.component.html'
})
export class RepairTypeListComponent implements OnInit {
  clientTypes: Observable<ClientType[]>;
  isLoading = false;
  selectedClientType: ClientType;

  constructor(private clientTypeService: ClientTypeService) { }

  ngOnInit() {
    this.getClientTypes();
    this.selectedClientType = null;
  }

  getClientTypes() {
    this.isLoading = true;
    this.clientTypes = this.clientTypeService.getClientTypes()
      .finally(() => this.isLoading = false);

    this.clientTypes.subscribe(
      data => '',
      err => console.log(err + ' Error fetching client types.')

    )
    this.selectedClientType = undefined;
  }



}

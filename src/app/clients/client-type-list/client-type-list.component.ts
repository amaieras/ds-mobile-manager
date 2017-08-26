import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { ActivatedRoute, Router } from "@angular/router";
import { ClientType, ClientTypeService } from './client-type.service';

@Component({
  selector: 'client-type-list',
  templateUrl: './client-type-list.component.html'
})
export class ClientTypeListComponent implements OnInit {
  clientTypes: Observable<ClientType[]>;
  isLoading = false;
  selectedClientType: ClientType;
  selectedId: number;

  constructor(private clientTypeService: ClientTypeService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getClientTypes();
    this.selectedClientType = null;
  }

  getClientTypes() {
    this.isLoading = true;
    this.clientTypes = this.clientTypeService.getClientTypes()
      // Todo: error handling
      .finally(() => this.isLoading = false);
    this.selectedClientType = undefined;
  }

  select(clientType: ClientType) {
    this.selectedId = clientType.id;
    this.router.navigate([clientType.id], { relativeTo: this.route });
  }


}

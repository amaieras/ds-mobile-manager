import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/finally';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientType, ClientTypeService } from './client-type.service';

@Component({
  selector: 'app-client-type-list',
  templateUrl: './client-type-list.component.html'
})
export class ClientTypeListComponent implements OnInit {
  clientTypes: any;
  isLoading = false;
  selectedClientType: ClientType;
  selectedId: number;

  constructor(private clientTypeService: ClientTypeService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getClientTypes();
    this.selectedClientType = null;
  }

  getClientTypes() {
    this.isLoading = false;
    this.clientTypes = this.clientTypeService.getClientTypes()
      // Todo: error handling
      .finally(() => this.isLoading = false);
    this.clientTypes.subscribe(
      data => '',
      err => console.log(err + ' Error fetching client types.')
    );
    this.selectedClientType = undefined;
  }

  select(clientType: ClientType) {
    this.selectedId = clientType.id;
    this.router.navigate([clientType.id], { relativeTo: this.route });
  }

}

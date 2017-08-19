import {Component, Input, ViewEncapsulation} from '@angular/core';
import { ClientType } from "../data-model"
import { ClientDetailComponent } from "../client-detail/client-detail.component";
import { ClientTypeListComponent} from "../client-type-list/client-type-list.component"
@Component({
  selector: 'customer-browser',
  templateUrl: `src/app/client/client-browser/client-browser.component.html`,
  // directives: [ClientTypeListComponent, ClientDetailComponent],
  encapsulation: ViewEncapsulation.None
})
export class CustomerBrowser {
  selectedClientType: ClientType;
  @Input() clientTypes: ClientType[];
}

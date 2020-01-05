import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "../../../@fuse/animations";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ClientGSMService} from '../../clients/clientGSM/client-gsm-detail.service';
import {UtilService} from '../../utils/util.service';
import * as _ from 'lodash';


@Component({
  selector: "app-reports-overview",
  templateUrl: "./reports-overview.component.html",
  styleUrls: ["./reports-overview.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ReportsOverviewComponent implements OnInit {
  displayedColumns = [{
    label: "Client",
    value: "lastName"
    },
    {
      label: "Total intrari",
      value: "count"
    }
  ];
  clients: any[];
  loading: boolean;
  dataSource: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _clientGSMService: ClientGSMService,
              private _utilService: UtilService) {}

  getClients() {
    this._clientGSMService.getAllClients().subscribe( clients => {
      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.paginator = this.paginator;
      this.groupClients(clients);
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.loading = true;
    this.getClients();
  }

  groupClients(clients) {
    const groups = _.groupBy(clients, value => {
      return value.lastname.toLowerCase();
    })
    const clientData = [];
    Object.keys(groups)
      .forEach(key => {
        const clientCount = groups[key].length;
        clientData.push({
          lastName: key,
          count: clientCount
        });
      });
    this.clients = clientData;
    this.loading = false;
  }
}

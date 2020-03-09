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
  displayedColumns = [
    {
      label: "Client",
      value: "lastName"
    },
    {
      label: "Total intrari",
      value: "clientCount"
    },
    {
      label: "Total incasari",
      value: "totalCostsForClient"
    }
  ];
  allClients: any[];
  clients: any[];
  loading: boolean;
  dataSource: any = [];
  rangeDates: Date[];
  totalMoneyForDate: Number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _clientGSMService: ClientGSMService,
              private _utilService: UtilService) {}

  getClients() {
    this._clientGSMService.getAllClients().subscribe( clients => {
      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.paginator = this.paginator;
      this.groupClients(clients);
      this.allClients = clients;
      this.setFilterDates();
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
    });
    const clientData = [];
    Object.keys(groups)
      .forEach(key => {
        const totalCostsForClient = this.totalCostsForClient(groups[key]);
        const clientCount = groups[key].length;
        clientData.push({
          lastName: key,
          clientCount,
          totalCostsForClient
        });
      });
    this.clients = clientData;
    this.loading = false;
  }
  private totalCostsForClient(clientIn) {
    let totalPrice = 0;
    clientIn.forEach(client => {
      client.phoneList.forEach(phone => {
        phone.problems.forEach(problem => {
          const quantity = problem.phoneQuantity === undefined ? 1 : +problem.phoneQuantity;
          totalPrice += problem.pricePerPart * +quantity;
        });
      });
    });
    return totalPrice;
  }
  onRangeSelect() {
    if (this.rangeDates[1] !== null && this.rangeDates[0].getTime() <= this.rangeDates[1].getTime()) {
      this.filterClientsByDate();
    }
  }
  filterClientsByDate() {
    const clientsByDate = this.allClients.filter(client => {
      const clientDate = new Date(+client.addedDate).setHours(0, 0, 0, 0);
      return clientDate >= this.rangeDates[0].getTime() && clientDate <= this.rangeDates[1].getTime();
    });
    this.getTotalMoneyForDate(clientsByDate);
    this.groupClients(clientsByDate);
  }
  getTotalMoneyForDate(clients) {
    let total = 0;
    clients.forEach(client => {
      total += +client.priceOffer;
    })
    this.totalMoneyForDate = total;
  }
  setFilterDates(){
    const rangeDates = []
    const start = "1/1/" + (new Date()).getFullYear();
    const end = "12/31/" + (new Date()).getFullYear();
    rangeDates.push(new Date(start), new Date(end));
    this.rangeDates = rangeDates;
    this.onRangeSelect();
  }
}

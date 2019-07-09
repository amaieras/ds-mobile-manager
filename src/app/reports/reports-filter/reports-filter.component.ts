import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {PhoneListService} from '../../clients/clientPF/phone-list/phone-list.service';
import {AboutUsService} from '../../clients/clientPF/phone-list/about-us/about-us.service';
import {ReportService} from '../../shared/reports/report.service';
import {ClientService} from 'app/clients/shared/client.service';
import {DropdownModel} from '../../model/DropdownModel';
import {Report} from '../../model/Report';
import {FormControl} from '@angular/forms';
import {fuseAnimations} from '../../../@fuse/animations';
import {FilterDataTableComponent} from './filter-data-table/filter-data-table.component';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ReportsFilterComponent implements OnInit {
  clientTypes: SelectItem[] = [];
  selectedClientTypes: any[] = [];
  phoneBrandsArray: any = [];
  selectedBrands: any[] = [];
  phoneModelsArray: any = [];
  selectedModels: any[] = [];
  rangeDates: Date[];
  aboutUsList: any = [];
  selectedAboutUs = [];
  problems: Array<{}>;
  problemsList: any = [];
  selectedProblems: any[] = [];
  report: Report = new Report(0, 0, 0, [], []);
  isPayed: Boolean = false;
  clientsGSM = new FormControl();
  clientsGSMList: any[] = [];
  selectedGSMClients: any[] = [];
  checked: boolean;

  @ViewChild(FilterDataTableComponent) filterDataTableComponent: FilterDataTableComponent;

  constructor( private _phoneListService: PhoneListService,
               private _aboutUsService: AboutUsService,
               private _reportService: ReportService,
               private _clientService: ClientService) { }

  ngOnInit() {
    this.populateDropDownFilters();
  }

  private populateDropDownFilters() {
    this.clientTypes = [
      // {label:'PF', value:'pf'},
      {label: 'GSM', value: 'gsm'}
    ];
    this.selectedClientTypes = [ 'gsm' ];

    this._phoneListService.getBrandList().subscribe(phoneModels => {
      phoneModels.forEach(snapshot => {
        this.phoneBrandsArray.push({label: snapshot.name, value: snapshot.name});
      });
      this.phoneBrandsArray.shift();
    });

    this._phoneListService.getModelList().subscribe(phoneModels => {
      phoneModels.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.name});
      });
      this.phoneModelsArray.shift();
    });
    this._aboutUsService.getAboutUsList().subscribe(aboutUsList => {
      aboutUsList.forEach(snapshot => {
        this.aboutUsList.push({label: snapshot.name, value: snapshot.name});
      });
      this.aboutUsList.shift();
    });

    this._clientService.getProblemList().subscribe(problemsList => {
      problemsList.forEach(snapshot => {
        this.problemsList.push(new DropdownModel(snapshot.name, snapshot.name));
      });
      this.problemsList.shift();
    });

    this._reportService.getClientsGSMList().subscribe(gsm => {
      gsm.forEach(snapshot => {
        this.clientsGSMList.push(new DropdownModel(snapshot.name, snapshot.name));
      });
      this.clientsGSMList.sort((a, b) => a.label.localeCompare(b.label));
    });
  }

  applyFilters() {
    this.filterItems('gsm');
  }

  private filterItems(clientType) {
    this._reportService.getClientsByType(clientType).subscribe(clients => {
      const selectedBrands = this.selectedBrands.map(item => item.toUpperCase());
      const selectedModels = this.selectedModels.map(item => item.toUpperCase());
      const selectedProblems = this.selectedProblems.map(item => item.toUpperCase());
      const selectedGSMClientList = this.selectedGSMClients.map(item => item.toUpperCase());

      // first filter by payed or not payed in order to avoid looping through unnecessary clients
      let filteredClients = clients.filter(client => client.isPayed === this.isPayed);


      // Filter by selected client name
      filteredClients = filteredClients.filter(client => selectedGSMClientList.includes(client.lastname.toUpperCase()));

      // Filter by selected phone brand
      filteredClients = filteredClients.filter(client => {
        return client.phoneList.every(brand => selectedBrands.includes(brand.phoneBrand.toUpperCase()));
      });

      // Filter by selected phone model
      filteredClients = filteredClients.filter(client => {
        return client.phoneList.every(model => selectedModels.includes(model.phoneModel.toUpperCase()));
      });

      // Filter by selected problem
      filteredClients = filteredClients.filter(client => {
        return client.phoneList.every(phone => {
          return phone.problems.every(problem => selectedProblems.includes(problem.problem.toUpperCase()));
        });
      });

      filteredClients = filteredClients.filter(client => {
        const clientDate = new Date(+client.addedDate).setHours(0, 0, 0, 0);
        return clientDate >= this.rangeDates[0].getTime()
            && clientDate <= this.rangeDates[1].getTime();
      });

      this.report.clientGSM = filteredClients;
      this.countNoOfParts(filteredClients, this.selectedModels);
      this.countNoOfClients(filteredClients);
      this.calculateTotalIn(filteredClients);
      // sends filtered client data to filtered list to be displayed by material table
      this.filterDataTableComponent.getFilteredClients(filteredClients);

    });
  }

  private countNoOfParts(filteredClients, models) {
    const pieces = [];
    const selectedProblems = this.selectedProblems.map(item => item.toLowerCase());
    filteredClients.forEach(c => {
      c.phoneList.forEach(p => {
        p.problems.forEach(prob => {
          const quantity = prob.phoneQuantity === undefined ? 1 : +prob.phoneQuantity;
          if (models.map(v => v.toLowerCase()).indexOf(p.phoneModel.toLowerCase()) > -1) {
            for (let i = 1; i <= quantity; i++) {
              selectedProblems.forEach(selProb => {
                if (selProb.toLowerCase() === prob.problem.toLowerCase()) {
                  pieces.push(prob.problem);
                }
              });

            }
          }
        });
      });
    });
    this.report.piecesNo = pieces.length;
  }

  private countNoOfClients(filteredClients) {
    this.report.noOfClients = filteredClients.length;
  }
  private calculateTotalIn(filteredClients) {
    let totalPrice = 0;
    filteredClients.forEach(fc => {
      totalPrice = totalPrice + +fc.paymentMethod._advance + +fc.paymentMethod._card + +fc.paymentMethod._cash
        + +fc.paymentMethod._collector + +fc.paymentMethod._repayment;
    });
    this.report.totalIn = totalPrice;
  }
}

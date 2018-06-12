import { Component, OnInit } from '@angular/core';
import {SelectItem} from "primeng/api";
import {PhoneListService} from "../../clients/clientPF/phone-list/phone-list.service";
import {AboutUsService} from "../../clients/clientPF/phone-list/about-us/about-us.service";
import {ReportService} from "../../shared/reports/report.service";
import {ClientService} from 'app/clients/shared/client.service';
import {DropdownModel} from "../../model/DropdownModel";
import {Report} from "../../model/Report";

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.scss']
})
export class ReportsFilterComponent implements OnInit {
  clientTypes: SelectItem[];
  selectedClientTypes: any[];
  phoneBrandsArray: any = [];
  selectedBrands: any[];
  phoneModelsArray: any = [];
  selectedModels: any[];
  rangeDates: Date[];
  aboutUsList: any = [];
  selectedAboutUs = [];
  problems: Array<{}>;
  problemsList: any = [];
  selectedProblems: any[];
  report: Report = new Report(0,0,0);
  isPayed: boolean = false;
  constructor(private _phoneListService: PhoneListService, private _aboutUsService: AboutUsService,
              private _reportService: ReportService, private _clientService: ClientService) { }

  ngOnInit() {
    this.populateDropDownFilters();
    this._clientService.getProblemList().subscribe(problemsList => {
      this.problemsList = [];
      problemsList.forEach(snapshot => {
        this.problemsList.push(new DropdownModel(snapshot.name, snapshot.name));
      });
      this.problemsList.shift()
    });
  }
  populateDropDownFilters() {
    this.clientTypes = [
      {label:'PF', value:'pf'},
      {label: 'GSM', value:'gsm'}
    ];
    this.selectedClientTypes = [ "pf", "gsm" ];

    this._phoneListService.getBrandList().subscribe(phoneModels => {
      this.phoneBrandsArray = [];
      phoneModels.forEach(snapshot => {
        this.phoneBrandsArray.push({label: snapshot.name, value: snapshot.name});
      });
      this.phoneBrandsArray.shift();
    });

    this._phoneListService.getModelList().subscribe(phoneModels => {
      this.phoneModelsArray = [];
      phoneModels.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.name});
      });
      this.phoneModelsArray.shift();
    });
    this._aboutUsService.getAboutUsList().subscribe(aboutUsList => {
      this.aboutUsList = [];
      aboutUsList.forEach(snapshot => {
        this.aboutUsList.push({label: snapshot.name, value: snapshot.name});
      });
      this.aboutUsList.shift();
    });
  }

  applyFilters() {
    this.filterByClientType(this.selectedClientTypes[0]);
  }

  private filterByClientType(clientType) {
    const that = this;
    const selectedAboutUs = that.selectedAboutUs.map(item=> item.toUpperCase());
    const selectedBrands = that.selectedBrands.map(item=> item.toUpperCase());
    const selectedModels = that.selectedModels.map(item=> item.toUpperCase());
    const selectedProblems = that.selectedProblems.map(item=> item.toUpperCase());
    this._reportService.getClientsByType(clientType).subscribe(clients => {
      let filteredClients = clients.filter(function (c) {
        let phoneBrands = [];
        let phoneModels = [];
        let problems = [];
        const aboutUs = c.aboutUs === undefined ? 'UNDEFINED' : c.aboutUs.toUpperCase();
        const clientDate = new Date(+c.addedDate).setHours(0, 0, 0, 0);
        c.phoneList.forEach(phone => {
          phoneBrands.push(phone.phoneBrand);
          phoneModels.push(phone.phoneModel);
          phone.problems.forEach(problem => {
            problems.push(problem.problem)
          })
        });


        phoneBrands = phoneBrands.map(item=> item.toUpperCase());
        phoneModels = phoneModels.map(item=> item.toUpperCase());
        problems = problems.map(item=> item.toUpperCase());
        if (that.selectedClientTypes[0] === 'pf') {
          return selectedAboutUs.includes(aboutUs)
            && selectedBrands.some(v => phoneBrands.includes(v))
            && selectedModels.some(v => phoneModels.includes(v))
            && selectedProblems.some(v => problems.includes(v))
            && clientDate >= that.rangeDates[0].getTime()
            && clientDate <= that.rangeDates[1].getTime()
            && c.isPayed === that.isPayed;
        }
        return selectedBrands.some(v => phoneBrands.includes(v))
          && selectedModels.some(v => phoneModels.includes(v))
          && selectedProblems.some(v => problems.includes(v))
          && clientDate >= that.rangeDates[0].getTime()
          && clientDate <= that.rangeDates[1].getTime()
          && c.isPayed === that.isPayed;
      })
      this.countNoOfParts(filteredClients, that.selectedModels);
      this.countNoOfClients(filteredClients);
      this.calculateTotalIn(filteredClients);
    });
  }

  private countNoOfParts(filteredClients, models) {
    let pieces = [];
    filteredClients.forEach(c => {
      c.phoneList.forEach(p => {
        p.problems.forEach(prob =>{
          let quantity = prob.phoneQuantity === undefined ? 1 : +prob.phoneQuantity;
          if (models.indexOf(p.phoneModel) > -1) {
            for(let i = 1; i <= quantity; i++) {
              pieces.push(p);
            }
          }
        })
      });
    })
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
    })
    this.report.totalIn = totalPrice;
  }
}

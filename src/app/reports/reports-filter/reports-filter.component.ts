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
  onSelect(phoneId) {

  }
  onDatePicked(date) {

  }

  applyFilters() {
    const that = this;
    this._reportService.getClientsByType(this.selectedClientTypes[0]).subscribe(clients => {
      let filteredClients = clients.filter(function(c) {
        let phoneBrands = [];
        let phoneModels = [];
        let problems = [];
        const aboutUs = c.aboutUs === undefined ? 'undefined' : c.aboutUs;
        const clientDate = new Date(+c.addedDate).setHours(0,0,0,0);
        c.phoneList.forEach(phone => {
          phoneBrands.push(phone.phoneBrand);
          phoneModels.push(phone.phoneModel);
          phone.problems.forEach(problem => {
            problems.push(problem.problem)
          })
        });
        return that.selectedAboutUs.includes(aboutUs)
          && that.selectedBrands.some(v => phoneBrands.includes(v))
          && that.selectedModels.some(v => phoneModels.includes(v))
          && that.selectedProblems.some(v => problems.includes(v))
          && clientDate >= that.rangeDates[0].getTime()
          && clientDate <= that.rangeDates[1].getTime();
      })
      console.log(filteredClients)
      this.countNoOfParts(filteredClients);
      this.countNoOfClients(filteredClients);
    });
  }

  private countNoOfParts(filteredClients) {
    let pieces = [];
    filteredClients.forEach(c => {
      c.phoneList.forEach(p=>{
        pieces.push(p.problem);
      });
    })

    this.report.piecesNo = pieces.length;
  }

  private countNoOfClients(filteredClients) {
    this.report.noOfClients = filteredClients.length;
  }
  private calculateTotalIn(filteredClients) {

  }
}

import { Component, OnInit } from '@angular/core';
import {SelectItem} from "primeng/api";
import {PhoneListService} from "../../clients/clientPF/phone-list/phone-list.service";
import {AboutUsService} from "../../clients/clientPF/phone-list/about-us/about-us.service";
import {ReportService} from "../../shared/reports/report.service";

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
  selectedAboutUs = '';
  constructor(private _phoneListService: PhoneListService, private _aboutUsService: AboutUsService,
              private _reportService: ReportService) { }

  ngOnInit() {
    this.populateDropDownFilters();
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
    });
  }
  onSelect(phoneId) {

  }
  onDatePicked(date) {

  }

  applyFilters() {
    let partCount = 0;
    let filteredClients;
    this.selectedClientTypes.forEach(selectedClient => {
      this._reportService.getClientsByType(selectedClient).subscribe(clients => {
        filteredClients = clients.filter(function(c) {
          return c.aboutUs.toLowerCase() === 'google';
        })
        console.log(filteredClients)
      });
    })


  }
}

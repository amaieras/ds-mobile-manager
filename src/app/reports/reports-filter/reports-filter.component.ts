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
  selectedAboutUs = [];
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
      this.aboutUsList.shift();
    });
  }
  onSelect(phoneId) {

  }
  onDatePicked(date) {

  }

  applyFilters() {
    let partCount = 0;
    let phoneBrands = [];
    let phoneModels = [];
    const that = this;
    // this.selectedClientTypes.forEach(selectedClient => {
      this._reportService.getClientsByType(this.selectedClientTypes[0]).subscribe(clients => {
        let filteredClients = clients.filter(function(c) {
          const aboutUs = c.aboutUs === undefined ? 'undefined' : c.aboutUs;
          const clientDate = new Date(+c.addedDate).setHours(0,0,0,0);
          c.phoneList.forEach(phone => {
            phoneBrands.push(phone.phoneBrand);
            phoneModels.push(phone.phoneModel);
          })
          return that.selectedAboutUs.includes(aboutUs)
            && that.selectedBrands.some(v => phoneBrands.includes(v))
            && that.selectedModels.some(v => phoneModels.includes(v))
            && clientDate >= that.rangeDates[0].getTime()
            && clientDate <= that.rangeDates[1].getTime();
        })
        console.log(filteredClients)
      });
    // })



  }
}

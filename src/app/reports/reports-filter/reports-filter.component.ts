import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SelectItem} from "primeng/api";
import {PhoneListService} from "../../clients/clientPF/phone-list/phone-list.service";
import {AboutUsService} from "../../clients/clientPF/phone-list/about-us/about-us.service";
import {ReportService} from "../../shared/reports/report.service";
import {ClientService} from 'app/clients/shared/client.service';
import {DropdownModel} from "../../model/DropdownModel";
import {Report} from "../../model/Report";
import {FormControl, NgModel} from '@angular/forms';
import {fuseAnimations} from "../../../@fuse/animations";

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
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
  report: Report = new Report(0,0,0,[],[]);
  isPayed: boolean = false;
  clientsGSM = new FormControl();
  clientsGSMList : any[] = [];
  selectedGSMClients: any[] = [];
  checked: boolean;

  constructor(private _phoneListService: PhoneListService, private _aboutUsService: AboutUsService,
              private _reportService: ReportService, private _clientService: ClientService) { }

  ngOnInit() {
    this.populateDropDownFilters();
  }

  private populateDropDownFilters() {
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

    this._clientService.getProblemList().subscribe(problemsList => {
      this.problemsList = [];
      problemsList.forEach(snapshot => {
        this.problemsList.push(new DropdownModel(snapshot.name, snapshot.name));
      });
      this.problemsList.shift()
    });

    this._reportService.getClientsGSMList().subscribe(gsm => {
      gsm.forEach(snapshot=> {
        this.clientsGSMList.push(snapshot);
        // this.selectedGSMClients.push(snapshot.name)
      })
      this.clientsGSMList.sort((a, b) => {
        const nameA = a.name, nameB = b.name;
        if(nameA < nameB) return -1;
        if(nameA > nameB) return 1;
        return 0;
      });
    })
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
    const selectedGSMClientList = that.selectedGSMClients.map(item => item.toUpperCase());
    const gsmClientList = [];
    this._reportService.getClientsByType(clientType).subscribe(clients => {
      let filterItems;
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
          filterItems = selectedAboutUs.includes(aboutUs)
            && selectedBrands.some(v => phoneBrands.includes(v))
            && selectedModels.some(v => phoneModels.includes(v))
            && selectedProblems.some(v => problems.includes(v))
            && clientDate >= that.rangeDates[0].getTime()
            && clientDate <= that.rangeDates[1].getTime()
            && c.isPayed === that.isPayed;
        }
        else if (that.selectedClientTypes[0] === 'gsm') {
          clients.forEach(item => {
            gsmClientList.push(item.lastname.toUpperCase());
          })
          filterItems = selectedBrands.some(v => phoneBrands.includes(v))
            && selectedModels.some(v => phoneModels.includes(v))
            && selectedProblems.some(v => problems.includes(v))
            && clientDate >= that.rangeDates[0].getTime()
            && clientDate <= that.rangeDates[1].getTime()
            && c.isPayed === that.isPayed;
        }
        return filterItems;
      })
      if (that.selectedClientTypes[0] === 'gsm') {
        this.report.clientGSM = filteredClients;
        filteredClients = filteredClients.filter(item => {
          return selectedGSMClientList.includes(item.lastname.toUpperCase());
        })
      }
      else if (that.selectedClientTypes[0] === 'pf') {
        this.report.clientsPF= filteredClients;
      }
      this.countNoOfParts(filteredClients, that.selectedModels);
      this.countNoOfClients(filteredClients);
      this.calculateTotalIn(filteredClients);
    });
  }

  private countNoOfParts(filteredClients, models) {
    let pieces = [];
    const selectedProblems = this.selectedProblems.map(item=> item.toLowerCase());
    filteredClients.forEach(c => {
      c.phoneList.forEach(p => {
        p.problems.forEach(prob =>{
          let quantity = prob.phoneQuantity === undefined ? 1 : +prob.phoneQuantity;
          if (models.map(v => v.toLowerCase()).indexOf(p.phoneModel.toLowerCase()) > -1) {
            for(let i = 1; i <= quantity; i++) {
              selectedProblems.forEach(selProb => {
                if (selProb.toLowerCase() === prob.problem.toLowerCase()) {
                  pieces.push(prob.problem);
                }
              })

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

  selectAll(checkAll, values) {
    const clientGSMNames = [];
    if(this.checked){
      values.forEach(gsm => {
        clientGSMNames.push(gsm.name);
      })
      this.selectedGSMClients = clientGSMNames;
    }
    else{
      this.selectedGSMClients = [];
      // select.update.emit([]);
    }
  }
}

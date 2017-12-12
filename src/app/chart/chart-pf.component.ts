
import {Component, OnInit} from "@angular/core";
import {RepairPFDetailService} from "../repairs/repairPF/repair-pf-detail.service";
import { SelectItem } from 'primeng/primeng'

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html'
})
export class ChartPfComponent implements OnInit {

  data: any;
  date: number;

  years: SelectItem[];
  months: SelectItem[];
  days: SelectItem[];

  avgDM: any;
  avgDY: any;
  avgMY: any;

  constructor(private repairPFService:RepairPFDetailService) {
    this.date = new Date().getTime();

    let auxDate = new Date(this.date).getDate();
    let auxMonth = new Date(this.date).getMonth();
    let auxYear = new Date(this.date).getFullYear();

    this.initYears();
    this.initMonths();
    this.daysInMonth(auxMonth, auxYear);

    // let day = this.days[auxDate-1];
    // let year = this.years.filter(fl => fl.value === auxYear).slice()[0];
    // let month =  this.months.filter(fl => fl.value === auxMonth).slice()[0];
  // console.log(day)
    this.getStatisticsByYear( new Date());

  }


  private initYears(){
    this.years = [];
    let currentYear = new Date().getFullYear();
    for(let i = 2017; i <= currentYear; i++){
      this.years.push({label:""+currentYear, value: currentYear})
    }

  }

  private initMonths() {
    this.months = [];
    let auxDate = new Date();
    for (let i = 0; i <= 11; i++) {
      auxDate.setMonth(i);
      this.months.push({label: this.getMonthName(auxDate), value: i});
    }
  }

  private getMonthName(auxDate: Date) {
    var monthName = new Intl.DateTimeFormat("ro-RO", {month: "long"}).format;
    var longName = monthName(auxDate).charAt(0).toUpperCase() + monthName(auxDate).slice(1);
    return  longName ;
  }

  private getAveragePerMonthOfYear(clientsNr: number, year: number){
    if(year === 2017){
      return (clientsNr/2).toPrecision(2)
    }else{
      return (clientsNr/(new Date().getMonth()+1)).toPrecision(2);
    }
  }

  private getAveragePerDayInMonth(clientsNr: number, month: number, year: number){
    let auxDate = new Date();
    let daysNo = 0;

    if (month === auxDate.getMonth() && year === auxDate.getFullYear()) {
      daysNo = auxDate.getDate();
    }
    else{
      auxDate.setMonth(month+1);
      auxDate.setFullYear(year);
      auxDate.setDate(0);
      daysNo = auxDate.getDate();
    }
    return (clientsNr/daysNo).toPrecision(2);
  }

  private getAveragePerDayInYear(clientsNr: number, year: number){

    if(year === 2017){
      return (clientsNr/60).toPrecision(2);
    }
    else {
      let ds = new Date(year, 0, 1);
      let de = new Date();
      if (de.getFullYear() === year){
        return (clientsNr/this.daysBetweendDates(ds, de)).toPrecision(2);
      }else{
        return (clientsNr/365).toPrecision(2);
      }
    }
  }

  private daysBetweendDates(firstDate: Date, secondDate: Date) {
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  }

  private daysInMonth(month,year) {
    this.days = [];
    let date = new Date(year, month+1, 0).getDate();
    for(let i = 1; i <= date; i++){
      this.days.push({label: ""+i, value:i});
    }
  }

  getStatisticsByYear(event) {
    let auxYear = event.getFullYear(),
        auxMonth = event.getMonth(),
        auxDay = event.getDate();

    if(auxMonth != null && auxYear != null)
      this.daysInMonth(auxMonth, auxYear);

    if(auxMonth != null && auxYear != null && auxDay != null)

      this.repairPFService.getClientsPFList().subscribe(item => {

        this.data = {
          labels: [ 'Zi (Medie ZI/LUNA)','Luna (MEDIE LUNA/AN)','Anul (MEDIA ZI/AN)'],
          datasets: []
        };

        let newItems = item.filter(function (fl) {
          return new Date(+fl.addedDate).getFullYear() === auxYear
        });

        let monthItems = newItems.filter(fi => {
          return new Date(+fi.addedDate).getMonth() === auxMonth
        });

        let dayItems = monthItems.filter(fi => {
          return new Date(+fi.addedDate).getDate() === auxDay
        });

        let count = newItems.length;
        let monthCount = monthItems.length;
        let dayCount = dayItems.length;

        this.avgDM = this.getAveragePerDayInMonth(monthCount, auxMonth, auxYear);
        this.avgDY = this.getAveragePerDayInYear(count, auxYear);
        this.avgMY = this.getAveragePerMonthOfYear(count, auxYear);

        let obj = {
          label: 'Statistici: '+ auxDay + " " + (auxMonth+1) + " " + auxYear,
          backgroundColor: '#42f571',
          borderColor: '#36e53e',
          data: [dayCount, monthCount, count]
        };
        let obj2 = {
          label: 'Media',
          backgroundColor: '#1d19f5',
          borderColor: '#0b1de5',
          data: [this.avgDM, this.avgMY, this.avgDY]
        };
        this.data.datasets.push(obj);
        this.data.datasets.push(obj2);
    });
  }

  ngOnInit() {
  }

}

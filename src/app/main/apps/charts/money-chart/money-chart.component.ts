import { Component, OnInit } from '@angular/core';
import {ChartService} from "../chart.service";
import {RepairPFDetailService} from "../../repairs/repairPF/repair-pf-detail.service";

@Component({
  selector: 'app-money-chart',
  templateUrl: './money-chart.component.html',
  styleUrls: ['./money-chart.component.scss']
})
export class MoneyChartComponent implements OnInit {

  data: any;

  avgDM: any;
  avgDY: any;
  avgMY: any;

  constructor(private chartService:ChartService, private repairPFService:RepairPFDetailService) {
    this.getStatisticsByYear(new Date());
  }

  getStatisticsByYear(event) {
    let auxYear = event.getFullYear(),
      auxMonth = event.getMonth(),
      auxDay = event.getDate();

    if(auxMonth != null && auxYear != null && auxDay != null)

      this.repairPFService.getClientsPFList().subscribe(item => {

        this.data = {
          labels: [ 'Zi ','Luna ','An'],
          datasets: []
        };


        let headers = {
          label: 'MONEY',
          backgroundColor: '#0b1de5',
          borderColor: '#1d19f5',
        };
        let obj = this.getDatasetFromItems(item, auxYear, auxMonth, auxDay, headers);
        this.data.datasets.push(obj.objAvg);
        this.data.datasets.push(obj.obj);
      });
  }

  private getDatasetFromItems(items: any, auxYear: number, auxMonth: any, auxDay: any,
                              headers: { label: string, backgroundColor: string, borderColor: string })
  {

    let obj: any;
    obj = this.getAverages(items, auxYear, auxMonth, auxDay);
    let color1;let color2;

    if (headers.label === 'MONEY'){
      color1 = '#303F9F';
      color2 = '#1A237E'
    }


    let objAvg = {
      label: headers.label+" AVG",
      backgroundColor: headers.backgroundColor,
      borderColor: headers.borderColor,
      data: [obj.avgDM, obj.avgMY, obj.avgDY]
    };

    let objTotal = {
      label: headers.label,
      backgroundColor: color1,
      borderColor: color2,
      data: [obj.day, obj.month, obj.year]
    }
    return {obj: objTotal, objAvg: objAvg};
  }

  private getAverages(item, auxYear: number, auxMonth: any, auxDay: any) {

    let anualIncome = 0, monthlyIncome = 0, dailyIncome = 0;
    let newItems = item.filter(function (fl) {
      return new Date(+fl.addedDate).getFullYear() === auxYear
    });

    newItems.forEach(it => {
      anualIncome += +it.priceOffer;
    });

    let monthItems = newItems.filter(fi => {
      return new Date(+fi.addedDate).getMonth() === auxMonth
    });
    monthItems.forEach(it => {
      monthlyIncome += +it.priceOffer;
    });

    let dayItems = monthItems.filter(fi => {
      return new Date(+fi.addedDate).getDate() === auxDay
    });
    dayItems.forEach(di => {
      dailyIncome += + di.priceOffer;
    });

    let avgDM = this.chartService.getAveragePerDayInMonth(monthlyIncome, auxMonth, auxYear);
    let avgDY = this.chartService.getAveragePerDayInYear(anualIncome, auxYear);
    let avgMY = this.chartService.getAveragePerMonthOfYear(anualIncome, auxYear);
    return {avgDM: avgDM, avgDY: avgDY, avgMY: avgMY, day:dailyIncome, month: monthlyIncome, year: anualIncome};
  }


  ngOnInit() {
  }

}

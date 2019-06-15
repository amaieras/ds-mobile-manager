import { Component, OnInit } from '@angular/core';
import {ChartService} from '../chart.service';
import {RepairPFDetailService} from '../../repairs/repairPF/repair-pf-detail.service';

@Component({
  selector: 'app-about-us-chart',
  templateUrl: './about-us-chart.component.html',
  styleUrls: ['./about-us-chart.component.scss']
})
export class AboutUsChartComponent implements OnInit {

  data: any;

  avgDM: any;
  avgDY: any;
  avgMY: any;

  constructor(private chartService: ChartService, private repairPFService: RepairPFDetailService) {
    this.getStatisticsByYear(new Date());
  }

  getStatisticsByYear(event) {
    const auxYear = event.getFullYear(),
      auxMonth = event.getMonth(),
      auxDay = event.getDate();

    if (auxMonth != null && auxYear != null && auxDay != null)

      this.repairPFService.getClientsPFList().subscribe(item => {

        this.data = {
          labels: [ 'Zi ', 'Luna ', 'An'],
          datasets: []
        };

        const fbItems = item.filter(fi => {
          return fi.aboutUs === 'FACEBOOK';
        });

        const beforeItems = item.filter(fi => {
          return fi.aboutUs === 'A MAI FOST';
        });

        const googleItems = item.filter(fi => {
          return fi.aboutUs === 'GOOGLE';
        });

        const olxItems = item.filter(fi => {
          return fi.aboutUs === 'OLX';
        });

        let headers = {
            label: 'FACEBOOK',
            backgroundColor: '#0b1de5',
            borderColor: '#1d19f5',
          };
        let obj = this.getDatasetFromItems(fbItems, auxYear, auxMonth, auxDay, headers);
        this.data.datasets.push(obj.objAvg);
        this.data.datasets.push(obj.obj);

        headers = {
          label: 'GOOGLE',
          backgroundColor: '#e5e50a',
          borderColor: '#f5f240'
        };
        obj = this.getDatasetFromItems(googleItems, auxYear, auxMonth, auxDay, headers);
        this.data.datasets.push(obj.objAvg);
        this.data.datasets.push(obj.obj);


        headers = {
          label: 'OLX',
          backgroundColor: '#36e53e',
          borderColor: '#42f571'
        };

        obj = this.getDatasetFromItems(olxItems, auxYear, auxMonth, auxDay, headers);
        this.data.datasets.push(obj.objAvg);
        this.data.datasets.push(obj.obj);
      });
  }

  private getDatasetFromItems(items: any, auxYear: number, auxMonth: any, auxDay: any,
                              headers: { label: string, backgroundColor: string, borderColor: string })
  {

    let obj: any;
    obj = this.getAverages(items, auxYear, auxMonth, auxDay);
    let color1; let color2;

    if (headers.label === 'FACEBOOK'){
      color1 = '#303F9F';
      color2 = '#1A237E';
    }
    if (headers.label === 'GOOGLE'){
      color1 = '#FFEE58';
      color2 = '#FFFF00';
    }
    if (headers.label === 'OLX'){
      color1 = '#43A047';
      color2 = '#1B5E20';
    }

    const objAvg = {
      label: headers.label + ' AVG',
      backgroundColor: headers.backgroundColor,
      borderColor: headers.borderColor,
      data: [obj.avgDM, obj.avgMY, obj.avgDY]
    };

    const objTotal = {
      label: headers.label,
      backgroundColor: color1,
      borderColor: color2,
      data: [obj.day, obj.month, obj.year]
    };
    return {obj: objTotal, objAvg: objAvg};
  }

  private getAverages(item, auxYear: number, auxMonth: any, auxDay: any) {


    const newItems = item.filter(function (fl) {
      return new Date(+fl.addedDate).getFullYear() === auxYear;
    });
    const monthItems = newItems.filter(fi => {
      return new Date(+fi.addedDate).getMonth() === auxMonth;
    });

    const dayItems = monthItems.filter(fi => {
      return new Date(+fi.addedDate).getDate() === auxDay;
    });

    const count = newItems.length;
    const monthCount = monthItems.length;
    const dayCount = dayItems.length;

    const avgDM = this.chartService.getAveragePerDayInMonth(monthCount, auxMonth, auxYear);
    const avgDY = this.chartService.getAveragePerDayInYear(count, auxYear);
    const avgMY = this.chartService.getAveragePerMonthOfYear(count, auxYear);
    return {avgDM: avgDM, avgDY: avgDY, avgMY: avgMY, day: dayCount, month: monthCount, year: count};

  }

  ngOnInit() {
  }

}

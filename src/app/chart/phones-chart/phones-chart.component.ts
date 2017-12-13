import { Component, OnInit } from '@angular/core';
import {RepairPFDetailService} from "../../repairs/repairPF/repair-pf-detail.service";
import {ChartService} from "../chart.service";

@Component({
  selector: 'app-phones-chart',
  templateUrl: './phones-chart.component.html',
  styleUrls: ['./phones-chart.component.scss']
})
export class PhonesChartComponent implements OnInit {

  data: any;

  avgDM: any;
  avgDY: any;
  avgMY: any;

  constructor(private repairPFService:RepairPFDetailService, private chartService: ChartService) {
    this.getStatisticsByYear( new Date());
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

        let iphones=[], samsungs=[], others=[];

        item.forEach(it => {
          let auxI = it.phoneList.filter(ph =>
          {
            return ph.phoneBrand === 'Iphone' || ph.phoneBrand === 'APPLE'
          });
          if(auxI.length > 0)
            iphones.push({
              phone: auxI,
              addedDate: it.addedDate
            });

          let auxS = it.phoneList.filter(ph => {
            return ph.phoneBrand === 'Samsung' || ph.phoneBrand === 'SAMSUNG'
          });
          if(auxS.length > 0)
            samsungs.push({
              phone: auxS,
              addedDate: it.addedDate
            });

          let auxOthers = it.phoneList.filter(ph => {
            return ph.phoneBrand !== 'Samsung' ||  ph.phoneBrand === 'SAMSUNG' ||
                   ph.phoneBrand === 'Iphone' || ph.phoneBrand === 'APPLE'
          });
          if(auxOthers.length > 0)
            others.push({
              phone: auxOthers,
              addedDate: it.addedDate
            });

        });
        let headers = {
          label: 'IPHONE',
          backgroundColor: '#0b1de5',
          borderColor: '#1d19f5',
        };
         let obj = this.getDatasetFromItems(iphones, auxYear, auxMonth, auxDay, headers);
         this.data.datasets.push(obj.objAvg);
         this.data.datasets.push(obj.obj);

        headers = {
          label: 'SAMSUNG',
          backgroundColor: '#e5e50a',
          borderColor: '#f5f240'
        };
        obj = this.getDatasetFromItems(samsungs, auxYear, auxMonth, auxDay, headers);
        this.data.datasets.push(obj.objAvg);
        this.data.datasets.push(obj.obj);

        headers = {
          label: 'OTHERS',
          backgroundColor: '#36e53e',
          borderColor: '#42f571'
        };

        obj = this.getDatasetFromItems(others, auxYear, auxMonth, auxDay, headers);
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

    if (headers.label === 'IPHONE'){
      color1 = '#303F9F';
      color2 = '#1A237E'
    }
    if(headers.label === 'SAMSUNG'){
      color1 = '#FFEE58';
      color2 = '#FFFF00';
    }
    if(headers.label === 'OTHERS'){
      color1 = '#43A047';
      color2 = '#1B5E20'
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

    let avgDM = this.chartService.getAveragePerDayInMonth(monthCount, auxMonth, auxYear);
    let avgDY = this.chartService.getAveragePerDayInYear(count, auxYear);
    let avgMY = this.chartService.getAveragePerMonthOfYear(count, auxYear);
    return {avgDM: avgDM, avgDY: avgDY, avgMY: avgMY, day:dayCount, month: monthCount, year: count};

  }
  ngOnInit() {
  }

}

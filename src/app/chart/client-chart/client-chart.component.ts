import { Component, OnInit } from '@angular/core';
import {ChartService} from '../chart.service';
import {RepairPFDetailService} from '../../repairs/repairPF/repair-pf-detail.service';

@Component({
  selector: 'app-client-chart',
  templateUrl: './client-chart.component.html',
  styleUrls: ['./client-chart.component.scss']
})
export class ClientChartComponent implements OnInit {

  data: any;

  avgDM: any;
  avgDY: any;
  avgMY: any;

  constructor(private repairPFService: RepairPFDetailService, private chartService: ChartService) {
    this.getStatisticsByYear( new Date());
  }

  getStatisticsByYear(event) {
    const auxYear = event.getFullYear(),
      auxMonth = event.getMonth(),
      auxDay = event.getDate();

    if (auxMonth != null && auxYear != null && auxDay != null)

      this.repairPFService.getClientsPFList().subscribe(item => {

        this.data = {
          labels: [ 'Zi (Medie ZI/LUNA)', 'Luna (MEDIE LUNA/AN)', 'Anul (MEDIA ZI/AN)'],
          datasets: []
        };

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

        this.avgDM = this.chartService.getAveragePerDayInMonth(monthCount, auxMonth, auxYear);
        this.avgDY = this.chartService.getAveragePerDayInYear(count, auxYear);
        this.avgMY = this.chartService.getAveragePerMonthOfYear(count, auxYear);


        const obj = {
          label: 'Statistici: ' + auxDay + ' ' + (auxMonth + 1) + ' ' + auxYear,
          backgroundColor: '#42f571',
          borderColor: '#36e53e',
          data: [dayCount, monthCount, count]
        };
        const obj2 = {
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

import { ViewChild, Component, OnInit } from '@angular/core';
import {RepairPFDetailService} from "../../repairs/repairPF/repair-pf-detail.service";
import {PhoneListService} from "../../clients/clientPF/phone-list/phone-list.service";
import {SelectItem} from "primeng/primeng";
import {UIChart} from "primeng/components/chart/chart";

@Component({
  selector: 'app-phone-detailed',
  templateUrl: './phone-detailed.component.html',
  styleUrls: ['./phone-detailed.component.scss']
})
export class PhoneDetailedComponent implements OnInit {

  data: any;
  series: any;
  phoneBrands: any[];
  isDisabled: boolean;
  selectedYear: any;
  selectedSeries: any;

  @ViewChild('chart') chart : UIChart;

  constructor(private repairPFService: RepairPFDetailService, private phoneService: PhoneListService) {

    this.isDisabled = true;
    this.series = [{name: 'S'},{name: 'A'},{name: 'J'}, {name: 'NOTE'}];
    this.initChartDataset();

    this.phoneService.getBrandList().subscribe(item => {
      this.phoneBrands =  item
    });

  }

  private initChartDataset() {
    this.data = {
      labels: ['Ianuarie ', 'Februarie ', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August',
        'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
      datasets: []
    };
  }

  getDataset(item, headers){
    let obj = {
      label: headers.label,
      backgroundColor: headers.backgroundColor,
      borderColor: headers.borderColor,
      hidden: false,
      data: [item.ian, item.feb, item.mar, item.apr, item.mai, item.iun, item.iul, item.aug, item.sep, item.oct, item.nov, item.dec ]
    };
    return obj;
  }

  getMonthlyCount(item){
    let jan = 0 , feb = 0, mar = 0, apr = 0, mai = 0, iun = 0, iul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;

    item.forEach(it => {
      let date = new Date(+it.data);
      if(date.getMonth() === 0)
        jan++;
      if(date.getMonth() === 1)
        feb++;
      if(date.getMonth() === 2)
        mar++;
      if(date.getMonth() === 3)
        apr++;
      if(date.getMonth() === 4)
        mai++;
      if(date.getMonth() === 5)
        iun++;
      if(date.getMonth() === 6)
        iul++;
      if(date.getMonth() === 7)
        aug++;
      if(date.getMonth() === 8)
        sep++;
      if(date.getMonth() === 9)
        oct++;
      if(date.getMonth() === 10)
        nov++;
      if(date.getMonth() === 11)
        dec++;
    });
    let data = {jan: jan, feb: feb, mar: mar, apr: apr, mai: mai, iun: iun,
            iul: iul, aug: aug, sep: sep, oct: oct, nov: nov, dec: dec
    };
    return data;
  }

  ngOnInit() {
  }

  getStatisticsForBrand(event){

    if(event.value.name === 'Samsung'){
      this.isDisabled = false;
    }

    else {
      this.isDisabled = true;
      this.getStatisticsForSeries(event.value.name, event)
    }
  }

  getStatisticsForSeries(brand, event){
    this.data.datasets = [];

    if(brand === event.value.name) {

      this.phoneService.getModelsOfBrands(brand).subscribe(item => {
        item.forEach(it => {
          this.pushModelToDataset(it);
        })
      });
    }

    else
      this.phoneService.getModelsOfSeries(brand.toLowerCase(), event.value.name).subscribe(item => {

      item.forEach(it => {
        this.pushModelToDataset(it);
      })

    });

  }

  private pushModelToDataset(it) {

    let phones = [];

    this.repairPFService.getClientsPFList().subscribe(clients => {

      clients.forEach(client => {

        let auxI = client.phoneList.filter(ph => {
          return ph.phoneModel === it.name
        });

        if (auxI.length > 0)
          phones.push({
            phone: auxI,
            data: client.addedDate
          });
      });

      if (phones.length > 0) {

        let headers = {
          label: it.name,
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
        };

        this.data.datasets.push(this.getDataset(this.getMonthlyCount(phones), headers));
        this.chart.refresh();

      }

    })

  }

  private getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

}


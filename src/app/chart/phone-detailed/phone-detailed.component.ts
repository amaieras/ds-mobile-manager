import { Component, OnInit } from '@angular/core';
import {RepairPFDetailService} from "../../repairs/repairPF/repair-pf-detail.service";

@Component({
  selector: 'app-phone-detailed',
  templateUrl: './phone-detailed.component.html',
  styleUrls: ['./phone-detailed.component.scss']
})
export class PhoneDetailedComponent implements OnInit {

  data: any;

  constructor(private repairPFService: RepairPFDetailService) {

    this.repairPFService.getClientsPFList().subscribe(item => {

      this.data = {
        labels: [ 'Ianuarie ','Februarie ','Martie','Aprilie','Mai', 'Iunie', 'Iulie', 'August',
          'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
        datasets: []
      };

      let iphones = [],samsung = [], htc = [], huawei = [];


      item.forEach(it => {

        let auxI = it.phoneList.filter(ph =>
        {
          return ph.phoneBrand === 'Iphone' || ph.phoneBrand === 'APPLE'
        });
        if (auxI.length > 0)
        iphones.push({
          phone: auxI,
          data: it.addedDate
        });

        let auxS = it.phoneList.filter(ph => {
          return ph.phoneBrand === 'Samsung'
        });
        if(auxS.length > 0)
          samsung.push({
            phone: auxS,
            data: it.addedDate
          });


        let auxHt = it.phoneList.filter(ph => {
          return ph.phoneBrand === 'HTC'
        });
        if(auxHt.length > 0)
          htc.push({
            phone: auxHt,
            data: it.addedDate
          });

        let auxHw = it.phoneList.filter(ph => {
          return ph.phoneBrant === 'Huawei'
        });
        if(auxHw.length > 0)
          huawei.push({
            phone: auxHw,
            data: it.addedDate
          });
      });

      let obj: any;

      let headers = {
        label: 'IPHONE',
        backgroundColor: '#0b1de5',
        borderColor: '#1d19f5',
      };

      this.data.datasets.push(this.getDataset(this.getMonthlyCount(iphones), headers));


      headers = {
        label: 'SAMSUNG',
        backgroundColor: '#e3e4e6',
        borderColor: '#b6b7b9',
      };

      this.data.datasets.push(this.getDataset(this.getMonthlyCount(samsung), headers));

      headers = {
        label: 'HTC',
        backgroundColor: '#36e53e',
        borderColor: '#42f571',
      };

      this.data.datasets.push(this.getDataset(this.getMonthlyCount(htc), headers));

      headers = {
        label: 'HUAWEI',
        backgroundColor: '#e5e50a',
        borderColor: '#f5f240',
      };

      this.data.datasets.push(this.getDataset(this.getMonthlyCount(huawei), headers));

    });

  }
  getDataset(item, headers){

    let hidden: boolean;
    hidden = true;

    if(headers.label === 'IPHONE')
      hidden = false;


    let obj = {
      label: headers.label,
      backgroundColor: headers.backgroundColor,
      borderColor: headers.borderColor,
      hidden: hidden,
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

}

import { Component, OnInit } from '@angular/core';
import {RepairPFDetailService} from "../../repairs/repairPF/repair-pf-detail.service";
import {PhoneListService} from "../../clients/clientPF/phone-list/phone-list.service";
import {SelectItem} from "primeng/primeng";

@Component({
  selector: 'app-phone-detailed',
  templateUrl: './phone-detailed.component.html',
  styleUrls: ['./phone-detailed.component.scss']
})
export class PhoneDetailedComponent implements OnInit {

  data: any;
  series: any;
  phoneBrands: SelectItem[];
  isDisabled: boolean;
  selectedYear: SelectItem;
  selectedSeries: SelectItem;

  constructor(private repairPFService: RepairPFDetailService, private phoneService: PhoneListService) {
    this.isDisabled = true;

    this.series = [{name: 'S'},{name: 'A'},{name: 'J'}, {name: 'NOTE'}];

     this.initChartDataset();


    this.phoneService.getBrandList().subscribe(item => {
      this.phoneBrands =  item
    });

    // this.repairPFService.getClientsPFList().subscribe(item => {
    //
    //   this.initChartDataset();
    //   let iphones=[], htc=[], samsung=[], huawei=[];
    //
    //   item.forEach(it => {
    //
    //     let auxI = it.phoneList.filter(ph =>
    //     {
    //       return ph.phoneBrand === 'Iphone' || ph.phoneBrand === 'APPLE'
    //     });
    //     if (auxI.length > 0)
    //     iphones.push({
    //       phone: auxI,
    //       data: it.addedDate
    //     });
    //
    //     let auxS = it.phoneList.filter(ph => {
    //       return ph.phoneBrand === 'Samsung'
    //     });
    //     if(auxS.length > 0)
    //       samsung.push({
    //         phone: auxS,
    //         data: it.addedDate
    //       });
    //
    //
    //     let auxHt = it.phoneList.filter(ph => {
    //       return ph.phoneBrand === 'HTC'
    //     });
    //     if(auxHt.length > 0)
    //       htc.push({
    //         phone: auxHt,
    //         data: it.addedDate
    //       });
    //
    //     let auxHw = it.phoneList.filter(ph => {
    //       return ph.phoneBrant === 'Huawei'
    //     });
    //     if(auxHw.length > 0)
    //       huawei.push({
    //         phone: auxHw,
    //         data: it.addedDate
    //       });
    //   });
    //
    //   let obj: any;
    //
    //   let headers = {
    //     label: 'IPHONE',
    //     backgroundColor: '#0b1de5',
    //     borderColor: '#1d19f5',
    //   };
    //
    //   this.data.datasets.push(this.getDataset(this.getMonthlyCount(iphones), headers));
    //
    //
    //   headers = {
    //     label: 'SAMSUNG',
    //     backgroundColor: '#e3e4e6',
    //     borderColor: '#b6b7b9',
    //   };
    //
    //   this.data.datasets.push(this.getDataset(this.getMonthlyCount(samsung), headers));
    //
    //   headers = {
    //     label: 'HTC',
    //     backgroundColor: '#36e53e',
    //     borderColor: '#42f571',
    //   };
    //
    //   this.data.datasets.push(this.getDataset(this.getMonthlyCount(htc), headers));
    //
    //   headers = {
    //     label: 'HUAWEI',
    //     backgroundColor: '#e5e50a',
    //     borderColor: '#f5f240',
    //   };
    //
    //   this.data.datasets.push(this.getDataset(this.getMonthlyCount(huawei), headers));
    //
    // });

  }

  private initChartDataset() {
    this.data = {
      labels: ['Ianuarie ', 'Februarie ', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August',
        'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
      datasets: []
    };
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
console.log(data);
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
    }
  }
  getStatisticsForSeries(brand, event){
    this.data.datasets = [];
    this.phoneService.getModelsOfSeries(brand.toLowerCase(), event.value.name).subscribe(item => {
      item.forEach(it => {
        let phones = [];
        this.repairPFService.getClientsPFList().subscribe(clients => {
          this.initChartDataset();


          clients.forEach(client => {
            let auxI = client.phoneList.filter(ph => {
              return ph.phoneModel === it.name
            });
            if(auxI.length > 0)
              phones.push({
                phone: auxI,
                data: client.addedDate
              })
          });
          if(phones.length > 0){

            let headers = {
              label: it.name,
              backgroundColor: '#0b1de5',
              borderColor: '#1d19f5',
              data: [0,0,0,0,0,0,0,0,1,1,1,0]
            };
            //this.data.datasets.push(this.getDataset(this.getMonthlyCount(phones), headers));
            this.data.datasets.push(headers);
            console.log(this.data.datasets)
          }
        });


      })
    });

    // this.phoneService.getModelsOfBrands(this.selectedYear.name).subscribe(it => {
    //   it.forEach(item => {
    //     console.log('abc');
    //     console.log(item);
    //     // this.initChartDataset();
    //
    //     this.repairPFService.getClientsPFList().subscribe(clients => {
    //       clients.forEach(client => {
    //         console.log('haa')
    //
    //         let auxI = client.phoneList.filter(ph =>
    //         {
    //           console.log(event.value.name);
    //           ph.phoneModel.match(event.value.name);
    //           return ph.phoneBrand === this.selectedYear.value
    //         });
    //
    //         if (auxI.length > 0)
    //           phones.push({
    //             phone: auxI,
    //             data: client.addedDate
    //           });
    //       })
    //     })
    //
    //   })
    //
    // })

  }

}


import { Component, OnInit } from '@angular/core';
import {CostService} from '../cost.service';

@Component({
  selector: 'app-cost-list',
  templateUrl: './cost-list.component.html',
  styleUrls: ['./cost-list.component.scss']
})
export class CostListComponent implements OnInit {
  currDate = new Date();
  totalCostPerDay: Number = 0;
  totalCountCostsPerDay: Number = 0;
  costsPerDay: any;
  layoutType: String = "grid";
  constructor(private _costService: CostService, ) { }

  ngOnInit() {
    this.getCostsForDate(new Date);
  }

  getCostsForDate(event) {
    this.currDate = event;
    this._costService.getCostList().subscribe(costs => {
      this.totalCostPerDay = 0;
      const filteredCosts = costs.filter(cost => {
          return new Date(+cost.addedDate).toDateString() === this.currDate.toDateString() && cost.costType.toLowerCase() !== "altele";
      })
      this.totalCountCostsPerDay = filteredCosts.length;
      this.costsPerDay = filteredCosts;
      filteredCosts.forEach(filteredCost => {
       this.totalCostPerDay += filteredCost.costValue;
      });
    });
  }
}

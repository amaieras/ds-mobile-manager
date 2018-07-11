import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {

  constructor() { }

   getAveragePerMonthOfYear(clientsNr: number, year: number){
    if(year === 2017){
      return (clientsNr/2).toPrecision(2)
    }else{
      return (clientsNr/(new Date().getMonth()+1)).toPrecision(2);
    }
  }

   getAveragePerDayInMonth(clientsNr: number, month: number, year: number){

    let auxDate = new Date();
    let daysNo = 0;

    if (month === auxDate.getMonth() && year === auxDate.getFullYear()) {
      daysNo = auxDate.getDate();
    }
    else{
      daysNo = 22;
    }
    return (clientsNr/daysNo).toPrecision(2);
  }

   getAveragePerDayInYear(clientsNr: number, year: number){

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

   daysBetweendDates(firstDate: Date, secondDate: Date) {
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  }

}

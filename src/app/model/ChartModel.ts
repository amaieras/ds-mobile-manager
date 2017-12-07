export class ChartModel{

      day: number;
      currentMonth: number;
      lastMonth: number;
      year: number;

  constructor(day, currentMonth, lastMonth, year){

    this.day = day;
    this.currentMonth = currentMonth;
    this.lastMonth = lastMonth;
    this.year = year;
  }
}

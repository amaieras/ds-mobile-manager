import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {SelectItem} from "primeng/primeng";

@Component({
  selector: 'date-filter',
  templateUrl: './date-filter.component.html'
})
export class DateFilterComponent implements OnInit {
  date: number;

  years: SelectItem[];
  months: SelectItem[];
  days: SelectItem[];

  selectedYear: SelectItem;
  selectedMonth: SelectItem;
  selectedDay: SelectItem;
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.date = new Date().getTime();

    let auxDate = new Date(this.date).getDate();
    let auxMonth = new Date(this.date).getMonth();
    let auxYear = new Date(this.date).getFullYear();

    this.initYears();
    this.initMonths();
    this.daysInMonth(auxMonth, auxYear);

    this.selectedDay = this.days[auxDate-1];
    this.selectedYear = this.years.filter(fl => fl.value === auxYear).slice()[0];
    this.selectedMonth = this.months.filter(fl => fl.value === auxMonth).slice()[0];
  }

  private initYears(){
    this.years = [];
    let currentYear = new Date().getFullYear();
    for(let i = 2017; i <= currentYear; i++){
      this.years.push({label:""+i, value: i})
    }
  }
  private initMonths() {
    this.months = [];
    let auxDate = new Date();
    for (let i = 0; i <= 11; i++) {
      auxDate.setMonth(i);
      this.months.push({label: this.getMonthName(auxDate), value: i});
    }
  }

  private daysInMonth(month,year) {
    this.days = [];
    let date = new Date(year, month+1, 0).getDate();
    for(let i = 1; i <= date; i++){
      this.days.push({label: ""+i, value:i});
    }
  }
  private getMonthName(auxDate: Date) {
    var monthName = new Intl.DateTimeFormat("ro-RO", {month: "long"}).format;
    var longName = monthName(auxDate).charAt(0).toUpperCase() + monthName(auxDate).slice(1);
    return  longName ;
  }

  getDataForDate() {
    let auxMonth = this.selectedMonth.value;
    auxMonth++;
    let dateFilter = auxMonth + '-' + this.selectedDay.value + '-' + this.selectedYear.value;
    if(this.selectedMonth != null && this.selectedYear != null) {
      this.daysInMonth(this.selectedMonth.value, this.selectedYear.value);
    }
    this.onDatePicked.emit(new Date(dateFilter));
  }

}

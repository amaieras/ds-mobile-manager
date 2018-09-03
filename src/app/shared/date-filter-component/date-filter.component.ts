import {Component, EventEmitter, OnInit, Output} from "@angular/core";

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material";
import {FormControl} from "@angular/forms";
import {MomentDateAdapter} from "@angular/material-moment-adapter";

import * as _moment from 'moment';

// @ts-ignore
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'date-filter',
  templateUrl: './date-filter.component.html',
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DateFilterComponent implements OnInit {
  date: number;
  dateMat = new FormControl(moment());
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {

  }



  getDataForDate(event) {
    this.onDatePicked.emit(new Date(event.toDate()));
  }

}

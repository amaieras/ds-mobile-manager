import { Component, OnInit } from '@angular/core';
import {ReportTypeListService} from "./report-type-list.service";

@Component({
  selector: 'app-report-type-list',
  templateUrl: './report-type-list.component.html',
  styleUrls: ['./report-type-list.component.scss']
})
export class ReportTypeListComponent implements OnInit {
  reportTypes: any;
  constructor(private _reportTypeListService: ReportTypeListService) { }

  ngOnInit() {
    this.getReportTypes();
  }
  getReportTypes() {
    this.reportTypes = this._reportTypeListService.getReportTypes()
    // Todo: error handling
    this.reportTypes.subscribe(
      data => '',
      err => console.log(err + ' Error fetching client types.')
    );
  }
}

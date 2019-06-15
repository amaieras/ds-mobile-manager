import { Injectable } from '@angular/core';
import {of} from 'rxjs/observable/of';

export class ReportType {
  constructor(public id: number, public type: string, public url: string) { }
}

@Injectable()
export class ReportTypeListService {

  constructor() { }
  getReportTypes(): any {
    return of(reportTypes);
  }
}

export const reportTypes: ReportType[] = [
  {
    id: 1,
    type: 'General',
    url: 'general'
  },
  {
    id: 2,
    type: 'Filtre',
    url: 'filter'
  }
];

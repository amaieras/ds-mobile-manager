import { TestBed, inject } from '@angular/core/testing';

import { ReportTypeListService } from './report-type-list.service';

describe('ReportTypeListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTypeListService]
    });
  });

  it('should be created', inject([ReportTypeListService], (service: ReportTypeListService) => {
    expect(service).toBeTruthy();
  }));
});

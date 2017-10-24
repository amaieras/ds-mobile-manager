import { TestBed, inject } from '@angular/core/testing';

import { DataSharedService } from './data-shared.service';

describe('DataSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSharedService]
    });
  });

  it('should be created', inject([DataSharedService], (service: DataSharedService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ProblemListService } from './problem-list.service';

describe('ProblemList.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProblemListService]
    });
  });

  it('should be created', inject([ProblemListService], (service: ProblemListService) => {
    expect(service).toBeTruthy();
  }));
});

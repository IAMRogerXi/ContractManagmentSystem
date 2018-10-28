import { TestBed, inject } from '@angular/core/testing';

import { ProgressSpinnerService } from './progress-spinner.service';

describe('ProgressSpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressSpinnerService]
    });
  });

  it('should be created', inject([ProgressSpinnerService], (service: ProgressSpinnerService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ContractFilingRequestService } from './contract-filing-request.service';

describe('ContractFilingRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractFilingRequestService]
    });
  });

  it('should be created', inject([ContractFilingRequestService], (service: ContractFilingRequestService) => {
    expect(service).toBeTruthy();
  }));
});

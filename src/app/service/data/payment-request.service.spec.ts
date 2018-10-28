import { TestBed, inject } from '@angular/core/testing';

import { PaymentRequestService } from './payment-request.service';

describe('PaymentRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentRequestService]
    });
  });

  it('should be created', inject([PaymentRequestService], (service: PaymentRequestService) => {
    expect(service).toBeTruthy();
  }));
});

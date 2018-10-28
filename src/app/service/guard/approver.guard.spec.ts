import { TestBed, async, inject } from '@angular/core/testing';

import { ApproverGuard } from './approver.guard';

describe('ApproverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproverGuard]
    });
  });

  it('should ...', inject([ApproverGuard], (guard: ApproverGuard) => {
    expect(guard).toBeTruthy();
  }));
});

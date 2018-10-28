import { TestBed, async, inject } from '@angular/core/testing';

import { PtpTeamGuard } from './ptp-team.guard';

describe('PtpTeamGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PtpTeamGuard]
    });
  });

  it('should ...', inject([PtpTeamGuard], (guard: PtpTeamGuard) => {
    expect(guard).toBeTruthy();
  }));
});

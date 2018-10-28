import { TestBed, async, inject } from '@angular/core/testing';

import { SiteTaxTeamGuard } from './site-tax-team.guard';

describe('SiteTaxTeamGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteTaxTeamGuard]
    });
  });

  it('should ...', inject([SiteTaxTeamGuard], (guard: SiteTaxTeamGuard) => {
    expect(guard).toBeTruthy();
  }));
});

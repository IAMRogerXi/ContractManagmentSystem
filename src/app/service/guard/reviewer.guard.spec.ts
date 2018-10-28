import { TestBed, async, inject } from '@angular/core/testing';

import { ReviewerGuard } from './reviewer.guard';

describe('ReviewerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewerGuard]
    });
  });

  it('should ...', inject([ReviewerGuard], (guard: ReviewerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

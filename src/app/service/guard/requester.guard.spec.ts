import { TestBed, async, inject } from '@angular/core/testing';

import { RequesterGuard } from './requester.guard';

describe('RequesterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequesterGuard]
    });
  });

  it('should ...', inject([RequesterGuard], (guard: RequesterGuard) => {
    expect(guard).toBeTruthy();
  }));
});

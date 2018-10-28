import { TestBed, inject } from '@angular/core/testing';

import { SharepointAclService } from './sharepoint-acl.service';

describe('SharepointAclService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharepointAclService]
    });
  });

  it('should be created', inject([SharepointAclService], (service: SharepointAclService) => {
    expect(service).toBeTruthy();
  }));
});

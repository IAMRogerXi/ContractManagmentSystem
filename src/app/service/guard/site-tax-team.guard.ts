import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharepointAclService } from "@service/acl/sharepoint-acl.service";

@Injectable({
  providedIn: 'root'
})
export class SiteTaxTeamGuard implements CanActivate {

  constructor(private router: Router, private aclService: SharepointAclService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.aclService.isSiteTaxTeamRole().then(
      () => { Promise.resolve(); },
      () => { return this.aclService.isReviewerRole(); }
    ).then(
      () => { Promise.resolve(); },
      () => { return this.aclService.isApproverWL2Role(); }
    ).then(
      () => { Promise.resolve(); },
      () => { return this.aclService.isApproverWL3Role(); }
    ).then(
      () => { Promise.resolve(); },
      () => { return this.aclService.isApproverWL4Role(); }
    ).then(
      () => { Promise.resolve(); },
      () => { return this.aclService.isApproverWL5Role(); }
    ).then(
      () => { Promise.resolve(); },
      () => { return this.aclService.isAdminRole(); }
    ).then(
      () => { return true; },
      () => {
        this.router.navigate(['']);

        return false;
      }
    );
  }

}

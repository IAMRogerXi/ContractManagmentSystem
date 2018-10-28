import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharepointAclService } from "@service/acl/sharepoint-acl.service";

@Injectable({
  providedIn: 'root'
})
export class PtpTeamGuard implements CanActivate {

  constructor(private router: Router, private aclService: SharepointAclService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.aclService.isPTPTeamRole().then(
      () => { Promise.resolve(); },
      () => { return this.aclService.isAdminRole(); }
    ).then(
      () => { return true; },
      () => {
        this.router.navigate(['']);

        return false;
      });
  }

}

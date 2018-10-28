import { Injectable } from '@angular/core';
import { sp } from '@pnp/sp';
import { Role } from '@shared/utility/consts';

@Injectable({
  providedIn: 'root'
})
export class SharepointAclService {

  constructor() { }

  public isRequesterRole(): Promise<boolean> {
    return this.checkRole(Role.Requester);
  }

  public isSiteTaxTeamRole(): Promise<boolean> {
    return this.checkRole(Role.SiteTaxTeam);
  }

  public isReviewerRole(): Promise<boolean> {
    return this.checkRole(Role.Reviewer);
  }

  public isApproverWL2Role(): Promise<boolean> {
    return this.checkRole(Role.ApproverWL2);
  }

  public isApproverWL3Role(): Promise<boolean> {
    return this.checkRole(Role.ApproverWL3);
  }

  public isApproverWL4Role(): Promise<boolean> {
    return this.checkRole(Role.ApproverWL4);
  }

  public isApproverWL5Role(): Promise<boolean> {
    return this.checkRole(Role.ApproverWL5);
  }

  public isAdminRole(): Promise<boolean> {
    return this.checkRole(Role.Admin);
  }

  public isPTPTeamRole(): Promise<boolean> {
    return this.checkRole(Role.PTP);
  }

  public async checkRole(role: string): Promise<boolean> {
    let groups = null;
    let inGroup = false;

    groups = await sp.web.currentUser.get().then(user => {
      return sp.web.siteUsers.getById(user.Id).groups.get();
    });

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].LoginName === role) {
        inGroup = true;
        break;
      }
    }

    if (inGroup)
      return Promise.resolve(true);
    else
      return Promise.reject(false);
  }
}

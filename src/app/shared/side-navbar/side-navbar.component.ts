import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { SharepointAclService } from '@service/acl/sharepoint-acl.service';
import { SideNavBarMenuId } from '@shared/utility/consts';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  menuItemID = -1;
  displayRequester = false;
  displaySiteTaxTeam = false;
  displayReview = false;
  displayApproval = false;
  displayExceptionRequest = false;
  displayPTP = false;
  displayAdmin = false;
  sideNavBarMenuId = SideNavBarMenuId;

  constructor(private router: Router, private aclService: SharepointAclService) { }

  ngOnInit() {
    let roleIsDetermined = false;

    if (this.router.url === "/")
      this.menuItemID = this.sideNavBarMenuId.ContractFilingRequest;

    this.aclService.isAdminRole().then(
      () => {
        if (!roleIsDetermined) {
          this.displayRequester = true;
          this.displaySiteTaxTeam = true;
          this.displayReview = true;
          this.displayApproval = true;
          this.displayExceptionRequest = true;
          this.displayAdmin = true;
          this.displayPTP = true;

          roleIsDetermined = true;
        }
      },
      () => {
        return this.aclService.isApproverWL5Role();
      }
    ).then(
      () => {
        if (!roleIsDetermined) {
          this.displayRequester = true;
          this.displaySiteTaxTeam = true;
          this.displayReview = true;
          this.displayApproval = true;
          this.displayExceptionRequest = true;

          roleIsDetermined = true;
        }
      },
      () => {
        return this.aclService.isApproverWL4Role();
      }
    ).then(
      () => {
        if (!roleIsDetermined) {
          this.displayRequester = true;
          this.displaySiteTaxTeam = true;
          this.displayReview = true;
          this.displayApproval = true;
          this.displayExceptionRequest = true;

          roleIsDetermined = true;
        }
      },
      () => {
        return this.aclService.isApproverWL3Role();
      }
    ).then(
      () => {
        if (!roleIsDetermined) {
          this.displayRequester = true;
          this.displaySiteTaxTeam = true;
          this.displayReview = true;
          this.displayApproval = true;
          this.displayExceptionRequest = true;

          roleIsDetermined = true;
        }
      },
      () => {
        return this.aclService.isApproverWL2Role();
      }
    ).then(
      () => {
        if (!roleIsDetermined) {
          this.displayRequester = true;
          this.displaySiteTaxTeam = true;
          this.displayReview = true;
          this.displayApproval = true;
          this.displayExceptionRequest = true;

          roleIsDetermined = true;
        }
      },
      () => {
        return this.aclService.isReviewerRole();
      }
    ).then(
      () => {
        if (!roleIsDetermined) {
          this.displayRequester = true;
          this.displaySiteTaxTeam = true;
          this.displayReview = true;
          this.displayExceptionRequest = true;

          roleIsDetermined = true;
        }
      },
      () => {
        return this.aclService.isSiteTaxTeamRole();
      }
    ).then(
      () => {
        if (!roleIsDetermined) {
          this.displayRequester = true;
          this.displaySiteTaxTeam = true;
          this.displayExceptionRequest = true;

          roleIsDetermined = true;
        }
      },
      () => {
        return this.aclService.isPTPTeamRole();
      }
    ).then(
      () => {
        if (!roleIsDetermined) {
          this.menuItemID = this.sideNavBarMenuId.PTP;
          this.displayPTP = true;

          roleIsDetermined = true;
        }
      },
      () => {
        return this.aclService.isRequesterRole();
      }
    ).then(
      () => {
        if (!roleIsDetermined)
          this.displayRequester = true;
      },
      () => {
        this.menuItemID = this.sideNavBarMenuId.SupportingDocuments;

        this.displayRequester = false;
        this.displaySiteTaxTeam = false;
        this.displayReview = false;
        this.displayApproval = false;
        this.displayExceptionRequest = false;
        this.displayPTP = false;
        this.displayAdmin = false;
      }
    ).catch(
      (error: any) => {
        console.log(error);
      });
  }

  public sideNavbarClick(currentID) {
    this.menuItemID = currentID;
  }

}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [SideNavbarComponent],
  declarations: [SideNavbarComponent]
})
export class SideNavbarModule { }

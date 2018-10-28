import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, Event, RouterModule, NavigationEnd } from '@angular/router';
import { TopNavBarMenuId } from '@shared/utility/consts';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  id: number = -1;
  contractFilingRequestGroup: boolean = false;
  paymentRequestGroup: boolean = false;
  siteTaxTeamGroup: boolean = false;
  reviewGroup: boolean = false;
  approvalGroup: boolean = false;
  exceptionRequestGroup: boolean = false;
  adminGroup: boolean = false;
  supportingDocumentsGroup: boolean = false;
  ptpGroup: boolean = false;
  topNavBarMenuId = TopNavBarMenuId;

  constructor(
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.resetNavigationGroup();
        this.setNavigationGroup(event.url);
      }
    });
  }

  ngOnInit() {
    this.contractFilingRequestGroup = true;
    this.id = this.topNavBarMenuId.MyContractFilingRequeset;
  }

  private setNavigationGroup(url: string) {
    if (url == "/" || url == "/ContractFilingRequest" || url == "/ListContractFilingRequest") {
      this.contractFilingRequestGroup = true;
      this.id = this.topNavBarMenuId.MyContractFilingRequeset;
    }
    else if (url == "/AddContractFilingRequest") {
      this.contractFilingRequestGroup = true;
      this.id = this.topNavBarMenuId.NewContractFilingRequeset;
    }
    else if (url == "/PaymentRequest" || url == "/ListPaymentRequest") {
      this.paymentRequestGroup = true;
      this.id = this.topNavBarMenuId.MyPaymentRequeset;
    }
    else if (url == "/SiteTaxTeam" || url == "/ListContractFilingRequestTask") {
      this.siteTaxTeamGroup = true;
      this.id = this.topNavBarMenuId.ContractFilingRequestTasks;
    }
    else if (url == "/ListPaymentRequestTask") {
      this.siteTaxTeamGroup = true;
      this.id = this.topNavBarMenuId.PaymentRequestTasksForSiteTaxTeam;
    }
    else if (url == "/Review" || url == "/ListReviewerPaymentRequestTask") {
      this.reviewGroup = true;
      this.id = this.topNavBarMenuId.PaymentRequestTasksForReviewer;
    }
    else if (url == "/Approval" || url == "/ListApproverPaymentRequestTask") {
      this.approvalGroup = true;
      this.id = this.topNavBarMenuId.PaymentRequestTasksForApprover;
    }
    else if (url == "/ExceptionRequest" || url == "/AddExceptionPaymentRequest") {
      this.exceptionRequestGroup = true;
      this.id = this.topNavBarMenuId.ExceptionRequest;
    }
    else if (url == "/Admin") {
      this.adminGroup = true;
      this.id = this.topNavBarMenuId.Admin;
    }
    else if (url == "/SupportingDocuments") {
      this.supportingDocumentsGroup = true;
      this.id = this.topNavBarMenuId.SupportingDocuments;
    }
    else if (url == "/PTP") {
      this.ptpGroup = true;
      this.id = this.topNavBarMenuId.AllPaymentRequestsForPTPTeam;
    }
  }

  private resetNavigationGroup() {
    this.contractFilingRequestGroup = false;
    this.paymentRequestGroup = false;
    this.siteTaxTeamGroup = false;
    this.reviewGroup = false;
    this.approvalGroup = false;
    this.exceptionRequestGroup = false;
    this.adminGroup = false;
    this.supportingDocumentsGroup = false;
    this.ptpGroup = false;
  }

}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [TopNavbarComponent],
  declarations: [TopNavbarComponent]
})
export class TopNavbarModule { }
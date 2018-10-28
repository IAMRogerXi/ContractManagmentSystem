import { Routes } from '@angular/router';
import { SiteTaxTeamGuard } from '@service/guard/site-tax-team.guard';
import { ReviewerGuard } from '@service/guard/reviewer.guard';
import { ApproverGuard } from '@service/guard/Approver.guard';
import { AdminGuard } from '@service/guard/admin.guard';
import { PtpTeamGuard } from '@service/guard/ptp-team.guard';
import { RequesterGuard } from '@service/guard/requester.guard';
import { ListContractFilingRequestComponent } from '@pages/list-contract-filing-request';
import { AddContractFilingRequestComponent } from '@pages/add-contract-filing-request';
import { ListPaymentRequestComponent } from '@pages/list-payment-request';
import { ListContractFilingRequestTaskComponent } from '@pages/list-contract-filing-request-task';
import { ListPaymentRequestTaskComponent } from '@pages/list-payment-request-task';
import { AddExceptionPaymentRequestComponent } from '@pages/add-exception-payment-request';
import { AdminComponent } from '@pages/admin';
import { SupportingDocumentsComponent } from '@pages/supporting-documents';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'ListContractFilingRequest',
        pathMatch: 'full',
        canActivate: [RequesterGuard]
    },
    {
        path: 'ContractFilingRequest',
        redirectTo: 'ListContractFilingRequest',
        pathMatch: 'full',
        canActivate: [RequesterGuard]
    },
    {
        path: 'ListContractFilingRequest',
        component: ListContractFilingRequestComponent,
        pathMatch: 'full',
        canActivate: [RequesterGuard]
    },
    {
        path: 'AddContractFilingRequest',
        component: AddContractFilingRequestComponent,
        pathMatch: 'full',
        canActivate: [RequesterGuard]
    },
    {
        path: 'PaymentRequest',
        redirectTo: 'ListPaymentRequest',
        pathMatch: 'full',
        canActivate: [RequesterGuard]
    },
    {
        path: 'ListPaymentRequest',
        component: ListPaymentRequestComponent,
        pathMatch: 'full',
        canActivate: [RequesterGuard]
    },
    {
        path: 'SiteTaxTeam',
        redirectTo: 'ListContractFilingRequestTask',
        pathMatch: 'full',
        canActivate: [SiteTaxTeamGuard]
    },
    {
        path: 'ListContractFilingRequestTask',
        component: ListContractFilingRequestTaskComponent,
        pathMatch: 'full',
        canActivate: [SiteTaxTeamGuard]
    },
    {
        path: 'ListPaymentRequestTask',
        component: ListPaymentRequestTaskComponent,
        pathMatch: 'full',
        canActivate: [SiteTaxTeamGuard]
    },
    {
        path: 'Review',
        redirectTo: 'ListReviewerPaymentRequestTask',
        pathMatch: 'full',
        canActivate: [SiteTaxTeamGuard]
    },
    {
        path: 'ListReviewerPaymentRequestTask',
        component: ListPaymentRequestTaskComponent,
        pathMatch: 'full',
        canActivate: [ReviewerGuard]
    },
    {
        path: 'Approval',
        redirectTo: 'ListApproverPaymentRequestTask',
        pathMatch: 'full',
        canActivate: [ApproverGuard]
    },
    {
        path: 'ListApproverPaymentRequestTask',
        component: ListPaymentRequestTaskComponent,
        pathMatch: 'full',
        canActivate: [ApproverGuard]
    },
    {
        path: 'ExceptionRequest',
        redirectTo: 'AddExceptionPaymentRequest',
        pathMatch: 'full',
        canActivate: [SiteTaxTeamGuard]
    },
    {
        path: 'AddExceptionPaymentRequest',
        component: AddExceptionPaymentRequestComponent,
        pathMatch: 'full',
        canActivate: [SiteTaxTeamGuard]
    },
    {
        path: 'PTP',
        component: ListPaymentRequestTaskComponent,
        pathMatch: 'full',
        canActivate: [PtpTeamGuard]
    },
    {
        path: 'Admin',
        component: AdminComponent,
        pathMatch: 'full',
        canActivate: [AdminGuard]
    },
    {
        path: 'SupportingDocuments',
        component: SupportingDocumentsComponent,
        pathMatch: 'full'
    },
];

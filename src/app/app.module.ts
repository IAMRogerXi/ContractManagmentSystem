import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ROUTES } from '@shared/utility/routes';
import { MatProgressSpinnerModule } from '@angular/material';
import { SideNavbarModule } from '@shared/side-navbar';
import { TopNavbarModule } from '@shared/top-navbar';
import { SiteTaxTeamGuard } from '@service/guard/site-tax-team.guard';
import { AddContractFilingRequestModule } from '@pages/add-contract-filing-request';
import { ListContractFilingRequestModule } from '@pages/list-contract-filing-request';
import { ListPaymentRequestModule } from '@pages/list-payment-request';
import { ListContractFilingRequestTaskModule } from '@pages/list-contract-filing-request-task';
import { ListPaymentRequestTaskModule } from '@pages/list-payment-request-task';
import { ViewContractFilingRequestModule } from '@pages/view-contract-filing-request';
import { AddPaymentRequestModule } from '@pages/add-payment-request';
import { ViewPaymentRequestModule } from '@pages/view-payment-request';
import { UpdateContractFilingRequestModule } from '@pages/update-contract-filing-request';
import { UpdatePaymentRequestModule } from '@pages/update-payment-request';
import { UpdateContractFilingRequestOwnerModule } from '@pages/update-contract-filing-request-owner';
import { UpdateContractFilingIdComponent } from './pages/update-contract-filing-id/update-contract-filing-id.component';
import { AdminModule } from '@pages/admin';
import { SupportingDocumentsModule } from '@pages/supporting-documents';
import { ViewPaymentRequestTaskModule } from '@pages/view-payment-request-task';
import { ViewContractFilingRequestTaskModule } from '@pages/view-contract-filing-request-task';
import { MessageBoxModule } from '@pages/message-box';
import { CloseContractFilingRequestModule } from '@pages/close-contract-filing-request';
import { CancelContractFilingRequestModule } from '@pages/cancel-contract-filing-request';
import { CancelPaymentRequestModule } from '@pages/cancel-payment-request';
import { CalculateTaxModule } from '@pages/calculate-tax';
import { AddExceptionPaymentRequestModule } from '@pages/add-exception-payment-request';
import { UploadTaxDocumentModule } from './pages/upload-tax-document';
import { ClosePaymentRequestModule } from './pages/close-payment-request';

@NgModule({
  declarations: [
    AppComponent,
    UpdateContractFilingIdComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MatProgressSpinnerModule,
    SideNavbarModule,
    TopNavbarModule,
    ListContractFilingRequestModule,
    AddContractFilingRequestModule,
    ViewContractFilingRequestModule,
    AddPaymentRequestModule,
    ListPaymentRequestModule,
    ListContractFilingRequestTaskModule,
    ListPaymentRequestTaskModule,
    ViewPaymentRequestModule,
    AdminModule,
    SupportingDocumentsModule,
    ViewPaymentRequestTaskModule,
    ViewContractFilingRequestTaskModule,
    MessageBoxModule,
    CloseContractFilingRequestModule,
    CancelContractFilingRequestModule,
    UpdateContractFilingRequestOwnerModule,
    CalculateTaxModule,
    AddExceptionPaymentRequestModule,
    UpdateContractFilingRequestModule,
    CancelPaymentRequestModule,
    UpdatePaymentRequestModule,
    UploadTaxDocumentModule,
    ClosePaymentRequestModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: ''
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    SiteTaxTeamGuard,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

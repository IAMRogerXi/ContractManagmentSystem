import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatDialog,
  MatFormFieldModule,
} from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PaymentRequestStage, PaymentRequestStatus } from '@shared/utility/consts';
import { PaymentRequest } from '@model/PaymentRequest';
import { DialogFollowingAction } from '@shared/utility/consts';
import { ViewPaymentRequestComponent } from '@pages/view-payment-request';
import { ViewPaymentRequestTaskComponent } from '@pages/view-payment-request-task';
import { UploadTaxDocumentComponent } from '@pages/upload-tax-document';
import { ClosePaymentRequestComponent } from '@pages/close-payment-request';
import { PaymentRequestService } from '@service/data/payment-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { Router } from '@angular/router';
import { CalculateTaxComponent } from "@pages/calculate-tax";
import { CommonService } from '@service/data/common.service';
import { MetadataService } from '@service/data/metadata.service';
import { SharepointAclService } from '@service/acl/sharepoint-acl.service';

@Component({
  selector: 'app-list-payment-request-task',
  templateUrl: './list-payment-request-task.component.html',
  styleUrls: ['./list-payment-request-task.component.css']
})
export class ListPaymentRequestTaskComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['colRequestID', 'colContractID', 'colVendorID', 'colRequestStatus', 'actions'];
  dataSource = null;
  requestStatus = PaymentRequestStatus;
  paymentRequestStage = PaymentRequestStage;
  currentStage: number;
  companyCode: string = "";

  constructor(private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private sharepointAclService: SharepointAclService,
    private metadataService: MetadataService,
    private paymentRequestService: PaymentRequestService,
    private progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit() {
    let isRoleDetermined = false;

    if (this.router.url == "/ListPaymentRequestTask") {
      this.currentStage = this.paymentRequestStage.SiteTaxTeamStage;

      this.commonService.getCurrentUser().then(
        (result) => {
          return this.metadataService.getMetadataSiteTaxAccountantMappingList(result.Id);
        }
      ).then(
        (result) => {
          if (result != null && result.length != 0)
            this.companyCode = result[0].colCompanyCode;

          this.loadListData();
        }
      ).catch(
        (error: any) => {
          console.log(error);
        }
      );
    }
    else if (this.router.url == "/ListReviewerPaymentRequestTask") {
      this.currentStage = this.paymentRequestStage.ReviewerStage;

      this.loadListData();
    }
    else if (this.router.url == "/ListApproverPaymentRequestTask") {
      this.sharepointAclService.isApproverWL2Role().then(
        () => {
          this.currentStage = this.paymentRequestStage.ApproverWL2Stage;

          isRoleDetermined = true;
        },
        () => {
          return this.sharepointAclService.isApproverWL3Role();
        }
      ).then(
        () => {
          if (!isRoleDetermined) {
            this.currentStage = this.paymentRequestStage.ApproverWL3Stage;

            isRoleDetermined = true;
          }
        },
        () => {
          return this.sharepointAclService.isApproverWL4Role();
        }
      ).then(
        () => {
          if (!isRoleDetermined) {
            this.currentStage = this.paymentRequestStage.ApproverWL4Stage;

            isRoleDetermined = true;
          }
        },
        () => {
          return this.sharepointAclService.isApproverWL5Role();
        }
      ).then(
        () => {
          if (!isRoleDetermined)
            this.currentStage = this.paymentRequestStage.ApproverWL5Stage;

          this.loadListData();
        },
        () => {
          this.currentStage = -1;
        }
      ).catch(
        (error: any) => {
          console.log(error);
        }
      );
    }
    else if (this.router.url == "/PTP") {
      this.currentStage = this.paymentRequestStage.PTP;

      this.loadListData();
    }
  }

  public onbtnViewClick(itemId: number) {
    this.dialog.open(ViewPaymentRequestComponent, {
      width: "70%",
      height: "80%",
      data: {
        itemId: itemId
      },
    });
  }

  public onbtnViewTaskClick(itemId: number, stage: number, requestId?: string, companyCode?: string, amountInEURO?: string, contractID?: string, exceptionPaymentRequest?: string) {
    let dialogRef: any;

    if (stage === PaymentRequestStage.SiteTaxTeamStage)
      dialogRef = this.dialog.open(CalculateTaxComponent, {
        width: "70%",
        height: "80%",
        data: {
          itemId: itemId,
          companyCode: companyCode
        },
      });
    else if (stage === PaymentRequestStage.ReviewerStage)
      dialogRef = this.dialog.open(ViewPaymentRequestTaskComponent, {
        width: "50%",
        height: "40%",
        data: {
          itemId: itemId,
          requestId: requestId,
          stage: stage,
          amountInEURO: amountInEURO,
        },
      });
    else if (stage === PaymentRequestStage.ApproverWL2Stage ||
      stage === PaymentRequestStage.ApproverWL3Stage ||
      stage === PaymentRequestStage.ApproverWL4Stage ||
      stage === PaymentRequestStage.ApproverWL5Stage)
      dialogRef = this.dialog.open(ViewPaymentRequestTaskComponent, {
        width: "50%",
        height: "40%",
        data: {
          itemId: itemId,
          requestId: requestId,
          stage: stage,
          amountInEURO: amountInEURO,
          contractID: contractID,
          exceptionPaymentRequest: exceptionPaymentRequest
        },
      });

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.followingAction == DialogFollowingAction.Refresh)
        this.loadListData();
    });
  }

  public onbtnUploadDocumentClick(itemId: number) {
    let dialogRef: any;

    dialogRef = this.dialog.open(UploadTaxDocumentComponent, {
      width: "50%",
      height: "40%",
      data: {
        itemId: itemId
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.followingAction == DialogFollowingAction.Refresh)
        this.loadListData();
    });
  }

  public onbtnCloseClick(itemId: number, requestId: string) {
    let dialogRef: any;

    dialogRef = this.dialog.open(ClosePaymentRequestComponent,
      {
        width: "30%",
        height: "15%",
        data: {
          itemId: itemId,
          requestId: requestId
        },
      }
    );

    dialogRef.afterClosed().subscribe(
      () => {
        if (dialogRef.componentInstance.followingAction == DialogFollowingAction.Refresh)
          this.loadListData();
      }
    );
  }

  private loadListData() {
    let filter: string = "";

    if (this.currentStage == this.paymentRequestStage.SiteTaxTeamStage && this.companyCode != "")
      filter = "colCompanyCode eq '" + this.companyCode + "' and " +
        "(colRequestStatus eq '" + PaymentRequestStatus.PendingSiteTaxTeam + "' or " +
        "colRequestStatus eq '" + PaymentRequestStatus.ReturnedFromReviewer + "' or " +
        "colRequestStatus eq '" + PaymentRequestStatus.Approved + "')";
    else if (this.currentStage == this.paymentRequestStage.ReviewerStage)
      filter = "colRequestStatus eq '" + PaymentRequestStatus.PendingReviewer + "' or colRequestStatus eq '" + PaymentRequestStatus.ReturnedFromApprover + "'";
    else if (this.currentStage == this.paymentRequestStage.ApproverWL2Stage)
      filter = "colRequestStatus eq '" + PaymentRequestStatus.PendingApproverWL2 + "'";
    else if (this.currentStage == this.paymentRequestStage.ApproverWL3Stage)
      filter = "colRequestStatus eq '" + PaymentRequestStatus.PendingApproverWL3 + "'";
    else if (this.currentStage == this.paymentRequestStage.ApproverWL4Stage)
      filter = "colRequestStatus eq '" + PaymentRequestStatus.PendingApproverWL4 + "'";
    else if (this.currentStage == this.paymentRequestStage.ApproverWL5Stage)
      filter = "colRequestStatus eq '" + PaymentRequestStatus.PendingApproverWL5 + "'";
    else if (this.currentStage == this.paymentRequestStage.PTP)
      filter = "colRequestStatus eq '" + PaymentRequestStatus.PendingPTP + "'";

    if (filter == "")
      return;

    this.progressSpinnerService.start();

    this.paymentRequestService.getItems(
      [
        'Id',
        'colCompanyCode',
        'colRequestID',
        'colContractID',
        'colRequestStatus',
        'colVendorID',
        "colAmountInEURO",
        "colContractID",
        "colExceptionPaymentRequest"
      ],
      filter
    ).then(
      (requests: PaymentRequest[]) => {
        this.progressSpinnerService.complete();

        this.dataSource = new MatTableDataSource<PaymentRequest>(requests);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        this.progressSpinnerService.complete();

        console.log(error);
      }
    );
  }

}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    CdkTreeModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
  ],
  entryComponents: [
    ViewPaymentRequestComponent,
    ViewPaymentRequestTaskComponent,
    CalculateTaxComponent,
    UploadTaxDocumentComponent,
    ClosePaymentRequestComponent,
  ],
  exports: [
    ListPaymentRequestTaskComponent
  ],
  declarations: [
    ListPaymentRequestTaskComponent
  ]
})
export class ListPaymentRequestTaskModule { }
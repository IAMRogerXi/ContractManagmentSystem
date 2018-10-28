import { NgModule, Inject, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
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
  MatFormFieldModule,
} from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PaymentRequestService } from '@service/data/payment-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { Message, PaymentRequestStatus, ApproverThreshold, DialogFollowingAction } from '@shared/utility/consts';
import { MessageBoxComponent } from '@pages/message-box';
import { PaymentRequestStage } from '@shared/utility/consts';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { MetadataService } from '@service/data/metadata.service';

@Component({
  selector: 'app-view-payment-request-task',
  templateUrl: './view-payment-request-task.component.html',
  styleUrls: ['./view-payment-request-task.component.css']
})
export class ViewPaymentRequestTaskComponent implements OnInit {

  requestId: string;
  comment: string = "";
  txtComment: FormControl = new FormControl('');
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewPaymentRequestTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private progressSpinnerService: ProgressSpinnerService,
    private metadataService: MetadataService,
    private contractFilingRequestService: ContractFilingRequestService,
    private paymentRequestDataService: PaymentRequestService) {
    this.requestId = this.data["requestId"];
  }

  ngOnInit() {
  }

  public onbtnApproveClick() {
    let nextStatus: string = "";
    let contractItemId: number;
    let remainedPaymentCounter: string = "";
    let remainedUnpayedAmount: string = "";
    let amountInEURO: string = "";

    if (this.data["stage"] == PaymentRequestStage.ReviewerStage) {
      if (Number(this.data["amountInEURO"]) <= ApproverThreshold.ApproverWL4)
        nextStatus = PaymentRequestStatus.PendingApproverWL2;
      else
        nextStatus = PaymentRequestStatus.PendingApproverWL3;
    }
    else if (this.data["stage"] == PaymentRequestStage.ApproverWL2Stage) {
      if (Number(this.data["amountInEURO"]) <= ApproverThreshold.ApproverWL3)
        nextStatus = PaymentRequestStatus.Approved;
      else
        nextStatus = PaymentRequestStatus.PendingApproverWL3;
    }
    else if (this.data["stage"] == PaymentRequestStage.ApproverWL3Stage) {
      if (Number(this.data["amountInEURO"]) <= ApproverThreshold.ApproverWL4)
        nextStatus = PaymentRequestStatus.Approved;
      else
        nextStatus = PaymentRequestStatus.PendingApproverWL4;
    }
    else if (this.data["stage"] == PaymentRequestStage.ApproverWL4Stage) {
      if (Number(this.data["amountInEURO"]) <= ApproverThreshold.ApproverWL5)
        nextStatus = PaymentRequestStatus.Approved;
      else
        nextStatus = PaymentRequestStatus.PendingApproverWL5;
    }
    else if (this.data["stage"] == PaymentRequestStage.ApproverWL5Stage)
      nextStatus = PaymentRequestStatus.Approved;

    this.updateItem(
      {
        'colApproverComment': this.comment,
        'colRequestStatus': nextStatus
      },
      {
        message: Message.ApprovePaymentRequest,
        width: "25%",
        height: "15%"
      }
    ).then(
      (): any => {
        if (!(String(this.data["exceptionPaymentRequest"]).toUpperCase() == "TRUE") && nextStatus == PaymentRequestStatus.Approved) {
          return this.contractFilingRequestService.getItems([
            "Id",
            "colRemainedPaymentCounter",
            "colAmountInEURO",
            "colOpenContract",
            "colCurrency"
          ],
            "colContractID eq '" + this.data["contractID"] + "'");
        }
      }
    ).then(
      (result): any => {
        if (!(String(this.data["exceptionPaymentRequest"]).toUpperCase() == "TRUE") && nextStatus == PaymentRequestStatus.Approved && result != null && result.length != 0) {
          contractItemId = result[0].Id;
          remainedPaymentCounter = String(Number(result[0].colRemainedPaymentCounter) - 1);

          if (result[0].colOpenContract == "是") {
            amountInEURO = String(Number(result[0].colAmountInEURO) - Number(this.data["amountInEURO"]));

            return this.metadataService.getMetadataCurrencyList(result[0].colCurrency);
          }
        }
      }
    ).then(
      (result) => {
        if (!(String(this.data["exceptionPaymentRequest"]).toUpperCase() == "TRUE") && nextStatus == PaymentRequestStatus.Approved) {
          if (result != null && result.length != 0)
            remainedUnpayedAmount = String((Number(amountInEURO) / Number(result[0].colExchangeToEUR)).toFixed(2));

          this.contractFilingRequestService.updateItem(contractItemId,
            {
              'colRemainedPaymentCounter': remainedPaymentCounter,
              'colRemainedUnpayedAmount': remainedUnpayedAmount,
              'colAmountInEURO': amountInEURO
            });
        }
      }
    ).catch(
      (error: any) => {
        console.log(error);
      }
    );
  }

  public onbtnRejectClick() {
    if (this.comment == "") {
      this.txtComment.markAsTouched();
      this.txtComment.clearValidators();
      this.txtComment.setValidators([Validators.required]);
      this.txtComment.updateValueAndValidity();
    }
    else {
      if (this.data["stage"] == PaymentRequestStage.ReviewerStage)
        this.updateItem(
          {
            'colReviewerComment': this.comment,
            'colRequestStatus': PaymentRequestStatus.ReturnedFromReviewer
          },
          {
            message: Message.RejectPaymentRequest,
            width: "25%",
            height: "15%"
          }
        );
      else if (this.data["stage"] == PaymentRequestStage.ApproverWL2Stage ||
        this.data["stage"] == PaymentRequestStage.ApproverWL3Stage ||
        this.data["stage"] == PaymentRequestStage.ApproverWL4Stage ||
        this.data["stage"] == PaymentRequestStage.ApproverWL5Stage)
        this.updateItem(
          {
            'colApproverComment': this.comment,
            'colRequestStatus': PaymentRequestStatus.ReturnedFromApprover
          },
          {
            message: Message.RejectPaymentRequest,
            width: "25%",
            height: "15%"
          }
        );
    }
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
  }

  private updateItem(data: any, message: any): Promise<any> {
    this.followingAction = DialogFollowingAction.Refresh;
    this.dialogRef.close();
    this.progressSpinnerService.start();

    return this.paymentRequestDataService.updateItem(this.data["itemId"], data).then(
      () => {
        this.progressSpinnerService.complete();
        this.showPopupMessage(message["message"], message["width"], message["height"]);
      }
    ).catch(
      (error: any) => {
        this.progressSpinnerService.complete();
        this.showPopupMessage(Message.ErrorMessage, "25%", "15%");

        console.log(error);
      }
    );
  }

  private showPopupMessage(message: string, width: string, height: string) {
    this.dialog.open(MessageBoxComponent, {
      width: width,
      height: height,
      data: { message: message },
    });
  }

}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CdkTableModule,
    CdkTreeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
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
  ],
  exports: [
    ViewPaymentRequestTaskComponent,
  ],
  declarations: [
    ViewPaymentRequestTaskComponent,
  ]
})
export class ViewPaymentRequestTaskModule { }

import { NgModule, Component, OnInit, Inject } from '@angular/core';
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
  MatFormFieldModule,
} from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Message, DialogFollowingAction } from '@shared/utility/consts';
import { PaymentRequest } from '@model/PaymentRequest';
import { PaymentRequestStatus } from '@shared/utility/consts';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { CommonService } from '@service/data/common.service';
import { MetadataService } from '@service/data/metadata.service'
import { PaymentRequestService } from '@service/data/payment-request.service';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { MessageBoxComponent } from '@pages/message-box';

@Component({
  selector: 'app-add-payment-request',
  templateUrl: './add-payment-request.component.html',
  styleUrls: ['./add-payment-request.component.css']
})
export class AddPaymentRequestComponent implements OnInit {

  metadataCurrency: any[] = [];
  displayMessage: boolean = false;
  message: string = "";
  seed: number;
  request: PaymentRequest = new PaymentRequest();
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddPaymentRequestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private progressSpinnerService: ProgressSpinnerService,
    private commonService: CommonService,
    private metadataService: MetadataService,
    private paymentRequestDataService: PaymentRequestService,
    private contractFilingRequestDataService: ContractFilingRequestService) {
    this.request.colCompanyCode = this.data["companyCode"];
    this.request.colContractID = this.data["contractId"];
  }

  ngOnInit() {
    this.metadataService.getMetadataCurrencyList().then(
      (result): any => {
        this.metadataCurrency = result;
      }).catch(
        (error: any) => {
          console.log(error);
        }
      )
  }

  public onformSubmit() {
    this.followingAction = DialogFollowingAction.Refresh;
    this.dialogRef.close();
    this.progressSpinnerService.start();

    this.request.colRequestStatus = PaymentRequestStatus.PendingSiteTaxTeam;

    this.createItem().then(
      () => {
        this.progressSpinnerService.complete();
        this.showPopupMessage(Message.SubmitPaymentRequestSuccessfully, "25%", "15%");
      }
    ).catch(
      (error: any) => {
        this.progressSpinnerService.complete();
        this.showPopupMessage(Message.ErrorMessage, "25%", "15%");

        console.log(error);
      }
    );
  }

  public onbtnSaveDaftClick() {
    this.request.colRequestStatus = PaymentRequestStatus.Draft;

    this.progressSpinnerService.start();

    this.createItem().then(
      () => {
        this.showMessage(Message.SaveDraftSuccessfully);
        this.progressSpinnerService.complete();
      }
    ).catch(
      (error: any) => {
        this.showMessage(Message.ErrorMessage);
        this.progressSpinnerService.complete();

        console.log(error);
      }
    );
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
  }

  private createItem(): Promise<any> {
    let exchangeRateToEURO: number;

    return this.metadataService.getMetadataCurrencyList(this.request.colCurrency).then(
      (result) => {
        if (result != null && result.length != 0)
          exchangeRateToEURO = Number(result[0].colExchangeToEUR);

        return this.contractFilingRequestDataService.getItem(this.data["itemId"], ["colPaymentRequestSeed"]);
      }
    ).then(
      (result) => {
        this.request.colRequestID = this.data["requestId"] + "_" + result.colPaymentRequestSeed;
        this.seed = Number(result.colPaymentRequestSeed);

        return this.paymentRequestDataService.createItem(
          {
            "colRequestID": this.request.colRequestID,
            "colRequestStatus": this.request.colRequestStatus,
            "colContractID": this.request.colContractID,
            "colCompanyCode": this.request.colCompanyCode,
            "colVendorID": this.request.colVendorID,
            "colVendorName": this.request.colVendorName,
            "colInvoiceID": this.request.colInvoiceID,
            "colBarcode": this.request.colBarcode,
            "colInvoiceAmount": this.request.colInvoiceAmount,
            "colCurrency": this.request.colCurrency,
            "colServiceLocation": this.request.colServiceLocation,
            "colCostCenter": this.request.colCostCenter,
            "colCategory": this.request.colCategory,
            "colIO_WBS": this.request.colIO_WBS,
            "colDO": this.request.colDO,
            "colExceptionPaymentRequest": "FALSE",
            "colAmountInEURO": String((Number(this.request.colInvoiceAmount) * exchangeRateToEURO).toFixed(2)),
            "colComment1": this.request.colComment1,
            "colComment2": this.request.colComment2,
            "colComment3": this.request.colComment3,
            "colComment4": this.request.colComment4,
            "colComment5": this.request.colComment5
          }
        );
      }
    ).then(
      () => {
        this.contractFilingRequestDataService.updateItem(
          this.data["itemId"],
          {
            "colPaymentRequestSeed": String(this.seed + 1)
          }
        );
      }
    ).catch(
      (error) => {
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

  private showMessage(message: string) {
    this.displayMessage = true;
    this.message = message;
    setTimeout(() => {
      this.displayMessage = false;
      this.message = "";
    }, 1500);
  }

}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CdkTableModule,
    CdkTreeModule,
    FormsModule,
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
  ],
  exports: [
    AddPaymentRequestComponent
  ],
  declarations: [
    AddPaymentRequestComponent
  ]
})
export class AddPaymentRequestModule { }

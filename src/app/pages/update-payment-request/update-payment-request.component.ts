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
import { MetadataService } from '@service/data/metadata.service'
import { PaymentRequestService } from '@service/data/payment-request.service';
import { MessageBoxComponent } from '@pages/message-box';

@Component({
  selector: 'app-update-payment-request',
  templateUrl: './update-payment-request.component.html',
  styleUrls: ['./update-payment-request.component.css']
})
export class UpdatePaymentRequestComponent implements OnInit {

  metadataCurrency: any[] = [];
  displayMessage: boolean = false;
  message: string = "";
  request: PaymentRequest = new PaymentRequest();
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdatePaymentRequestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private progressSpinnerService: ProgressSpinnerService,
    private metadataService: MetadataService,
    private paymentRequestService: PaymentRequestService) { }

  ngOnInit() {
    this.metadataService.getMetadataCurrencyList().then(
      (result): any => {
        this.metadataCurrency = result;

        return this.paymentRequestService.getItem(
          this.data["itemId"],
          [
            "colRequestID",
            "colRequestStatus",
            "colContractID",
            "colCompanyCode",
            "colVendorID",
            "colVendorName",
            "colInvoiceID",
            "colBarcode",
            "colInvoiceAmount",
            "colCurrency",
            "colServiceLocation",
            "colCostCenter",
            "colCategory",
            "colIO_WBS",
            "colDO",
            "colComment1",
            "colComment2",
            "colComment3",
            "colComment4",
            "colComment5"
          ]);
      }).then(
        (result) => {
          this.request = result;
        }
      ).catch(
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

    this.updateItem().then(
      () => {
        this.progressSpinnerService.complete();
        this.showPopupMessage(Message.SubmitPaymentRequestSuccessfully, "25%", "15%");
      }).catch(
        (error: any) => {
          this.progressSpinnerService.complete();
          this.showPopupMessage(Message.ErrorMessage, "25%", "15%");

          console.log(error);
        });
  }

  public onbtnSaveDaftClick() {
    this.request.colRequestStatus = PaymentRequestStatus.Draft;

    this.progressSpinnerService.start();

    this.updateItem().then(
      () => {
        this.showMessage(Message.SaveDraftSuccessfully);
        this.progressSpinnerService.complete();
      }).catch(
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

  private updateItem(): Promise<any> {
    return this.paymentRequestService.updateItem(
      this.data["itemId"],
      {
        "colRequestStatus": this.request.colRequestStatus,
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
        "colComment1": this.request.colComment1,
        "colComment2": this.request.colComment2,
        "colComment3": this.request.colComment3,
        "colComment4": this.request.colComment4,
        "colComment5": this.request.colComment5
      });
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
    UpdatePaymentRequestComponent
  ],
  declarations: [
    UpdatePaymentRequestComponent
  ]
})
export class UpdatePaymentRequestModule { }

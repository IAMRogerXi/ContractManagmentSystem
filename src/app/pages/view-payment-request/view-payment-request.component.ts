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
import { PaymentRequest } from '@model/PaymentRequest';
import { PaymentRequestService } from '@service/data/payment-request.service';
import { MessageBoxComponent } from '@pages/message-box';
import { Message, PaymentRequestStatus } from '@shared/utility/consts';

@Component({
  selector: 'app-view-payment-request',
  templateUrl: './view-payment-request.component.html',
  styleUrls: ['./view-payment-request.component.css']
})
export class ViewPaymentRequestComponent implements OnInit {

  requestStatus = PaymentRequestStatus;
  request: PaymentRequest = new PaymentRequest();

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewPaymentRequestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private paymentRequestService: PaymentRequestService) { }

  ngOnInit() {
    this.paymentRequestService.getItem(
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
        "colComment5",
        'colRequestStatus',
        'colIncludeTax',
        'colExchangeRate',
        'colTaxableIncoming',
        'colProfitMargin',
        'colIncomeTax',
        'colValueAddedTax',
        'colCityPlanningTax',
        'colEducationFund',
        'colLocalEducationFund',
        'colWaterConstructionFunds',
        'colOtherTaxName1',
        'colOtherTaxRate1',
        'colOtherTax1',
        'colOtherTaxName2',
        'colOtherTaxRate2',
        'colOtherTax2',
        'colOtherTaxName3',
        'colOtherTaxRate3',
        'colOtherTax3',
        'colOtherTaxName4',
        'colOtherTaxRate4',
        'colOtherTax4',
        'colOtherTaxName5',
        'colOtherTaxRate5',
        'colOtherTax5',
        'colOtherTaxName6',
        'colOtherTaxRate6',
        'colOtherTax6',
        'colSiteTaxTeamComment',
        'colExceptionPaymentRequest'
      ]
    ).then(
      (result) => {
        this.request = result;
      }
    ).catch(
      (error: any) => {
        this.dialogRef.close();
        this.showPopupMessage(Message.ErrorMessage, "25%", "15%");

        console.log(error);
      }
    );
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
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
    ViewPaymentRequestComponent,
  ],
  declarations: [
    ViewPaymentRequestComponent,
  ]
})
export class ViewPaymentRequestModule { }
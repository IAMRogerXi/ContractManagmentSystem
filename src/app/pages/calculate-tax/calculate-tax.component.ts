import { NgModule, Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, NgForm } from '@angular/forms';
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
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { MetadataService } from '@service/data/metadata.service';
import { PaymentRequest } from '@model/PaymentRequest';
import { PaymentRequestService } from '@service/data/payment-request.service';
import { PaymentRequestStatus, DialogFollowingAction } from '@shared/utility/consts';
import { MessageBoxComponent } from '@pages/message-box';
import { Message } from '@shared/utility/consts';

@Component({
  selector: 'app-calculate-tax',
  templateUrl: './calculate-tax.component.html',
  styleUrls: ['./calculate-tax.component.css']
})
export class CalculateTaxComponent implements OnInit {

  metadataProfitMargin: any[] = [];
  metadataIncomeTaxRate: any[] = [];
  metadataValueAddedTaxRate: any[] = [];
  metadataTaxRate: any[] = [];
  metadataOtherTaxCategory: any[] = [];
  siteTaxTeamComment: string = "";
  txtSiteTaxTeamComment: FormControl = new FormControl('');
  request: PaymentRequest = new PaymentRequest();
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<CalculateTaxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private progressSpinnerService: ProgressSpinnerService,
    private metadataService: MetadataService,
    private paymentRequestDataService: PaymentRequestService) { }

  ngOnInit() {
    this.metadataService.getMetadataProfitMarginList().then(
      (result): Promise<any> => {
        this.metadataProfitMargin = result;

        return this.metadataService.getMetadataIncomeTaxRateList();
      }
    ).then(
      (result): Promise<any> => {
        this.metadataIncomeTaxRate = result;

        return this.metadataService.getMetadataValueAddedTaxRateList();
      }
    ).then(
      (result): Promise<any> => {
        this.metadataValueAddedTaxRate = result;

        return this.metadataService.getMetadataTaxRateList(this.data["companyCode"]);
      }
    ).then(
      (result): Promise<any> => {
        this.metadataTaxRate = result;

        return this.metadataService.getMetadataOtherTaxCategoryList();
      }
    ).then(
      (result) => {
        this.metadataOtherTaxCategory = result;
      }
    ).catch(
      (error: any) => {
        console.log(error);
      }
    )
  }

  public onformSubmit() {
    this.request.colRequestStatus = PaymentRequestStatus.PendingReviewer;
    this.updateItem(
      {
        'colRequestStatus': this.request.colRequestStatus,
        'colIncludeTax': this.request.colIncludeTax,
        'colExchangeRate': this.request.colExchangeRate,
        'colTaxableIncoming': this.request.colTaxableIncoming,
        'colProfitMargin': this.request.colProfitMargin,
        'colIncomeTax': this.request.colIncomeTax,
        'colValueAddedTax': this.request.colValueAddedTax,
        'colCityPlanningTax': this.request.colCityPlanningTax,
        'colEducationFund': this.request.colEducationFund,
        'colLocalEducationFund': this.request.colLocalEducationFund,
        'colWaterConstructionFunds': this.request.colWaterConstructionFunds,
        'colOtherTaxName1': this.request.colOtherTaxName1,
        'colOtherTaxRate1': this.request.colOtherTaxRate1,
        'colOtherTax1': this.request.colOtherTax1,
        'colOtherTaxName2': this.request.colOtherTaxName2,
        'colOtherTaxRate2': this.request.colOtherTaxRate2,
        'colOtherTax2': this.request.colOtherTax2,
        'colOtherTaxName3': this.request.colOtherTaxName3,
        'colOtherTaxRate3': this.request.colOtherTaxRate3,
        'colOtherTax3': this.request.colOtherTax3,
        'colOtherTaxName4': this.request.colOtherTaxName4,
        'colOtherTaxRate4': this.request.colOtherTaxRate4,
        'colOtherTax4': this.request.colOtherTax4,
        'colOtherTaxName5': this.request.colOtherTaxName5,
        'colOtherTaxRate5': this.request.colOtherTaxRate5,
        'colOtherTax5': this.request.colOtherTax5,
        'colOtherTaxName6': this.request.colOtherTaxName6,
        'colOtherTaxRate6': this.request.colOtherTaxRate6,
        'colOtherTax6': this.request.colOtherTax6,
        'colSiteTaxTeamComment': this.siteTaxTeamComment
      },
      {
        message: Message.ApprovePaymentRequest,
        width: "25%",
        height: "15%"
      }
    );
  }

  public onbtnRejectClick(form: NgForm) {
    if (this.siteTaxTeamComment == "") {
      Object.keys(form.controls).forEach(control => {
        form.controls[control].markAsPristine();
        form.controls[control].markAsUntouched();
      });

      this.txtSiteTaxTeamComment.markAsTouched();
      this.txtSiteTaxTeamComment.clearValidators();
      this.txtSiteTaxTeamComment.setValidators([Validators.required]);
      this.txtSiteTaxTeamComment.updateValueAndValidity();
    }
    else {
      this.request.colRequestStatus = PaymentRequestStatus.ReturnedFromSiteTaxTeam;

      this.updateItem(
        {
          'colRequestStatus': this.request.colRequestStatus,
          'colSiteTaxTeamComment': this.siteTaxTeamComment
        },
        {
          message: Message.RejectPaymentRequest,
          width: "30%",
          height: "15%"
        }
      );
    }
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
  }

  public calculateTax() {
    if (this.request.colTaxableIncoming != null && this.request.colTaxableIncoming != "" &&
      this.request.colProfitMargin != null && this.request.colProfitMargin != "") {
      if (this.metadataIncomeTaxRate.length != 0) {
        this.request.colIncomeTax = String((Number(this.request.colTaxableIncoming) *
          Number(this.request.colProfitMargin) * 0.01 *
          Number(this.metadataIncomeTaxRate[0].colIncomeTaxRate * 0.01)).toFixed(2));
      }

      if (this.metadataValueAddedTaxRate.length != 0)
        this.request.colValueAddedTax = String((Number(this.request.colTaxableIncoming) *
          Number(this.metadataValueAddedTaxRate[0].colValueAddedTaxRate * 0.01)).toFixed(2));

      if (this.request.colValueAddedTax != null && this.request.colValueAddedTax != "" &&
        this.metadataTaxRate.length != 0) {
        this.request.colCityPlanningTax = String((Number(this.request.colValueAddedTax) *
          Number(this.metadataTaxRate[0].colCityPlanningTax * 0.01)).toFixed(2));

        this.request.colEducationFund = String((Number(this.request.colValueAddedTax) *
          Number(this.metadataTaxRate[0].colEducationFund * 0.01)).toFixed(2));

        this.request.colLocalEducationFund = String((Number(this.request.colValueAddedTax) *
          Number(this.metadataTaxRate[0].colLocalEducationFund * 0.01)).toFixed(2));

        this.request.colWaterConstructionFunds = String((Number(this.request.colValueAddedTax) *
          Number(this.metadataTaxRate[0].colWaterConstructionFunds * 0.01)).toFixed(2));
      }
    }
  }

  private updateItem(data: any, message: any) {
    this.followingAction = DialogFollowingAction.Refresh;
    this.dialogRef.close();
    this.progressSpinnerService.start();

    this.paymentRequestDataService.updateItem(
      this.data["itemId"],
      data).then(
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
    CalculateTaxComponent,
  ],
  declarations: [
    CalculateTaxComponent,
  ]
})
export class CalculateTaxModule { }

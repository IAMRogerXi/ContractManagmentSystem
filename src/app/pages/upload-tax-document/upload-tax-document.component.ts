import { NgModule, Inject, Component, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Message, DialogFollowingAction, PaymentRequestStatus } from '@shared/utility/consts'
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { MessageBoxComponent } from '@pages/message-box';
import { PaymentRequestService } from '@service/data/payment-request.service';
import { CommonService } from '@service/data/common.service';

@Component({
  selector: 'app-upload-tax-document',
  templateUrl: './upload-tax-document.component.html',
  styleUrls: ['./upload-tax-document.component.css']
})
export class UploadTaxDocumentComponent implements OnInit {

  fileList: File[] = [];
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<UploadTaxDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private commonService: CommonService,
    private paymentRequestService: PaymentRequestService,
    private progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit() {
  }

  public onbtnUploadDocumentClick() {
    this.progressSpinnerService.start();

    this.commonService.addAttachments({ listName: "PaymentRequestList", id: this.data["itemId"] }, this.fileList).then(
      () => {
        this.fileList = [];

        return this.paymentRequestService.updateItem(
          this.data["itemId"],
          {
            'colRequestStatus': PaymentRequestStatus.PendingPTP,
          }
        )
      }
    ).then(
      () => {
        this.followingAction = DialogFollowingAction.Refresh;
        this.dialogRef.close();
        this.progressSpinnerService.complete();

        this.dialog.open(MessageBoxComponent, {
          width: "25%",
          height: "15%",
          data: { message: Message.UploadTaxDocumentSuccessfully },
        });
      }
    ).catch(
      (error: any) => {
        this.dialogRef.close();
        this.progressSpinnerService.complete();

        this.dialog.open(MessageBoxComponent, {
          width: "20%",
          height: "15%",
          data: { message: Message.ErrorMessage },
        });

        console.log(error);
      }
    )
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
  }

  public onFileInputChanged(files: FileList) {
    for (let index = 0; index < this.fileList.length; index++)
      if (this.fileList[index].name == files.item(0).name)
        return;

    if (files != null && files.length > 0)
      this.fileList.push(files.item(0));
  }

  public onbtnDeleteFileClick(name: string) {
    for (let index = 0; index < this.fileList.length; index++)
      if (this.fileList[index].name == name) {
        this.fileList.splice(index, 1);
        return;
      }
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
    UploadTaxDocumentComponent,
  ],
  declarations: [
    UploadTaxDocumentComponent,
  ]
})
export class UploadTaxDocumentModule { }

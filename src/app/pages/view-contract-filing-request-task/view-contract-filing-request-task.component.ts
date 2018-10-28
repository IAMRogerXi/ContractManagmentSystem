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
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Message, ContractFilingRequestStatus, DialogFollowingAction } from '@shared/utility/consts'
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { MessageBoxComponent } from '@pages/message-box';

@Component({
  selector: 'app-view-contract-filing-request-task',
  templateUrl: './view-contract-filing-request-task.component.html',
  styleUrls: ['./view-contract-filing-request-task.component.css']
})
export class ViewContractFilingRequestTaskComponent implements OnInit {

  itemID: number;
  contractFilingID: string = "";
  siteTaxTeamComment: string = "";
  txtContractFilingID: FormControl = new FormControl('');
  txtSiteTaxTeamComment: FormControl = new FormControl('');
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewContractFilingRequestTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private dataService: ContractFilingRequestService,
    private progressSpinnerService: ProgressSpinnerService) {
    this.itemID = this.data["itemId"];
  }

  ngOnInit() {
  }

  public onbtnApproveClick() {
    if (this.contractFilingID == "") {
      this.txtSiteTaxTeamComment.markAsUntouched();
      this.txtSiteTaxTeamComment.markAsPristine();
      this.txtContractFilingID.markAsTouched();
      this.txtContractFilingID.clearValidators();
      this.txtContractFilingID.setValidators([Validators.required]);
      this.txtContractFilingID.updateValueAndValidity();
    }
    else {
      this.updateTask(
        {
          'colContractFilingID': this.contractFilingID,
          'colSiteTaxTeamComment': this.siteTaxTeamComment,
          'colRequestStatus': ContractFilingRequestStatus.Active
        },
        {
          message: Message.ApproveContractFilingRequest,
          width: "30%",
          height: "15%"
        }
      );
    }
  }

  public onbtnRejectClick() {
    if (this.siteTaxTeamComment == "") {
      this.txtContractFilingID.markAsUntouched();
      this.txtContractFilingID.markAsPristine();
      this.txtSiteTaxTeamComment.markAsTouched();
      this.txtSiteTaxTeamComment.clearValidators();
      this.txtSiteTaxTeamComment.setValidators([Validators.required]);
      this.txtSiteTaxTeamComment.updateValueAndValidity();
    }
    else {
      this.updateTask(
        {
          'colSiteTaxTeamComment': this.siteTaxTeamComment,
          'colRequestStatus': ContractFilingRequestStatus.Returned
        },
        {
          message: Message.RejectContractFilingRequest,
          width: "30%",
          height: "15%"
        }
      );
    }
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
  }

  public updateTask(data: any, message: any): Promise<any> {
    this.progressSpinnerService.start();
    this.followingAction = DialogFollowingAction.Refresh;
    this.dialogRef.close();

    return this.dataService.updateItem(this.itemID, data).then(
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
    ViewContractFilingRequestTaskComponent,
  ],
  declarations: [
    ViewContractFilingRequestTaskComponent,
  ]
})
export class ViewContractFilingRequestTaskModule { }

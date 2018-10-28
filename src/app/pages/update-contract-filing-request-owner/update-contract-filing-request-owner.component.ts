import { Component, OnInit, NgModule, Inject } from '@angular/core';
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
import { CommonService } from '@service/data/common.service';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { MessageBoxComponent } from '@pages/message-box';
import { Message, DialogFollowingAction } from '@shared/utility/consts';

@Component({
  selector: 'app-update-contract-filing-request-owner',
  templateUrl: './update-contract-filing-request-owner.component.html',
  styleUrls: ['./update-contract-filing-request-owner.component.css']
})
export class UpdateContractFilingRequestOwnerComponent implements OnInit {

  ownerEmail: string = "";
  emailFormControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.email,
    ]);
  displayMessage: boolean = false;
  message: string = "";
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdateContractFilingRequestOwnerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private commonService: CommonService,
    private contractFilingRequestService: ContractFilingRequestService) { }

  ngOnInit() {

  }

  public onbtnChangeClick() {
    this.displayMessage = true;
    this.message = "updating...";

    this.commonService.getUserInSite(this.ownerEmail.trim()).then(
      (result): Promise<any> => {
        return this.contractFilingRequestService.updateItem(
          this.data["itemId"],
          {
            colRequestOwnerId: result.Id
          }
        );
      }
    ).then(
      () => {
        this.displayMessage = false;
        this.message = "";
        this.followingAction = DialogFollowingAction.Refresh;
        this.dialogRef.close();

        this.dialog.open(
          MessageBoxComponent,
          {
            width: "25%",
            height: "15%",
            data: { message: Message.ChangeContractFilingRequestOwnerSuccessfully },
          }
        );
      }
    ).catch(
      (reason: any) => {
        this.message = this.ownerEmail + " cannot be found.";
        console.log(reason);
      }
    );
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
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
    UpdateContractFilingRequestOwnerComponent
  ],
  declarations: [
    UpdateContractFilingRequestOwnerComponent
  ]
})
export class UpdateContractFilingRequestOwnerModule { }

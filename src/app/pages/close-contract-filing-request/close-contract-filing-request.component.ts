import { NgModule, Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { ContractFilingRequestStatus, Message, DialogFollowingAction } from '@shared/utility/consts';
import { MessageBoxComponent } from '@pages/message-box';

@Component({
  selector: 'app-close-contract-filing-request',
  templateUrl: './close-contract-filing-request.component.html',
  styleUrls: ['./close-contract-filing-request.component.css']
})
export class CloseContractFilingRequestComponent implements OnInit {

  itemId: number;
  requestId: string = "";
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<CloseContractFilingRequestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private dataService: ContractFilingRequestService,
    private progressSpinnerService: ProgressSpinnerService) {
    this.itemId = this.data["itemId"];
    this.requestId = this.data["requestId"];
  }

  ngOnInit() {
  }

  public onbtnConfirmClick() {
    this.followingAction = DialogFollowingAction.Refresh;
    this.dialogRef.close();
    this.progressSpinnerService.start();

    this.dataService.updateItem(
      this.itemId,
      {
        "colRequestStatus": ContractFilingRequestStatus.Closed
      }).then(
        () => {
          this.progressSpinnerService.complete();

          this.dialog.open(MessageBoxComponent, {
            width: "25%",
            height: "15%",
            data: { message: Message.CloseContractFilingRequestSuccessfully },
          });
        },
        (error: any) => {
          this.progressSpinnerService.complete();

          console.log(error);
        }
      );
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
  }

}

@NgModule({
  imports: [],
  exports: [
    CloseContractFilingRequestComponent
  ],
  declarations: [
    CloseContractFilingRequestComponent
  ]
})
export class CloseContractFilingRequestModule { }

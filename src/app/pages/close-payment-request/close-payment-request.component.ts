import { NgModule, Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { Message, DialogFollowingAction, PaymentRequestStatus } from '@shared/utility/consts';
import { MessageBoxComponent } from '@pages/message-box';
import { PaymentRequestService } from '@service/data/payment-request.service';

@Component({
  selector: 'app-close-payment-request',
  templateUrl: './close-payment-request.component.html',
  styleUrls: ['./close-payment-request.component.css']
})
export class ClosePaymentRequestComponent implements OnInit {

  requestId: string = "";
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<ClosePaymentRequestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private paymentRequestService: PaymentRequestService,
    private progressSpinnerService: ProgressSpinnerService) {
    this.requestId = this.data["requestId"];
  }

  ngOnInit() {
  }

  public onbtnConfirmClick() {
    this.followingAction = DialogFollowingAction.Refresh;
    this.dialogRef.close();
    this.progressSpinnerService.start();

    this.paymentRequestService.updateItem(
      this.data["itemId"],
      {
        "colRequestStatus": PaymentRequestStatus.Closed
      }).then(
        () => {
          this.progressSpinnerService.complete();

          this.dialog.open(MessageBoxComponent, {
            width: "25%",
            height: "15%",
            data: { message: Message.ClosePaymentRequestSuccessfully },
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
    ClosePaymentRequestComponent
  ],
  declarations: [
    ClosePaymentRequestComponent
  ]
})
export class ClosePaymentRequestModule { }

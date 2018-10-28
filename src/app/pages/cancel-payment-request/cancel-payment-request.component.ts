import { NgModule, Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PaymentRequestService } from '@service/data/payment-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { PaymentRequestStatus, Message, DialogFollowingAction } from '@shared/utility/consts';
import { MessageBoxComponent } from '@pages/message-box';

@Component({
  selector: 'app-cancel-payment-request',
  templateUrl: './cancel-payment-request.component.html',
  styleUrls: ['./cancel-payment-request.component.css']
})
export class CancelPaymentRequestComponent implements OnInit {

  requestId: string = "";
  followingAction: number;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<CancelPaymentRequestComponent>,
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
        "colRequestStatus": PaymentRequestStatus.Cancelled
      }).then(
        () => {
          this.progressSpinnerService.complete();

          this.dialog.open(MessageBoxComponent, {
            width: "25%",
            height: "15%",
            data: { message: Message.CancelPaymentRequestSuccessfully },
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
    CancelPaymentRequestComponent
  ],
  declarations: [
    CancelPaymentRequestComponent
  ]
})
export class CancelPaymentRequestModule { }

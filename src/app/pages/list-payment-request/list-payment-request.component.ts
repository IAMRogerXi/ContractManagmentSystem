import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
} from '@angular/material';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PaymentRequestService } from '@service/data/payment-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { PaymentRequestStatus } from '@shared/utility/consts';
import { PaymentRequest } from '@model/PaymentRequest';
import { Message, DialogFollowingAction } from '@shared/utility/consts';
import { ViewPaymentRequestComponent } from '@pages/view-payment-request';
import { CancelPaymentRequestComponent } from '@pages/cancel-payment-request';
import { MessageBoxComponent } from '@pages/message-box';
import { UpdatePaymentRequestComponent } from '@pages/update-payment-request';
import { CommonService } from '@service/data/common.service';

@Component({
  selector: 'app-list-payment-request',
  templateUrl: './list-payment-request.component.html',
  styleUrls: ['./list-payment-request.component.css']
})
export class ListPaymentRequestComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['colRequestID', 'colContractID', 'colVendorID', 'colRequestStatus', 'actions'];
  dataSource = null;
  requestStatus = PaymentRequestStatus;
  currentUserId: number;

  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private paymentRequestService: PaymentRequestService,
    private progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit() {
    this.commonService.getCurrentUser().then(
      (result) => {
        this.currentUserId = result.Id;

        this.loadListData();
      }
    ).catch(
      (error: any) => {
        console.log(error);
      }
    );
  }

  public onbtnViewClick(itemId: number) {
    this.dialog.open(ViewPaymentRequestComponent, {
      width: "70%",
      height: "80%",
      data: {
        itemId: itemId
      },
    });
  }

  public onbtnEditClick(itemId: number) {
    let dialogRef: any;

    dialogRef = this.dialog.open(UpdatePaymentRequestComponent,
      {
        width: "70%",
        height: "80%",
        data: {
          itemId: itemId
        },
      }
    );

    dialogRef.afterClosed().subscribe(
      () => {
        if (dialogRef.componentInstance.followingAction == DialogFollowingAction.Refresh)
          this.loadListData();
      }
    );
  }

  public onbtnCancelClick(itemId: number, requestId: string) {
    let dialogRef: any;

    dialogRef = this.dialog.open(CancelPaymentRequestComponent,
      {
        width: "30%",
        height: "15%",
        data: {
          itemId: itemId,
          requestId: requestId
        },
      }
    );

    dialogRef.afterClosed().subscribe(
      () => {
        if (dialogRef.componentInstance.followingAction == DialogFollowingAction.Refresh)
          this.loadListData();
      }
    );
  }

  private loadListData() {
    this.progressSpinnerService.start();

    this.paymentRequestService.getItems(
      [
        'Id',
        'colRequestID',
        'colContractID',
        'colRequestStatus',
        'colVendorID'
      ],
      "AuthorId eq '" + String(this.currentUserId) + "'").then(
        (requests: PaymentRequest[]) => {
          this.progressSpinnerService.complete();

          this.dataSource = new MatTableDataSource<PaymentRequest>(requests);
          this.dataSource.paginator = this.paginator;
        },
        (error: any) => {
          this.progressSpinnerService.complete();

          console.log(error);
        }
      );
  }

}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  entryComponents: [
    ViewPaymentRequestComponent,
    CancelPaymentRequestComponent,
    UpdatePaymentRequestComponent,
    MessageBoxComponent,
  ],
  exports: [
    ListPaymentRequestComponent
  ],
  declarations: [
    ListPaymentRequestComponent
  ]
})
export class ListPaymentRequestModule { }
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
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
  MatDialog,
} from '@angular/material';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ContractFilingRequestStatus, DialogFollowingAction } from '@shared/utility/consts';
import { ContractFilingRequest } from '@model/ContractFilingRequest';
import { AddPaymentRequestComponent } from '@pages/add-payment-request';
import { ViewContractFilingRequestComponent } from '@pages/view-contract-filing-request';
import { CloseContractFilingRequestComponent } from '@pages/close-contract-filing-request';
import { CancelContractFilingRequestComponent } from '@pages/cancel-contract-filing-request';
import { UpdateContractFilingRequestOwnerComponent } from '@pages/update-contract-filing-request-owner';
import { UpdateContractFilingRequestComponent } from '@pages/update-contract-filing-request';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { MessageBoxComponent } from '@pages/message-box';
import { CommonService } from '@service/data/common.service';

@Component({
  selector: 'app-list-contract-filing-request',
  templateUrl: './list-contract-filing-request.component.html',
  styleUrls: ['./list-contract-filing-request.component.css']
})
export class ListContractFilingRequestComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['colRequestID', 'colContractID', 'colRequestStatus', 'actions'];
  dataSource = null;
  requestOwnerId: number;
  requestStatus = ContractFilingRequestStatus;

  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private dataService: ContractFilingRequestService,
    private progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit() {
    this.commonService.getCurrentUser().then(
      (result) => {
        this.requestOwnerId = result.Id;

        this.loadListData();
      }
    ).catch(
      (error: any) => {
        console.log(error);
      }
    );
  }

  public onbtnViewClick(itemId: number) {
    this.dialog.open(ViewContractFilingRequestComponent,
      {
        width: "70%",
        height: "80%",
        data: {
          itemId: itemId
        },
      }
    );
  }

  public onbtnChangeOwnerClick(itemId: number) {
    let dialogRef: any;

    dialogRef = this.dialog.open(UpdateContractFilingRequestOwnerComponent,
      {
        width: "40%",
        height: "30%",
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

  public onbtnCreatePaymentRequestClick(itemId: string,
    requestId: string,
    contractId: string,
    companyCode: string) {
    let dialogRef: any;

    dialogRef = this.dialog.open(AddPaymentRequestComponent, {
      width: "70%",
      height: "80%",
      data: {
        itemId: itemId,
        requestId: requestId,
        companyCode: companyCode,
        contractId: contractId
      },
    });

    dialogRef.afterClosed().subscribe(
      () => {
        if (dialogRef.componentInstance.followingAction == DialogFollowingAction.Refresh)
          this.loadListData();
      }
    );
  }

  public onbtnCancelClick(itemId: number, requestId: string) {
    let dialogRef: any;

    dialogRef = this.dialog.open(CancelContractFilingRequestComponent,
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

  public onbtnCloseClick(itemId: number, requestId: string) {
    let dialogRef: any;

    dialogRef = this.dialog.open(CloseContractFilingRequestComponent,
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

  public onbtnEditClick(itemId: number) {
    let dialogRef: any;
    dialogRef = this.dialog.open(UpdateContractFilingRequestComponent,
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

  public onFilterChange(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  private loadListData() {
    this.progressSpinnerService.start();

    this.dataService.getItems(
      [
        'Id',
        'colRequestID',
        'colContractID',
        'colRequestStatus',
        'colCompanyCode',
        'colRemainedPaymentCounter',
        'colRemainedUnpayedAmount'
      ],
      "colRequestOwnerId eq '" + String(this.requestOwnerId) + "'"
    ).then(
      (requests: ContractFilingRequest[]) => {
        this.progressSpinnerService.complete();

        this.dataSource = new MatTableDataSource<ContractFilingRequest>(requests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ).catch(
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
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    CdkTreeModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
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
    ViewContractFilingRequestComponent,
    AddPaymentRequestComponent,
    CloseContractFilingRequestComponent,
    CancelContractFilingRequestComponent,
    UpdateContractFilingRequestOwnerComponent,
    UpdateContractFilingRequestComponent,
    MessageBoxComponent,
  ],
  exports: [
    ListContractFilingRequestComponent
  ],
  declarations: [
    ListContractFilingRequestComponent
  ]
})
export class ListContractFilingRequestModule { }

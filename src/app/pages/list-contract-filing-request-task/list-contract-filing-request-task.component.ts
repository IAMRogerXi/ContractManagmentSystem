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
  MatFormFieldModule,
} from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContractFilingRequestStatus, DialogFollowingAction } from '@shared/utility/consts';
import { ContractFilingRequest } from '@model/ContractFilingRequest';
import { ViewContractFilingRequestComponent } from '@pages/view-contract-filing-request';
import { ViewContractFilingRequestTaskComponent } from '@pages/view-contract-filing-request-task';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { CommonService } from '@service/data/common.service';
import { MetadataService } from '@service/data/metadata.service';

@Component({
  selector: 'app-list-contract-filing-request-task',
  templateUrl: './list-contract-filing-request-task.component.html',
  styleUrls: ['./list-contract-filing-request-task.component.css']
})
export class ListContractFilingRequestTaskComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['colRequestID', 'colContractID', 'colRequestStatus', 'actions'];
  dataSource = null;
  requestStatus = ContractFilingRequestStatus;
  companyCode: string = "";

  constructor(private dialog: MatDialog,
    private commonService: CommonService,
    private metadataService: MetadataService,
    private dataService: ContractFilingRequestService,
    private progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit() {
    this.commonService.getCurrentUser().then(
      (result) => {
        return this.metadataService.getMetadataSiteTaxAccountantMappingList(result.Id);
      }
    ).then(
      (result) => {
        if (result != null && result.length != 0)
          this.companyCode = result[0].colCompanyCode;

        this.loadListData();
      }
    ).catch(
      (error: any) => {
        console.log(error);
      }
    );
  }

  public onbtnViewClick(itemId: number) {
    this.dialog.open(ViewContractFilingRequestComponent, {
      width: "70%",
      height: "80%",
      data: {
        itemId: itemId
      },
    });
  }

  public onbtnViewTaskClick(itemId: number) {
    let dialogRef: any;

    dialogRef = this.dialog.open(ViewContractFilingRequestTaskComponent, {
      width: "50%",
      height: "40%",
      data: {
        itemId: itemId
      },
    });

    dialogRef.afterClosed().subscribe(
      () => {
        if (dialogRef.componentInstance.followingAction == DialogFollowingAction.Refresh)
          this.loadListData();
      }
    );
  }

  private loadListData() {
    this.progressSpinnerService.start();

    this.dataService.getItems(
      [
        'Id',
        'colRequestID',
        'colContractID',
        'colRequestStatus'
      ],
      "colRequestStatus eq '" + this.requestStatus.PendingSiteTaxTeam + "' and " + 
      "colCompanyCode eq '" + this.companyCode + "'"
    ).then(
      (requests: ContractFilingRequest[]) => {
        this.progressSpinnerService.complete();

        this.dataSource = new MatTableDataSource<ContractFilingRequest>(requests);
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
    MatFormFieldModule,
  ],
  entryComponents: [
    ViewContractFilingRequestComponent,
    ViewContractFilingRequestTaskComponent,
  ],
  exports: [
    ListContractFilingRequestTaskComponent,
  ],
  declarations: [
    ListContractFilingRequestTaskComponent,
  ]
})
export class ListContractFilingRequestTaskModule { }
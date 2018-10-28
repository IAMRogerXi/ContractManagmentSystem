import { Component, NgModule, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
} from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ContractFilingRequest } from '@model/ContractFilingRequest';
import { CommonService } from '@service/data/common.service';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { ContractFilingRequestStatus } from '@shared/utility/consts';

@Component({
  selector: 'app-view-contract-filing-request',
  templateUrl: './view-contract-filing-request.component.html',
  styleUrls: ['./view-contract-filing-request.component.css']
})
export class ViewContractFilingRequestComponent implements OnInit {

  request: ContractFilingRequest = new ContractFilingRequest();
  attachments: any = null;
  requestStatus = ContractFilingRequestStatus;

  constructor(private dialogRef: MatDialogRef<ViewContractFilingRequestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private commonService: CommonService,
    private contractFilingRequestService: ContractFilingRequestService) {
  }

  ngOnInit() {
    this.contractFilingRequestService.getItem(
      this.data["itemId"],
      [
        'Id',
        'colPaymentRequestSeed',
        'colRequestID',
        'colContractFilingID',
        'colContractID',
        'colRequestStatus',
        'colCompanyCode',
        'colCompanyName',
        'colContact',
        'colPhone',
        'colFax',
        'colVendorRegistryStatus',
        'colVendorTaxPayerID',
        'colVendorTaxPayerNameEN',
        'colVendorTaxPayerNameCN',
        'colVendorCompanyNationality',
        'colVendorCompanyAddressEN',
        'colVendorCompanyAddressCN',
        'colVendorBankName',
        'colVendorBankAccount',
        'colVendorContact',
        'colVendorPhone',
        'colVendorFax',
        'colVendorTaxPayerName',
        'colVendorCompanyOwnerName',
        'colVendorCompanyOwnerNationality',
        'colVendorCompanyCFO',
        'colProjectName',
        'colContractName',
        'colProjectLocation',
        'colWorkforceAmount',
        'colContractPeroid',
        'colContractSignDate',
        'colContractStartDate',
        'colContractEndDate',
        'colOpenContract',
        'colPaymentTimes',
        'colIncludeTax',
        'colCurrency',
        'colContractAmount',
        'colOutput',
        'colAgreedOutput',
        'colComment1',
        'colComment2',
        'colComment3',
        'colComment4',
        'colComment5',
        'colRemainedPaymentCounter',
        'colRemainedUnpayedAmount'
      ]
    ).then(
      (result) => {
        this.request = result;
        
        return this.commonService.getAttachments("ContractFilingRequestList", this.data["itemId"]);
      }
    ).then(
      (result) => {
        this.attachments = result;
      }
    ).catch(
      (error: any) => {
        console.log(error);
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
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports: [
    ViewContractFilingRequestComponent,
  ],
  declarations: [
    ViewContractFilingRequestComponent,
  ]
})
export class ViewContractFilingRequestModule { }

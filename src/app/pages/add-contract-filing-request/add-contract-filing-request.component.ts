import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatDialog,
} from '@angular/material';
import { ContractFilingRequestStatus, Message } from '@shared/utility/consts';
import { ContractFilingRequest } from '@model/ContractFilingRequest';
import { MessageBoxComponent } from '@pages/message-box';
import { CommonService } from '@service/data/common.service';
import { MetadataService } from '@service/data/metadata.service';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';

@Component({
  selector: 'app-add-contract-filing-request',
  templateUrl: './add-contract-filing-request.component.html',
  styleUrls: ['./add-contract-filing-request.component.css']
})
export class AddContractFilingRequestComponent implements OnInit {

  metadataCurrency: any[] = [];
  metadataProjectOutput: any[] = [];
  metadataProjectAgreedOutput: any[] = [];
  metadataCompanyInfo: any[] = [];
  fileList: File[] = [];
  exchangeToEUR: string = "";
  request: ContractFilingRequest = new ContractFilingRequest();
  displayMessage: boolean = false;
  message: string = "";

  constructor(private dialog: MatDialog,
    private metadataService: MetadataService,
    private commonService: CommonService,
    private dataService: ContractFilingRequestService,
    private progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit() {
    this.progressSpinnerService.start();

    this.metadataService.getMetadataCurrencyList().then(
      (result): Promise<any> => {
        this.metadataCurrency = result;

        return this.metadataService.getMetadataProjectOutputList();
      }
    ).then(
      (result): Promise<any> => {
        this.metadataProjectOutput = result;

        return this.metadataService.getMetadataProjectAgreedOutputList();
      }
    ).then(
      (result): Promise<any> => {
        this.metadataProjectAgreedOutput = result;

        return this.commonService.getCurrentUser();
      }
    ).then(
      (result) => {
        this.request.colRequestOwner = result.Id;

        return this.metadataService.getMetadataCompanyInfoList();
      }
    ).then(
      (result) => {
        this.metadataCompanyInfo = result;

        this.progressSpinnerService.complete();
      }
    ).catch(
      (error: any) => {
        console.error(error);
      }
    )
  }

  public onformSubmit() {
    this.progressSpinnerService.start();

    this.request.colRequestStatus = ContractFilingRequestStatus.PendingSiteTaxTeam;
    this.request.colPaymentRequestSeed = "1";
    this.request.colRemainedPaymentCounter = this.request.colPaymentTimes == null || this.request.colPaymentTimes == "" ? "1" : this.request.colPaymentTimes;
    this.request.colRemainedUnpayedAmount = this.request.colContractAmount;
    this.request.colAmountInEURO = String(Number(this.request.colRemainedUnpayedAmount) * Number(this.exchangeToEUR));

    this.dataService.createItem(
      {
        'colRequestStatus': this.request.colRequestStatus,
        'colRequestOwnerId': this.request.colRequestOwner,
        'colPaymentRequestSeed': this.request.colPaymentRequestSeed,
        'colContractID': this.request.colContractID,
        'colCompanyCode': this.request.colCompanyCode,
        'colCompanyName': this.request.colCompanyName,
        'colContact': this.request.colContact,
        'colPhone': this.request.colPhone,
        'colFax': this.request.colFax,
        'colVendorRegistryStatus': this.request.colVendorRegistryStatus,
        'colVendorTaxPayerID': this.request.colVendorTaxPayerID,
        'colVendorTaxPayerNameEN': this.request.colVendorTaxPayerNameEN,
        'colVendorTaxPayerNameCN': this.request.colVendorTaxPayerNameCN,
        'colVendorCompanyNationality': this.request.colVendorCompanyNationality,
        'colVendorCompanyAddressEN': this.request.colVendorCompanyAddressEN,
        'colVendorCompanyAddressCN': this.request.colVendorCompanyAddressCN,
        'colVendorBankName': this.request.colVendorBankName,
        'colVendorBankAccount': this.request.colVendorBankAccount,
        'colVendorContact': this.request.colVendorContact,
        'colVendorPhone': this.request.colVendorPhone,
        'colVendorFax': this.request.colVendorFax,
        'colVendorTaxPayerName': this.request.colVendorTaxPayerName,
        'colVendorCompanyOwnerName': this.request.colVendorCompanyOwnerName,
        'colVendorCompanyOwnerNationality': this.request.colVendorCompanyOwnerNationality,
        'colVendorCompanyCFO': this.request.colVendorCompanyCFO,
        'colProjectName': this.request.colProjectName,
        'colContractName': this.request.colContractName,
        'colProjectLocation': this.request.colProjectLocation,
        'colWorkforceAmount': this.request.colWorkforceAmount,
        'colContractPeroid': this.request.colContractPeroid,
        'colContractSignDate': this.request.colContractSignDate,
        'colContractStartDate': this.request.colContractStartDate,
        'colContractEndDate': this.request.colContractEndDate,
        'colOpenContract': this.request.colOpenContract,
        'colPaymentTimes': this.request.colPaymentTimes,
        'colIncludeTax': this.request.colIncludeTax,
        'colCurrency': this.request.colCurrency,
        'colContractAmount': this.request.colContractAmount,
        'colOutput': this.request.colOutput,
        'colAgreedOutput': this.request.colAgreedOutput,
        'colComment1': this.request.colComment1,
        'colComment2': this.request.colComment2,
        'colComment3': this.request.colComment3,
        'colComment4': this.request.colComment4,
        'colComment5': this.request.colComment5,
        'colRemainedPaymentCounter': this.request.colRemainedPaymentCounter,
        'colRemainedUnpayedAmount': this.request.colRemainedUnpayedAmount,
        'colAmountInEURO': this.request.colAmountInEURO
      }
    ).then(
      (result) => {
        this.commonService.addAttachments({ currentItem: result.item }, this.fileList);
      }
    ).then(
      () => {
        this.fileList = [];
        this.progressSpinnerService.complete();

        this.dialog.open(MessageBoxComponent, {
          width: "25%",
          height: "15%",
          data: { message: Message.SubmitContractFilingRequestSuccessfully },
        });
      }
    ).catch(
      (error: any) => {
        this.fileList = [];
        this.progressSpinnerService.complete();

        this.dialog.open(MessageBoxComponent, {
          width: "20%",
          height: "15%",
          data: { message: Message.ErrorMessage },
        });

        console.error(error);
      }
    );
  }

  public onbtnSaveDraftClick() {
    this.progressSpinnerService.start();

    this.request.colRequestStatus = ContractFilingRequestStatus.Draft;

    this.dataService.createItem(
      {
        'colRequestStatus': this.request.colRequestStatus,
        'colRequestOwnerId': this.request.colRequestOwner,
        'colPaymentRequestSeed': this.request.colPaymentRequestSeed,
        'colContractID': this.request.colContractID,
        'colCompanyCode': this.request.colCompanyCode,
        'colCompanyName': this.request.colCompanyName,
        'colContact': this.request.colContact,
        'colPhone': this.request.colPhone,
        'colFax': this.request.colFax,
        'colVendorRegistryStatus': this.request.colVendorRegistryStatus,
        'colVendorTaxPayerID': this.request.colVendorTaxPayerID,
        'colVendorTaxPayerNameEN': this.request.colVendorTaxPayerNameEN,
        'colVendorTaxPayerNameCN': this.request.colVendorTaxPayerNameCN,
        'colVendorCompanyNationality': this.request.colVendorCompanyNationality,
        'colVendorCompanyAddressEN': this.request.colVendorCompanyAddressEN,
        'colVendorCompanyAddressCN': this.request.colVendorCompanyAddressCN,
        'colVendorBankName': this.request.colVendorBankName,
        'colVendorBankAccount': this.request.colVendorBankAccount,
        'colVendorContact': this.request.colVendorContact,
        'colVendorPhone': this.request.colVendorPhone,
        'colVendorFax': this.request.colVendorFax,
        'colVendorTaxPayerName': this.request.colVendorTaxPayerName,
        'colVendorCompanyOwnerName': this.request.colVendorCompanyOwnerName,
        'colVendorCompanyOwnerNationality': this.request.colVendorCompanyOwnerNationality,
        'colVendorCompanyCFO': this.request.colVendorCompanyCFO,
        'colProjectName': this.request.colProjectName,
        'colContractName': this.request.colContractName,
        'colProjectLocation': this.request.colProjectLocation,
        'colWorkforceAmount': this.request.colWorkforceAmount,
        'colContractPeroid': this.request.colContractPeroid,
        'colContractSignDate': this.request.colContractSignDate,
        'colContractStartDate': this.request.colContractStartDate,
        'colContractEndDate': this.request.colContractEndDate,
        'colOpenContract': this.request.colOpenContract,
        'colPaymentTimes': this.request.colPaymentTimes,
        'colIncludeTax': this.request.colIncludeTax,
        'colCurrency': this.request.colCurrency,
        'colContractAmount': this.request.colContractAmount,
        'colOutput': this.request.colOutput,
        'colAgreedOutput': this.request.colAgreedOutput,
        'colComment1': this.request.colComment1,
        'colComment2': this.request.colComment2,
        'colComment3': this.request.colComment3,
        'colComment4': this.request.colComment4,
        'colComment5': this.request.colComment5,
      }
    ).then(
      (result) => {
        this.commonService.addAttachments({ currentItem: result.item }, this.fileList);
      }
    ).then(
      () => {
        this.fileList = [];
        this.progressSpinnerService.complete();

        this.showMessage(Message.SaveDraftSuccessfully);
      }
    ).catch(
      (error: any) => {
        this.fileList = [];
        this.progressSpinnerService.complete();

        this.showMessage(Message.ErrorMessage);

        console.error(error);
      }
    );
  }

  public onCompanyCodeChanged(value: any) {
    for (let i = 0; i < this.metadataCompanyInfo.length; i++)
      if (this.metadataCompanyInfo[i].colCompanyCode == value) {
        this.request.colCompanyName = this.metadataCompanyInfo[i].colCompanyName;
        return;
      }
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

  public oncolVendorRegistryStatusChanged(value: any) {
    if (value == "否")
      this.request.colVendorTaxPayerID = "";
  }

  public oncolOpenContractChanged(value: any) {
    if (value == "否")
      this.request.colPaymentTimes = "";
  }

  public onCurrencyChanged(value: any) {
    this.progressSpinnerService.start();

    this.metadataService.getMetadataCurrencyList(value).then(
      (result) => {
        if (result != null && result.length != 0)
          this.exchangeToEUR = result[0].colExchangeToEUR;

        this.progressSpinnerService.complete();
      }
    ).catch(
      (error: any) => {
        this.progressSpinnerService.complete();

        console.log(error);
      }
    );
  }

  private showMessage(message: string) {
    this.displayMessage = true;
    this.message = message;
    setTimeout(() => {
      this.displayMessage = false;
      this.message = "";
    }, 1500);
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
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    MessageBoxComponent,
  ],
  exports: [
    AddContractFilingRequestComponent,
  ],
  declarations: [
    AddContractFilingRequestComponent,
  ]
})
export class AddContractFilingRequestModule { }

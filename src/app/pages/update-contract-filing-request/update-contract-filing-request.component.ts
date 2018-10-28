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
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Message, ContractFilingRequestStatus, DialogFollowingAction } from '@shared/utility/consts'
import { ContractFilingRequest } from '@model/ContractFilingRequest';
import { CommonService } from '@service/data/common.service';
import { ContractFilingRequestService } from '@service/data/contract-filing-request.service';
import { ProgressSpinnerService } from '@service/ui/progress-spinner.service';
import { MetadataService } from '@service/data/metadata.service';
import { MessageBoxComponent } from '@pages/message-box';

@Component({
    selector: 'app-update-contract-filing-request',
    templateUrl: './update-contract-filing-request.component.html',
    styleUrls: ['./update-contract-filing-request.component.css']
})
export class UpdateContractFilingRequestComponent implements OnInit {

    metadataCurrency: any[] = [];
    metadataProjectOutput: any[] = [];
    metadataProjectAgreedOutput: any[] = [];
    metadataCompanyInfo: any[] = [];
    requestOwnerID: number;
    request: ContractFilingRequest = new ContractFilingRequest();
    followingAction: number;
    displayMessage: boolean = false;
    message: string = "";

    constructor(private dialog: MatDialog,
        private dialogRef: MatDialogRef<UpdateContractFilingRequestComponent>,
        @Inject(MAT_DIALOG_DATA) private data: string,
        private commonService: CommonService,
        private metadataService: MetadataService,
        private contractFilingRequestService: ContractFilingRequestService,
        private progressSpinnerService: ProgressSpinnerService) { }

    ngOnInit() {
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
            (result): Promise<any> => {
                this.requestOwnerID = result.Id;

                return this.metadataService.getMetadataCompanyInfoList();
            }
        ).then(
            (result): Promise<any> => {
                this.metadataCompanyInfo = result;

                return this.contractFilingRequestService.getItem(
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
                        'colComment5'
                    ]);
            }
        ).then(
            (result) => {
                this.request = result;
            }
        ).catch(
            (error: any) => {
                console.error(error);
            }
        );
    }

    public onformSubmit() {
        this.progressSpinnerService.start();
        this.request.colRequestStatus = ContractFilingRequestStatus.PendingSiteTaxTeam;
        this.request.colPaymentRequestSeed = "1";
        this.request.colRequestOwner = this.requestOwnerID;

        this.updateItem().then(
            () => {
                this.followingAction = DialogFollowingAction.Refresh;
                this.progressSpinnerService.complete();
                this.dialogRef.close();

                this.dialog.open(MessageBoxComponent, {
                    width: "25%",
                    height: "15%",
                    data: { message: Message.SubmitContractFilingRequestSuccessfully },
                });
            }
        ).catch(
            (error: any) => {
                this.progressSpinnerService.complete();
                this.dialogRef.close();

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

        this.updateItem().then(
            () => {
                this.showMessage(Message.SaveDraftSuccessfully);
                this.progressSpinnerService.complete();
            }
        ).catch(
            (error: any) => {
                this.showMessage(Message.ErrorMessage);
                this.progressSpinnerService.complete();

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

    public onbtnCloseClick() {
        this.dialogRef.close();
    }

    public updateItem(): Promise<any> {
        return this.contractFilingRequestService.updateItem(
            this.request.Id,
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
    ],
    exports: [
        UpdateContractFilingRequestComponent,
    ],
    declarations: [
        UpdateContractFilingRequestComponent,
    ]
})
export class UpdateContractFilingRequestModule { }
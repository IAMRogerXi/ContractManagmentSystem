import { Injectable } from '@angular/core';
import { ItemAddResult, ItemUpdateResult } from '@pnp/sp';
import { ContractFilingRequest } from '@model/ContractFilingRequest';
import { CommonService } from '@service/data/common.service';

@Injectable({
  providedIn: 'root'
})
export class ContractFilingRequestService {

  listName: string = "ContractFilingRequestList";

  constructor(private commonService: CommonService) { }

  public createItem(data: any): Promise<ItemAddResult> {
    return this.commonService.createItem(this.listName, data);
  }

  public updateItem(id: number, data: any): Promise<ItemUpdateResult> {
    return this.commonService.updateItem(this.listName, id, data);
  }

  public getItems(columnList: any, filter?: string): Promise<ContractFilingRequest[]> {
    return this.commonService.getItems(this.listName, columnList, filter);
  }

  public getItem(id: number, columnList: any): Promise<ContractFilingRequest> {
    return this.commonService.getItem(this.listName, id, columnList);
  }

}

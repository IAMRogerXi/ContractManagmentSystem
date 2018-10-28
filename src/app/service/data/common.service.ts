import { Injectable } from '@angular/core';
import { sp, Item, ItemAddResult, ItemUpdateResult, AttachmentFileInfo } from '@pnp/sp';
import { AttachmentFiles } from '@pnp/sp/src/attachmentfiles';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public createItem(listName: string, data: any): Promise<ItemAddResult> {
    return sp.web.lists.getByTitle(listName).items.add(data);
  }

  public updateItem(listName: string, id: number, data: any): Promise<ItemUpdateResult> {
    return sp.web.lists.getByTitle(listName).items.getById(id).update(data);
  }

  public getItem(listName: string, id: number, columnList: any): Promise<any> {
    return sp.web.lists.getByTitle(listName).items.getById(id).select(columnList).get();
  }

  public getItems(listName: string, columnList: any, filter?: string): Promise<any> {
    if (filter != null && filter != "")
      return sp.web.lists.getByTitle(listName).items.filter(filter).select(columnList).get();

    return sp.web.lists.getByTitle(listName).items.select(columnList).get();
  }

  public addAttachments(itemInfo: { listName?: string, id?: number, currentItem?: Item }, attachments: File[]): Promise<any> {
    let item = itemInfo.currentItem == null ? sp.web.lists.getByTitle(itemInfo.listName).items.getById(itemInfo.id) : itemInfo.currentItem;
    let fileInfos: AttachmentFileInfo[] = [];
    
    for (let file of attachments)
      fileInfos.push({ name: file.name, content: file });

    return item.attachmentFiles.addMultiple(fileInfos);
  }

  public getAttachments(listName: string, id: number): Promise<AttachmentFiles> {
    return sp.web.lists.getByTitle(listName).items.getById(id).attachmentFiles.get();
  }

  public getUserInSite(mailAddress: string): Promise<any> {
    return sp.web.siteUsers.getByEmail(mailAddress.trim()).get();
  }

  public getCurrentUser(): Promise<any> {
    return sp.web.currentUser.get();
  }

}

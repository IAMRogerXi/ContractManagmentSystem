import { Injectable } from '@angular/core';
import { CommonService } from '@service/data/common.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private commonService: CommonService) { }

  public getMetadataCurrencyList(currency?: string): Promise<any[]> {
    if (currency != null && currency != "")
      return this.commonService.getItems("MetadataCurrencyList",
        ["colCurrency", "colExchangeToEUR"],
        "colCurrency eq '" + currency + "'");

    return this.commonService.getItems("MetadataCurrencyList", ["colCurrency", "colExchangeToEUR"]);
  }

  public getMetadataProjectOutputList(): Promise<any[]> {
    return this.commonService.getItems("MetadataProjectOutputList", ["colOutput"]);
  }

  public getMetadataProjectAgreedOutputList(): Promise<any[]> {
    return this.commonService.getItems("MetadataProjectAgreedOutputList", ["colAgreedOutput"]);
  }

  public getMetadataCompanyInfoList(): Promise<any[]> {
    return this.commonService.getItems("MetadataCompanyInfoList", ["colCompanyCode", "colCompanyName"]);
  }

  public getMetadataTaxRateList(companyCode: string): Promise<any[]> {
    return this.commonService.getItems(
      "MetadataTaxRateList",
      [
        "colCityPlanningTax",
        "colEducationFund",
        "colLocalEducationFund",
        "colWaterConstructionFunds"
      ],
      "colCompanyCode eq '" + companyCode + "'");
  }

  public getMetadataProfitMarginList(): Promise<any[]> {
    return this.commonService.getItems("MetadataProfitMarginList", ["colProfitMargin"]);
  }

  public getMetadataIncomeTaxRateList(): Promise<any[]> {
    return this.commonService.getItems("MetadataIncomeTaxRateList", ["colIncomeTaxRate"]);
  }

  public getMetadataValueAddedTaxRateList(): Promise<any[]> {
    return this.commonService.getItems("MetadataValueAddedTaxRateList", ["colValueAddedTaxRate"]);
  }

  public getMetadataOtherTaxCategoryList(): Promise<any[]> {
    return this.commonService.getItems("MetadataOtherTaxCategoryList", ["colOtherTaxCategory"]);
  }

  public getMetadataSiteTaxAccountantMappingList(siteTaxAccountant: number): Promise<any[]> {
    return this.commonService.getItems(
      "MetadataSiteTaxAccountantMappingList",
      [
        "colCompanyCode"
      ],
      "colSiteTaxAccountantId eq '" + String(siteTaxAccountant) + "'");
  }

}

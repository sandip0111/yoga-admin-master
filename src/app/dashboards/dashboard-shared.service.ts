import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DashboardSharedService {
  swarSadhnaTitle: string = "Swara Sadhana";
  onlineClassTitle: string = "Online Live Class";
  pranaArambhTitle: string = "Prana Arambh";
  freeWebinarTitle: string = "Free Webinar";
  twoHunTTCTitle: string = "200 Online TTC";
  breathDtoxTitle: string = "Breath Detox";
  pendingPaymentTitle: string = "All Pending Payment List";
  pranicPurificationTitle: string = "Pranic Purification";
  pranicPurificationIITitle: string = "Pranic Purification II";
  foundationSpiritualityTitle: string = "Foundation of Spirituality";
  rishikeshTitle: string = "Rishikesh";
  baliTitle: string = "Bali";
  subscribersTitle: string = "Subscribers";
  pranayamaCertificationTitle: string = "Pranayama Certification";
  constructor() { }
  escapeCSV(value: any): string {
    const str = value === null || value === undefined ? "" : String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }
}

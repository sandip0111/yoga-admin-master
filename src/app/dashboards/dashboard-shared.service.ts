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
  foundationSpiritualityTitle: string = "Foundation of Spirituality";
  rishikeshTitle: string = "Rishikesh";
  constructor() {}
}

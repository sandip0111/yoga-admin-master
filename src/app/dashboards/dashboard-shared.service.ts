import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DashboardSharedService {
  swarSadhnaTitle: string = "Swara Sadhana";
  onlineClassTitle: string = "Online Live Class"
  constructor() {}
}

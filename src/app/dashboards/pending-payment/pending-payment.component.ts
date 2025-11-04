import { Component, OnInit } from "@angular/core";
import {
  searchPranaRambhFilter,
  twoHunTTCModelResultModel,
} from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  selector: "app-pending-payment",
  templateUrl: "./pending-payment.component.html",
  styleUrls: ["./pending-payment.component.scss"],
})
export class PendingPaymentComponent implements OnInit {
  loading: boolean = false;
  page: number = 1;
  list: any[] = [];
  total: number = 0;
  filter: searchPranaRambhFilter;
  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService
  ) {}

  ngOnInit(): void {
    this.filter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
      paymentStatus: "pending",
    };
    this.getAllData(this.filter, false);
  }
  getAllData(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.loading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.page = isSearch ? 1 : this.page;
    this.service.getAllPendingPaymentList(filter).subscribe((res: any) => {
      const result = res.data[0];
      console.log("mdntsskas", result);
      this.list = result.data;
      this.total = result.metadata[0].total ?? 0;
      this.dashboardShared.pendingPaymentTitle = `All Pending Payment List (${this.total})`;
      this.loading = this.list.length > 0 ? false : true;
    });
  }
  onsTableDataChange(pageNo: number) {
    this.filter.pageNo = pageNo;
    this.page = pageNo;
    this.getAllData(this.filter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

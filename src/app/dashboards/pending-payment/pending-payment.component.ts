import { Component, Input, OnInit } from "@angular/core";
import {
  searchPranaRambhFilter,
  twoHunTTCModelResultModel,
} from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  standalone: false,
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
  options: { value: string; label: string }[] = [];
  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService,
  ) {}

  ngOnInit(): void {
    this.filter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
      paymentStatus: "pending",
      course: "",
    };
    this.getCourseOption();
    this.getAllData(this.filter, false);
  }
  getCourseOption() {
    this.options = [
      { value: "", label: "All Courses" },
      { value: "6a00abfc9a6ce5ba990f5e6f", label: "Prana Arambh" },
      { value: "6a00af947bc6b36f3ef0ac2c", label: "Swar Sadhana" },
      { value: "6a00b1ed9c892f5064e34739", label: "Pranic Purification" },
      { value: "6a00b33b220856ac7775c2bf", label: "200 Online TTC" },
      { value: "69ff6a520cd7ed2296fbbddb", label: "Online Live Class" },
      { value: "6a00b48fcd2d329aa196508d", label: "100 hour Rishikesh" },
      { value: "6a00b5e5be6d5aa0d803b71f", label: "200 hour Rishikesh" },
      { value: "6a00b998eefefe86dfedb27e", label: "300 hour Rishikesh" },
    ];
  }
  getAllData(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.loading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.page = isSearch ? 1 : this.page;
    this.service.getAllPendingPaymentList(filter).subscribe((res: any) => {
      const result = res.data[0];

      this.list = result.data;
      this.total = result.metadata[0].total ?? 0;
      this.dashboardShared.pendingPaymentTitle = `All Pending Payment List (${this.total})`;
      this.loading = this.list.length > 0 ? false : true;
    });
  }
  onTableDataChange(pageNo: number) {
    this.filter.pageNo = pageNo;
    this.page = pageNo;
    this.getAllData(this.filter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  onCourseValueChange(event: string) {
    this.filter.course = event;
    this.getAllData(this.filter, false);
  }
}

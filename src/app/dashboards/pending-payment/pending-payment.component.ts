import { Component, Input, OnInit } from "@angular/core";
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
  options: { value: string; label: string }[] = [];
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
      course: "",
    };
    this.getCourseOption();
    this.getAllData(this.filter, false);
  }
  getCourseOption() {
    this.options = [
      { value: "", label: "All Courses" },
      { value: "644f9dfc499ffcfb45df35cd", label: "Prana Arambh" },
      { value: "690262b474c8cdacdb607204", label: "Swar Sadhana" },
      { value: "63c51f6ba3082d9dd0100e4d", label: "Pranic Purification" },
      { value: "63c4e7e72bce43a907211c78", label: "200 Online TTC" },
      { value: "63fc3fdc6d203300eae38625", label: "Online Live Class" },
      { value: "63b817ec3362bfaf05d7cf3b", label: "100 hour Rishikesh" },
      { value: "63bd41f275bff3365e233ab9", label: "200 hour Rishikesh" },
      { value: "63c3d9caaa1fce47a3fa6f41", label: "300 hour Rishikesh" },
    ];
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

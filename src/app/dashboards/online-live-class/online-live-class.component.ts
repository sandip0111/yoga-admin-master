import { Component, Input, OnInit } from "@angular/core";
import {
  liveClassDataModel,
  searchLiveClassFilter,
} from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  selector: "app-online-live-class",
  templateUrl: "./online-live-class.component.html",
  styleUrls: ["./online-live-class.component.scss"],
})
export class OnlineLiveClassComponent implements OnInit {
  onlineClassFilter: searchLiveClassFilter;
  onineClassLoading: boolean = false;
  onlineClassPage: number = 1;
  onlineClassList: any;
  onlineClassTotal: number = 0;
  onlineClassPayType: string = "All";
  selectedGroupId: string;

  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];
  @Input() customerGroups;
  @Input() monthOption: string[];
  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService
  ) {}

  ngOnInit(): void {
    this.selectedGroupId = this.customerGroups[0].courseName;
    this.onlineClassFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
      month: "",
      course: this.selectedGroupId,
      paymentStatus: "all",
      paymentType: "",
    };
    this.getAllOnlineClassStudent(this.onlineClassFilter, false);
  }
  getAllOnlineClassStudent(
    filter: searchLiveClassFilter,
    isSearch: boolean
  ): void {
    this.onineClassLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.onlineClassPage = isSearch ? 1 : this.onlineClassPage;
    filter.month = filter.month == this.monthOption[0] ? "" : filter.month;
    filter.course = "Acharya Prashant Jakhmola";
    filter.paymentStatus =
      filter.paymentStatus == "all" ? "" : filter.paymentStatus;
    filter.paymentType = filter.paymentType == "All" ? "" : filter.paymentType;
    this.service
      .getAllLiveClassStudent(filter)
      .subscribe((res: liveClassDataModel) => {
        this.onlineClassList = res.data;
        this.onlineClassTotal = res.total;
        this.dashboardShared.onlineClassTitle = `Online Live Class (${this.onlineClassTotal})`;
        this.onineClassLoading = this.onlineClassList ? false : true;
      });
  }
  onPayStatusValueChange(status: string) {
    this.onlineClassFilter.paymentStatus = status;
    this.getAllOnlineClassStudent(this.onlineClassFilter, true);
  }
  onPayTypeValueChange(type: string) {
    this.onlineClassFilter.paymentType = type;
    this.getAllOnlineClassStudent(this.onlineClassFilter, true);
  }
  onlineClassTableDataChange(page: number) {
    this.onlineClassFilter.pageNo = page;
    this.onlineClassPage = page;
    this.getAllOnlineClassStudent(this.onlineClassFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  onMonthChange(month: string) {
    this.onlineClassFilter.month = month;
    this.getAllOnlineClassStudent(this.onlineClassFilter, true);
  }
}

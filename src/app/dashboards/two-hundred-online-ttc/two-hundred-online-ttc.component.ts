import { Component, Input, OnInit } from "@angular/core";
import {
  searchPranaRambhFilter,
  twoHunTTCModel,
  twoHunTTCModelResultModel,
} from "src/app/models/dashboard";
import { DashboardSharedService } from "../dashboard-shared.service";
import { ServiceService } from "src/app/services/service.service";

@Component({
  selector: "app-two-hundred-online-ttc",
  templateUrl: "./two-hundred-online-ttc.component.html",
  styleUrls: ["./two-hundred-online-ttc.component.scss"],
})
export class TwoHundredOnlineTtcComponent implements OnInit {
  twoHunTTCFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  twoHunTTCLoading: boolean = false;
  twoHunTTCPage: number = 1;
  twoHunTTCList: twoHunTTCModel[] = [];
  twoHunTTCTotal: number = 0;
  twoHunTTCPayType: string = "All";

  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];

  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService
  ) {}

  ngOnInit(): void {
    this.twoHunTTCFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.getAll200TTCStudent(this.twoHunTTCFilter, false);
  }
  getAll200TTCStudent(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.twoHunTTCLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.twoHunTTCPage = isSearch ? 1 : this.twoHunTTCPage;
    this.service
      .getAll200ttcStudent(filter)
      .subscribe((res: twoHunTTCModelResultModel) => {
        this.twoHunTTCList = res.data;
        this.twoHunTTCTotal = res.total ?? 0;
        this.dashboardShared.twoHunTTCTitle = `200 Online TTC (${this.twoHunTTCTotal})`;
        this.twoHunTTCLoading = this.twoHunTTCList ? false : true;
      });
  }
  onPayStatusValueChange(status: string) {
    status = status == "all" ? "" : status;
    this.twoHunTTCFilter.paymentStatus = status;
    this.getAll200TTCStudent(this.twoHunTTCFilter, true);
  }
  onPayTypeValueChange(paymentType: string) {
    paymentType = paymentType == "All" ? "" : paymentType;
    this.twoHunTTCFilter.paymentType = paymentType;
    this.getAll200TTCStudent(this.twoHunTTCFilter, true);
  }
  onTwoHunTTCTableDataChange(event: number) {
    this.twoHunTTCFilter.pageNo = event;
    this.twoHunTTCPage = event;
    this.getAll200TTCStudent(this.twoHunTTCFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

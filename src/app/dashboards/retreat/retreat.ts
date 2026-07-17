import { Component, Input } from "@angular/core";
import { searchPranaRambhFilter } from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  selector: "app-retreat",
  templateUrl: "./retreat.html",
  styleUrl: "./retreat.scss",
  standalone: false,
})
export class Retreat {
  retreatFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  retreatLoading: boolean = false;
  retreatPage: number = 1;
  retreatPayType: string = "All";
  retreatList: retreatDetailsDto[] = [];
  retreatTotal: number = 0;
  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];
  monthOption = [
    { value: "All Month Data", label: "All Month Data" },
    { value: "September, 2026", label: "September, 2026" },
  ];
  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService,
  ) {}
  ngOnInit(): void {
    this.retreatFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      month: "",
    };
    this.getAllRetreatStudent(this.retreatFilter, false);
  }
  getAllRetreatStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean,
  ): void {
    this.retreatLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    filter.month = filter.month === "All Month Data" ? "" : filter.month;
    this.retreatPage = isSearch ? 1 : this.retreatPage;
    this.service.getRetreatData(filter).subscribe((res: RetreatListDto) => {
      this.retreatList = res.data;
      this.retreatTotal = res.total ?? 0;
      this.dashboardShared.retreatTitle = `Retreat (${this.retreatTotal})`;
      this.retreatLoading = this.retreatList ? false : true;
    });
  }
  onMonthChange(month: string) {
    this.retreatFilter.month = month;
    this.getAllRetreatStudent(this.retreatFilter, true);
  }
  onPayStatusValueChange(status: string) {
    status = status == "all" ? "" : status;
    this.retreatFilter.paymentStatus = status;
    this.getAllRetreatStudent(this.retreatFilter, true);
  }
  onPayTypeValueChange(paymentType: string) {
    paymentType = paymentType == "All" ? "" : paymentType;
    this.retreatFilter.paymentType = paymentType;
    this.getAllRetreatStudent(this.retreatFilter, true);
  }
  deleteRow(student: retreatDetailsDto): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removeRetreatData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getAllRetreatStudent(this.retreatFilter, false);
        },
      });
    }
  }
  onRetreatTableDataChange(event: number) {
    this.retreatFilter.pageNo = event;
    this.retreatPage = event;
    this.getAllRetreatStudent(this.retreatFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
interface RetreatListDto {
  data: retreatDetailsDto[];
  total: number;
}
class retreatDetailsDto {
  _id: string;
  created: string;
  email: string;
  isDeleted: boolean;
  isPaymentCheck: boolean;
  month: string;
  name: string;
  paymentStatus: string;
  paymentType: string;
  phoneNumber: string;
  price: string;
  currency: string;
  room: string;
  constructor() {
    this._id = "";
    this.created = "";
    this.email = "";
    this.isDeleted = false;
    this.isPaymentCheck = false;
    this.month = "";
    this.name = "";
    this.paymentStatus = "";
    this.paymentType = "";
    this.phoneNumber = "";
    this.price = "";
    this.currency = "";
    this.room = "";
  }
}

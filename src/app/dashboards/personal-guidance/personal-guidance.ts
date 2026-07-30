import { Component, Input } from "@angular/core";
import { searchPranaRambhFilter } from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  selector: "app-personal-guidance",
  templateUrl: "./personal-guidance.html",
  styleUrl: "./personal-guidance.scss",
  standalone: false,
})
export class PersonalGuidance {
  pgFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  pgLoading: boolean = false;
  pgPage: number = 1;
  pgPayType: string = "All";
  pgList: any[] = []; //abc
  pgTotal: number = 0;
  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];
  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService,
  ) {}
  ngOnInit(): void {
    this.pgFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      month: "",
    };
    this.getAllPgStudent(this.pgFilter, false);
  }
  getAllPgStudent(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.pgLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.pgPage = isSearch ? 1 : this.pgPage;
    this.service.getPersonalGuidanceData(filter).subscribe((res: any) => {
      this.pgList = res.data;
      this.pgTotal = res.total ?? 0;
      this.dashboardShared.pgTitle = `Personal Guidance (${this.pgTotal})`;
      this.pgLoading = this.pgList ? false : true;
    });
  }
  onPayStatusValueChange(status: string) {
    status = status == "all" ? "" : status;
    this.pgFilter.paymentStatus = status;
    this.getAllPgStudent(this.pgFilter, true);
  }
  onPayTypeValueChange(paymentType: string) {
    paymentType = paymentType == "All" ? "" : paymentType;
    this.pgFilter.paymentType = paymentType;
    this.getAllPgStudent(this.pgFilter, true);
  }
  // deleteRow(student: retreatDetailsDto): void {
  //   if (confirm("Are you sure you want to delete this record?")) {
  //     this.service.removeRetreatData(student._id).subscribe({
  //       next: () => {
  //         alert("Record deleted successfully");
  //         this.getAllPgStudent(this.pgFilter, false);
  //       },
  //     });
  //   }
  // }
  onPgTableDataChange(event: number) {
    this.pgFilter.pageNo = event;
    this.pgPage = event;
    this.getAllPgStudent(this.pgFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  pranicPurificationModel,
  pranicPurificationResultModel,
  searchPranaRambhFilter,
} from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  selector: "app-pranic-purification",
  templateUrl: "./pranic-purification.component.html",
  styleUrls: ["./pranic-purification.component.scss"],
})
export class PranicPurificationComponent implements OnInit {
  filter: searchPranaRambhFilter = new searchPranaRambhFilter();
  loading: boolean = false;
  pranicPurificationList: pranicPurificationModel[] = [];
  pranicPurificationTotal: number = 0;
  pranicPurificationPage: number = 1;

  @Input() paymentOption: string[];
  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();

  constructor(
    private service: ServiceService,
    public dashboardShared: DashboardSharedService
  ) {}

  ngOnInit(): void {
    this.filter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
      isGetAll: false,
    };
    this.getAllData(this.filter, false);
  }

  getAllData(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.loading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.pranicPurificationPage = isSearch ? 1 : this.pranicPurificationPage;
    filter.isGetAll = false;
    this.service
      .getAllPranicPurificationStudent(filter)
      .subscribe((res: pranicPurificationResultModel) => {
        this.pranicPurificationList = res.data;
        this.pranicPurificationTotal = res.total;
        this.dashboardShared.pranicPurificationTitle = `Pranic Purification (${this.pranicPurificationTotal})`;
        this.loading = this.pranicPurificationList ? false : true;
      });
  }
  onPranicPurificationTableDataChange(event: number) {
    this.filter.pageNo = event;
    this.pranicPurificationPage = event;
    this.getAllData(this.filter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  exportToExcel(tableId: string): void {
    this.loading = true;
    let csvContent = "";
    const table = document.getElementById(tableId) as HTMLTableElement;
    if (!table) {
      console.error("Table not found:", tableId);
      return;
    }
    const headers = Array.from(table.querySelectorAll("thead th"))
      .map((th) => (th as HTMLElement).innerText)
      .join(",");
    csvContent += headers + "\n";
    const rowsData = [];
    this.filter.isGetAll = true;
    this.service
      .getAllPranicPurificationStudent(this.filter)
      .subscribe((res: pranicPurificationResultModel) => {
        res.data.forEach((student, index) => {
          rowsData.push([
            index + 1,
            student.name,
            student.email,
            student.phoneNumber,
            student.address || "N/A",
            `${student.price} ${student.currency}` || "N/A",
            student.couponcode || "N/A",
            student.paymentStatus,
            student.created || "N/A",
          ]);
        });
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });
        this.downloadCsv.emit({ csvContent, tableId });
        this.loading = false;
      });
  }
  onPayStatusValueChange(status: string) {
    status = status == "all" ? "" : status;
    this.filter.paymentStatus = status;
    this.getAllData(this.filter, true);
  }
}

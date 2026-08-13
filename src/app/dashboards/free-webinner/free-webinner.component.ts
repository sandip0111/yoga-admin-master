import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  freeWebinarDataModel,
  freeWebinarStudentModel,
  searchFreeWebinarFilter,
} from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  standalone: false,
  selector: "app-free-webinner",
  templateUrl: "./free-webinner.component.html",
  styleUrls: ["./free-webinner.component.scss"],
})
export class FreeWebinnerComponent implements OnInit {
  freeWebinarFilter: searchFreeWebinarFilter;
  freeLoading: boolean = false;
  freeWebinarPage: number = 1;
  freeWebinarList: freeWebinarStudentModel[] = [];
  freeWebinarTotal: number = 0;
  monthOption = [
    "All Month Data",
    "January, 2026",
    "June, 2026",
    "August, 2026",
  ];

  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();

  constructor(
    private service: ServiceService,
    public dashboardShared: DashboardSharedService,
  ) {}

  ngOnInit(): void {
    this.freeWebinarFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      month: "",
      fromDate: "",
      toDate: "",
    };
    this.getAllFreeWebinarData(this.freeWebinarFilter, false);
  }
  getAllFreeWebinarData(
    filter: searchFreeWebinarFilter,
    isSearch: boolean,
  ): void {
    this.freeLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    filter.month = filter.month == this.monthOption[0] ? "" : filter.month;
    this.freeWebinarPage = isSearch ? 1 : this.freeWebinarPage;
    this.service
      .getAllFreeWebinarData(filter)
      .subscribe((res: freeWebinarDataModel) => {
        this.freeWebinarList = res.data;
        this.freeWebinarTotal = res.total;
        this.dashboardShared.freeWebinarTitle = `Free Webinar (${this.freeWebinarTotal})`;
        this.freeLoading = this.freeWebinarList ? false : true;
      });
  }

  clearFilter(): void {
    this.freeWebinarFilter.searchText = "";
    this.freeWebinarFilter.fromDate = "";
    this.freeWebinarFilter.toDate = "";
    this.freeWebinarFilter.month = "";
    this.getAllFreeWebinarData(this.freeWebinarFilter, true);
  }

  exportToExcel(tableId: string): void {
    const table = document.getElementById(tableId) as HTMLTableElement;
    if (!table) return;
    let csvContent = "";
    const rows = Array.from(table.querySelectorAll("tr"));
    rows.forEach((row) => {
      const cols = Array.from(row.querySelectorAll("th, td"));
      const rowData = cols.map(
        (col) =>
          `"${(col as HTMLElement).innerText.trim().replace(/"/g, '""')}"`,
      );
      csvContent += rowData.join(",") + "\n";
    });
    this.downloadCsv.emit({ csvContent, tableId });
  }
  onFreeTableDataChange(event: number) {
    this.freeWebinarFilter.pageNo = event;
    this.freeWebinarPage = event;
    this.getAllFreeWebinarData(this.freeWebinarFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  sendBulkMail() {
    this.freeLoading = true;
    this.service.sendBulkMailFreeWebiner().subscribe((res: any) => {
      alert(res.message);
      if ((res.status = "ok")) {
        this.freeLoading = false;
      }
    });
  }

  onMonthChange(month: string) {
    this.freeWebinarFilter.month = month;
    this.getAllFreeWebinarData(this.freeWebinarFilter, true);
  }
  deleteRow(student: freeWebinarStudentModel): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removeFreeWebinarData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getAllFreeWebinarData(this.freeWebinarFilter, false);
        },
      });
    }
  }
}

import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { searchPranaRambhFilter } from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  selector: "app-breath-dtox",
  templateUrl: "./breath-dtox.component.html",
  styleUrls: ["./breath-dtox.component.scss"],
})
export class BreathDtoxComponent implements OnInit {
  bDtoxLoading: boolean = false;
  breathDetoxfilter: searchPranaRambhFilter;
  breathDetoxTotal: number;
  breathDetox: any[] = [];
  breathP: number = 1;
  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();

  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService
  ) {}

  ngOnInit(): void {
    this.breathDetoxfilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.getAllBreathDetoxStudent(this.breathDetoxfilter, false);
  }
  getAllBreathDetoxStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean
  ): void {
    this.bDtoxLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.breathP = isSearch ? 1 : this.breathP;
    this.service.getAllBreathDetoxStudent(filter).subscribe(
      (response: any) => {
        this.breathDetoxTotal = response.total;
        this.breathDetox = response.data;
        this.dashboardShared.breathDtoxTitle = `Breath Detox (${this.breathDetoxTotal})`;
        this.bDtoxLoading = this.breathDetox ? false : true;
      },
      (error) => {
        console.error("Error fetching breathDetox data:", error);
      }
    );
  }

  breathDetoxExportToExcel(tableId: string): void {
    this.bDtoxLoading = true;
    let filter = { ...this.breathDetoxfilter };
    filter.size = 100000;
    filter.pageNo = 0;
    this.service.getAllBreathDetoxStudent(filter).subscribe((res: any) => {
      if (!res.data || res.data.length === 0) {
        console.error("No data available for export.");
        return;
      }
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
      const rowsData: any[][] = [];
      res.data.forEach((student, index) => {
        rowsData.push([
          index + 1,
          student.firstName,
          student.email,
          student.phoneNumber,
          student.city,
          student.isActive,
        ]);
      });
      rowsData.forEach((row) => {
        csvContent += row.join(",") + "\n";
      });
      this.downloadCsv.emit({ csvContent, tableId });
      this.bDtoxLoading = false;
    });
  }
  onBreathDetoxTableDataChange(event: any) {
    this.breathDetoxfilter.pageNo = event;
    this.getAllBreathDetoxStudent(this.breathDetoxfilter, false);
    this.breathP = event;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

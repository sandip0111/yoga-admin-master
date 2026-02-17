import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { fosFilterModel } from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  selector: "app-functional-spirituality",
  templateUrl: "./functional-spirituality.component.html",
  styleUrls: ["./functional-spirituality.component.scss"],
})
export class FunctionalSpiritualityComponent implements OnInit {
  fosLoading: boolean = false;
  foundationDetoxfilter: fosFilterModel;
  foundationTotal: number = 0;
  foundationPage: number = 1;
  spiritualityStudent: any[] = [];

  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();
  constructor(
    private service: ServiceService,
    public dashboardShared: DashboardSharedService,
  ) {}

  ngOnInit(): void {
    this.foundationDetoxfilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      isGetAll: false,
    };
    this.getAllFoundationOfSpiritualityStudent(
      this.foundationDetoxfilter,
      false,
    );
  }
  getAllFoundationOfSpiritualityStudent(
    filter: fosFilterModel,
    isSearch: boolean,
  ) {
    this.fosLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    filter.isGetAll = false;
    this.foundationPage = isSearch ? 1 : this.foundationPage;
    this.service.getAllFoundationOfSpiritualityStudent(filter).subscribe(
      (response: any) => {
        this.foundationTotal = response.total;
        this.spiritualityStudent = response.data;
        this.dashboardShared.foundationSpiritualityTitle = `Foundation of Spirituality (${this.foundationTotal})`;
        this.fosLoading = false;
      },
      (error) => {
        console.error("Error fetching breathDetox data:", error);
      },
    );
  }
  foundationExportToExcel(tableId: string): void {
    this.fosLoading = true;
    this.foundationDetoxfilter.isGetAll = true;
    this.service
      .getAllFoundationOfSpiritualityStudent(this.foundationDetoxfilter)
      .subscribe((res: any) => {
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
            student.created
              ? new Date(student.created).toLocaleDateString()
              : "",
            student.isActive,
          ]);
        });
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });
        this.downloadCsv.emit({ csvContent, tableId });
        this.fosLoading = false;
      });
  }
  onfoundationTableDataChange(event: any) {
    this.foundationDetoxfilter.pageNo = event;
    this.getAllFoundationOfSpiritualityStudent(
      this.foundationDetoxfilter,
      false,
    );
    this.foundationPage = event;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

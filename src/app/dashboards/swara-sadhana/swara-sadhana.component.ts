import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  createSwaraSadhna,
  searchPranaRambhFilter,
  swarSadhnaDataModel,
  swarSadhnaStudentModel,
} from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  standalone: false,
  selector: "app-swara-sadhana",
  templateUrl: "./swara-sadhana.component.html",
  styleUrls: ["./swara-sadhana.component.scss"],
})
export class SwaraSadhanaComponent implements OnInit {
  swaraLoading: boolean = false;
  swaraSadhnaFilter: searchPranaRambhFilter;
  swaraSadhanaList: swarSadhnaStudentModel[] = [];
  swarSadhanaPage: number = 1;
  swaraPayType: string = "All";
  swarSadhanaTotal: number = 0;

  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];
  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();
  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService,
  ) {}
  ngOnInit(): void {
    this.swaraSadhnaFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
  }
  getAllSwaraSadhnaStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean,
  ): void {
    this.swaraLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.swarSadhanaPage = isSearch ? 1 : this.swarSadhanaPage;
    this.service
      .getAllSwaraSadhanaData(filter)
      .subscribe((res: swarSadhnaDataModel) => {
        this.swaraSadhanaList = res.data;
        this.swarSadhanaTotal = res.total;
        this.dashboardShared.swarSadhnaTitle = this.swarSadhanaTotal
          ? `Swara Sadhana (${this.swarSadhanaTotal})`
          : "Swara Sadhana (0)";
        this.swaraLoading = this.swaraSadhanaList ? false : true;
      });
  }
  clearFilter(): void {
    this.swaraSadhnaFilter.searchText = "";
    this.swaraSadhnaFilter.fromDate = "";
    this.swaraSadhnaFilter.toDate = "";
    this.swaraSadhnaFilter.paymentStatus = "";
    this.swaraSadhnaFilter.paymentType = "";
    this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, true);
  }
  swaraExportToExcel() {
    this.swaraLoading = true;
    const tableId = "Swara_Sadhana";
    let filter = { ...this.swaraSadhnaFilter };
    filter.size = 100000;
    filter.pageNo = 0;
    this.service
      .getAllSwaraSadhanaData(filter)
      .subscribe((res: swarSadhnaDataModel) => {
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
            student.name,
            student.email,
            student.phone,
            student.city,
            student.paymentStatus,
            student.created || "N/A",
          ]);
        });
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });
        this.downloadCsv.emit({ csvContent, tableId });
        this.swaraLoading = false;
      });
  }
  onPayStatusValueChange(event: string) {
    event = event == "all" ? "" : event;
    this.swaraSadhnaFilter.paymentStatus = event;
    this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
  }
  onPayTypeValueChange(event: string) {
    event = event == "All" ? "" : event;
    this.swaraSadhnaFilter.paymentType = event;
    this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
  }
  onswarSadhnaTableDataChange(pageNo: number) {
    this.swaraSadhnaFilter.pageNo = pageNo;
    this.swarSadhanaPage = pageNo;
    this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  deleteRow(student: swarSadhnaStudentModel): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removeSwaraSadhanaData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
        },
      });
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  PaymentDetailsModel,
  PranArambhModel,
  searchPranaRambhFilter,
} from "src/app/models/dashboard";
import { DashboardSharedService } from "../dashboard-shared.service";
import { ServiceService } from "src/app/services/service.service";

@Component({
  standalone: false,
  selector: "app-prana-arambh",
  templateUrl: "./prana-arambh.component.html",
  styleUrls: ["./prana-arambh.component.scss"],
})
export class PranaArambhComponent implements OnInit {
  isLoading: boolean = false;
  filter: searchPranaRambhFilter;
  students: PaymentDetailsModel[] = [];
  pranayamStudentTotal: number;
  p: number = 1;

  @Input() paymentOption: string[];
  @Input() paymentTypeOption: string[];
  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();
  constructor(
    private service: ServiceService,
    public dashboardShared: DashboardSharedService,
  ) {}

  ngOnInit(): void {
    this.filter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
      paymentType: "",
      paymentStatus: "",
      isGetAll: false,
    };
    this.getAllParayanamStudent(this.filter, false);
  }
  getAllParayanamStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean,
  ): void {
    this.isLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.p = isSearch ? 1 : this.p;
    this.filter.isGetAll = false;
    this.service
      .getAllParayanamStudent(filter)
      .subscribe((res: PranArambhModel) => {
        this.students = res.data;
        this.pranayamStudentTotal = res.total;
        this.dashboardShared.pranaArambhTitle = `Prana Arambh (${this.pranayamStudentTotal})`;
        this.isLoading = this.students ? false : true;
      });
  }
  clearFilter(): void {
    this.filter.searchText = "";
    this.filter.fromDate = "";
    this.filter.toDate = "";
    this.filter.paymentStatus = "";
    this.filter.paymentType = "";
    this.getAllParayanamStudent(this.filter, true);
  }
  pranayamExportToExcel(tableId: string): void {
    this.isLoading = true;
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
      .getAllParayanamStudent(this.filter)
      .subscribe((res: PranArambhModel) => {
        res.data.forEach((student, index) => {
          rowsData.push([
            index + 1,
            student.studentInfo.firstName,
            student.studentInfo.email,
            student.amount || "N/A",
            student.currency || "N/A",
            student.paymentStatus || "N/A",
            student.paymentBy || "N/A",
            student.created || "N/A",
          ]);
        });
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });
        this.downloadCsv.emit({ csvContent, tableId });
        this.isLoading = false;
      });
  }
  onPayStatusValueChange(status: string) {
    status = status == "all" ? "" : status;
    this.filter.paymentStatus = status;
    this.getAllParayanamStudent(this.filter, true);
  }
  onTableDataChange(event: number) {
    this.filter.pageNo = event;
    this.p = event;
    this.getAllParayanamStudent(this.filter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  deleteRow(student: PaymentDetailsModel): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removePranaArambhData(student.studentInfo._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getAllParayanamStudent(this.filter, false);
        },
      });
    }
  }
}

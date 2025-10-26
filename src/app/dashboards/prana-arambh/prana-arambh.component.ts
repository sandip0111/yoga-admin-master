import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  PaymentDetailsModel,
  PranArambhModel,
  searchPranaRambhFilter,
  StudentModel,
} from "src/app/models/dashboard";
import { DashboardSharedService } from "../dashboard-shared.service";
import { ServiceService } from "src/app/services/service.service";

@Component({
  selector: "app-prana-arambh",
  templateUrl: "./prana-arambh.component.html",
  styleUrls: ["./prana-arambh.component.scss"],
})
export class PranaArambhComponent implements OnInit {
  isLoading: boolean = false;
  filter: searchPranaRambhFilter;
  students: StudentModel[] = [];
  pranayamStudentTotal: number;
  p: number = 1;

  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];
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
    };
    this.getAllParayanamStudent(this.filter, false);
  }
  getAllParayanamStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean
  ): void {
    this.isLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.p = isSearch ? 1 : this.p;
    this.service
      .getAllParayanamStudent(filter)
      .subscribe((res: PranArambhModel) => {
        this.students = res.data;
        this.pranayamStudentTotal = res.total;
        this.dashboardShared.pranaArambhTitle = `Prana Arambh (${this.pranayamStudentTotal})`;
        if (this.students && this.students.length > 0) {
          for (let obj of this.students) {
            if (obj.paymentDetails?.length > 0) {
              for (let i in obj.paymentDetails) {
                if (+i == 0) {
                  obj.paymentDetailsObject = obj.paymentDetails[i];
                }
              }
            } else {
              obj.paymentDetailsObject = new PaymentDetailsModel();
            }
          }
        }
        this.isLoading = this.students ? false : true;
      });
  }
  pranayamExportToExcel(tableId: string): void {
    this.isLoading = true;
    let filter = { ...this.filter };
    filter.size = 100000;
    filter.pageNo = 0;
    this.service.getAllParayanamStudent(filter).subscribe((res: any) => {
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
          student.paymentDetails[0]?.amount || "N/A",
          student.paymentDetails[0]?.currency || "N/A",
          student.paymentDetails[0]?.paymentStatus || "N/A",
          student.paymentDetails[0]?.paymentBy || "N/A",
          student.paymentDetails[0]?.created || "N/A",
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
    this.filter.paymentStatus = status == "paid" ? status : "due";
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
}

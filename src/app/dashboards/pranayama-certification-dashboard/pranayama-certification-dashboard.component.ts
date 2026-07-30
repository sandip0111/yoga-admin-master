import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  searchPranaRambhFilter,
  twoHunTTCModelResultModel,
} from "src/app/models/dashboard";
import { DashboardSharedService } from "../dashboard-shared.service";
import { ServiceService } from "src/app/services/service.service";

@Component({
  standalone: false,
  selector: "app-pranayama-certification-dashboard",
  templateUrl: "./pranayama-certification-dashboard.component.html",
  styleUrls: ["./pranayama-certification-dashboard.component.scss"],
})
export class PranayamaCertificationDashboardComponent implements OnInit {
  pranayamaFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  pranayamaLoading: boolean = false;
  pranayamaPage: number = 1;
  pranayamaList: any[] = [];
  pranayamaTotal: number = 0;
  pranayamaPayType: string = "All";

  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];
  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();
  monthOption = [
    { value: "All Month Data", label: "All Month Data" },
    { value: "February, 2027", label: "February, 2027" },
  ];

  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService
  ) {}

  ngOnInit(): void {
    this.pranayamaFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      month: "",
    };
    this.getAllPranayamaStudent(this.pranayamaFilter, false);
  }
  getAllPranayamaStudent(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.pranayamaLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    filter.month = filter.month === "All Month Data" ? "" : filter.month;
    this.pranayamaPage = isSearch ? 1 : this.pranayamaPage;
    this.service
      .getAllPranayamaCertificationStudent(filter)
      .subscribe((res: twoHunTTCModelResultModel) => {
        this.pranayamaList = res.data;
        this.pranayamaTotal = res.total ?? 0;
        this.dashboardShared.pranayamaCertificationTitle = `Pranayama Certification (${this.pranayamaTotal})`;
        this.pranayamaLoading = this.pranayamaList ? false : true;
      });
  }

  clearFilter(): void {
    this.pranayamaFilter.searchText = "";
    this.pranayamaFilter.fromDate = "";
    this.pranayamaFilter.toDate = "";
    this.pranayamaFilter.paymentStatus = "";
    this.pranayamaFilter.paymentType = "";
    this.pranayamaFilter.month = "";
    this.getAllPranayamaStudent(this.pranayamaFilter, true);
  }

  exportToExcel(tableId: string): void {
    const table = document.getElementById(tableId) as HTMLTableElement;
    if (!table) return;
    let csvContent = "";
    const rows = Array.from(table.querySelectorAll("tr"));
    rows.forEach((row) => {
      const cols = Array.from(row.querySelectorAll("th, td"));
      const rowData = cols.map((col) => `"${(col as HTMLElement).innerText.trim().replace(/"/g, '""')}"`);
      csvContent += rowData.join(",") + "\n";
    });
    this.downloadCsv.emit({ csvContent, tableId });
  }
  onPayStatusValueChange(status: string) {
    status = status == "all" ? "" : status;
    this.pranayamaFilter.paymentStatus = status;
    this.getAllPranayamaStudent(this.pranayamaFilter, true);
  }
  onPayTypeValueChange(paymentType: string) {
    paymentType = paymentType == "All" ? "" : paymentType;
    this.pranayamaFilter.paymentType = paymentType;
    this.getAllPranayamaStudent(this.pranayamaFilter, true);
  }
  onPranayamaTableDataChange(event: number) {
    this.pranayamaFilter.pageNo = event;
    this.pranayamaPage = event;
    this.getAllPranayamaStudent(this.pranayamaFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  onMonthChange(month: string) {
    this.pranayamaFilter.month = month;
    this.getAllPranayamaStudent(this.pranayamaFilter, true);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  searchPranaRambhFilter,
  twoHunTTCModel,
  twoHunTTCModelResultModel,
} from "src/app/models/dashboard";
import { DashboardSharedService } from "../dashboard-shared.service";
import { ServiceService } from "src/app/services/service.service";

@Component({
  standalone: false,
  selector: "app-two-hundred-online-ttc",
  templateUrl: "./two-hundred-online-ttc.component.html",
  styleUrls: ["./two-hundred-online-ttc.component.scss"],
})
export class TwoHundredOnlineTtcComponent implements OnInit {
  twoHunTTCFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  twoHunTTCLoading: boolean = false;
  twoHunTTCPage: number = 1;
  twoHunTTCList: twoHunTTCModel[] = [];
  twoHunTTCTotal: number = 0;
  twoHunTTCPayType: string = "All";

  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];
  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();
  monthOption = [
    { value: "All Month Data", label: "All Month Data" },
    { value: "October", label: "October" },
    { value: "November", label: "November, 2025" },
    { value: "November, 2026", label: "November, 2026" },
  ];
  roomTypeOption = [
    { label: "All Plans", value: "" },
    { label: "Full Amount", value: "Full" },
    { label: "30% deposit", value: "30%" },
  ];

  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService,
  ) {}

  ngOnInit(): void {
    this.twoHunTTCFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      month: "",
    };
    this.getAll200TTCStudent(this.twoHunTTCFilter, false);
  }
  getAll200TTCStudent(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.twoHunTTCLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    filter.month = filter.month === "All Month Data" ? "" : filter.month;
    this.twoHunTTCPage = isSearch ? 1 : this.twoHunTTCPage;
    this.service
      .getAll200ttcStudent(filter)
      .subscribe((res: twoHunTTCModelResultModel) => {
        this.twoHunTTCList = res.data;
        this.twoHunTTCTotal = res.total ?? 0;
        this.dashboardShared.twoHunTTCTitle = `200 Online TTC (${this.twoHunTTCTotal})`;
        this.twoHunTTCLoading = this.twoHunTTCList ? false : true;
      });
  }
  clearFilter(): void {
    this.twoHunTTCFilter.searchText = "";
    this.twoHunTTCFilter.fromDate = "";
    this.twoHunTTCFilter.toDate = "";
    this.twoHunTTCFilter.paymentStatus = "";
    this.twoHunTTCFilter.paymentType = "";
    this.twoHunTTCFilter.month = "";
    (this.twoHunTTCFilter as any).roomType = "";
    this.getAll200TTCStudent(this.twoHunTTCFilter, true);
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
    this.twoHunTTCFilter.paymentStatus = status;
    this.getAll200TTCStudent(this.twoHunTTCFilter, true);
  }
  onPayTypeValueChange(paymentType: string) {
    paymentType = paymentType == "All" ? "" : paymentType;
    this.twoHunTTCFilter.paymentType = paymentType;
    this.getAll200TTCStudent(this.twoHunTTCFilter, true);
  }
  onRoomTypeChange(roomType: string) {
    (this.twoHunTTCFilter as any).roomType = roomType;
    this.getAll200TTCStudent(this.twoHunTTCFilter, true);
  }
  onTwoHunTTCTableDataChange(event: number) {
    this.twoHunTTCFilter.pageNo = event;
    this.twoHunTTCPage = event;
    this.getAll200TTCStudent(this.twoHunTTCFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  onMonthChange(month: string) {
    this.twoHunTTCFilter.month = month;
    this.getAll200TTCStudent(this.twoHunTTCFilter, true);
  }
  sendBulkMail() {
    this.twoHunTTCLoading = true;
    this.service.sendBulkMail200TTC().subscribe((res: any) => {
      alert(res.message);
      if ((res.status = "ok")) {
        this.twoHunTTCLoading = false;
      }
    });
  }
  giveAccessFn(studentData: twoHunTTCModel) {
    this.twoHunTTCLoading = true;
    this.service.giveAccessToUser(studentData).subscribe((res: any) => {
      alert(res.message);
      if ((res.status = "ok")) {
        this.twoHunTTCLoading = false;
      }
    });
  }
  deleteRow(student: twoHunTTCModel): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.remove200TTCData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getAll200TTCStudent(this.twoHunTTCFilter, false);
        },
      });
    }
  }
}

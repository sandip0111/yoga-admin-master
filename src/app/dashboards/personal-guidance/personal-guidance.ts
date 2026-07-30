import { Component, EventEmitter, Input, Output } from "@angular/core";
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
  pgList: pgDetailsDto[] = [];
  pgTotal: number = 0;
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
    this.service.getPersonalGuidanceData(filter).subscribe((res: pgListDto) => {
      this.pgList = res.data;
      this.pgTotal = res.total ?? 0;
      this.dashboardShared.pgTitle = `Personal Guidance (${this.pgTotal})`;
      this.pgLoading = this.pgList ? false : true;
    });
  }

  clearFilter(): void {
    this.pgFilter.searchText = "";
    this.pgFilter.fromDate = "";
    this.pgFilter.toDate = "";
    this.pgFilter.paymentStatus = "";
    this.pgFilter.paymentType = "";
    this.pgFilter.month = "";
    this.getAllPgStudent(this.pgFilter, true);
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
    this.pgFilter.paymentStatus = status;
    this.getAllPgStudent(this.pgFilter, true);
  }
  onPayTypeValueChange(paymentType: string) {
    paymentType = paymentType == "All" ? "" : paymentType;
    this.pgFilter.paymentType = paymentType;
    this.getAllPgStudent(this.pgFilter, true);
  }
  deleteRow(student: pgDetailsDto): void {
    if (confirm("Are you sure you want to delete this record?")) {
      if (student && student._id) {
        this.service.removePgData(student._id).subscribe({
          next: () => {
            alert("Record deleted successfully");
            this.getAllPgStudent(this.pgFilter, false);
          },
          error: (err: any) => {
            console.error("Failed to delete record:", err);
          }
        });
      }
    }
  }
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
interface pgListDto {
  data: pgDetailsDto[];
  total: number;
}

class pgDetailsDto {
  _id: string;
  courseType: string;
  created: string;
  currency: string;
  email: string;
  isDeleted: boolean;
  isPaymentCheck: boolean;
  month: string;
  name: string;
  paymentId: string;
  paymentStatus: string;
  paymentType: string;
  phoneNumber: string;
  price: string;
  selectedDate: string;
  selectedSlot: string;
  __v: number;

  constructor() {
    this._id = "";
    this.courseType = "";
    this.created = "";
    this.currency = "";
    this.email = "";
    this.isDeleted = false;
    this.isPaymentCheck = false;
    this.month = "";
    this.name = "";
    this.paymentId = "";
    this.paymentStatus = "";
    this.paymentType = "";
    this.phoneNumber = "";
    this.price = "";
    this.selectedDate = "";
    this.selectedSlot = "";
    this.__v = 0;
  }
}
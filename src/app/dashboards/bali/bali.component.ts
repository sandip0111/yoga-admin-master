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
  selector: "app-bali",
  templateUrl: "./bali.component.html",
  styleUrls: ["./bali.component.scss"],
})
export class BaliComponent implements OnInit {
  baliFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  loading: boolean = false;
  baliPage: number = 1;
  baliList: twoHunTTCModel[] = [];
  baliTotal: number = 0;
  baliPayType: string = "All";
  courseTypeOption = [
    { label: "All", value: "All" },
    { label: "100 hours", value: "100" },
    { label: "200 hours", value: "200" },
    { label: "300 hours", value: "300" },
  ];
  monthOption = ["All Month Data", "June, 2026", "July, 2026"];
  roomTypeOption = [
    { label: "All Rooms", value: "" },
    { label: "Private room", value: "Private room" },
    { label: "30% deposit – Private", value: "Reserve your private room with a 30% deposit" },
  ];

  @Input() paymentOption: { value: string; name: string }[];
  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();

  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService,
  ) {}

  ngOnInit(): void {
    this.baliFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      courseType: "All",
      month: "",
    };
    this.getBaliData(this.baliFilter, false);
  }

  getBaliData(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.loading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    filter.courseType = filter.courseType == "All" ? "" : filter.courseType;
    filter.month = filter.month == this.monthOption[0] ? "" : filter.month;
    this.baliPage = isSearch ? 1 : this.baliPage;
    this.service
      .getBaliData(filter)
      .subscribe((res: twoHunTTCModelResultModel) => {
        this.baliList = res.data || [];
        this.baliTotal = res.total ?? 0;
        this.dashboardShared.baliTitle = `Bali (${this.baliTotal})`;
        this.loading = this.baliList ? false : true;
      });
  }

  clearFilter(): void {
    this.baliFilter.searchText = "";
    this.baliFilter.fromDate = "";
    this.baliFilter.toDate = "";
    this.baliFilter.paymentStatus = "";
    this.baliFilter.courseType = "All";
    this.baliFilter.month = "";
    (this.baliFilter as any).roomType = "";
    this.getBaliData(this.baliFilter, true);
  }

  onPayStatusValueChange(status: string): void {
    status = status == "all" ? "" : status;
    this.baliFilter.paymentStatus = status;
    this.getBaliData(this.baliFilter, true);
  }

  onRoomTypeChange(roomType: string): void {
    (this.baliFilter as any).roomType = roomType;
    this.getBaliData(this.baliFilter, true);
  }

  baliExportToExcel(tableId: string): void {
    this.loading = true;
    let filter = { ...this.baliFilter };
    filter.size = 100000;
    filter.pageNo = 1;
    this.service
      .getBaliData(filter)
      .subscribe((res: twoHunTTCModelResultModel) => {
        if (!res.data || res.data.length === 0) {
          console.error("No data available for export.");
          this.loading = false;
          return;
        }
        let csvContent = "";
        const headers = [
          "Sl No.", "Student Name", "Course Type", "Email", "Phone",
          "Price", "Room / Payment Plan", "Month", "Payment Status",
          "Payment Type", "Payment Date"
        ].join(",");
        csvContent += headers + "\n";
        res.data.forEach((student, index) => {
          const row = [
            index + 1,
            student.name,
            student.hour ? `${student.hour} hour` : "",
            student.email,
            student.phoneNumber,
            student.price,
            student.room || "",
            student.month || "",
            student.paymentStatus,
            student.paymentType || "",
            student.created,
          ];
          csvContent += row.map((cell) => `"${cell}"`).join(",") + "\n";
        });
        this.downloadCsv.emit({ csvContent, tableId });
        this.loading = false;
      });
  }

  onCourseTypeChange(courseType: string): void {
    this.baliFilter.courseType = courseType;
    this.getBaliData(this.baliFilter, true);
  }

  onBaliTableDataChange(event: number): void {
    this.baliFilter.pageNo = event;
    this.baliPage = event;
    this.getBaliData(this.baliFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  onMonthChange(month: string) {
    this.baliFilter.month = month;
    this.getBaliData(this.baliFilter, true);
  }

  deleteRow(student: twoHunTTCModel): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removeBaliData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getBaliData(this.baliFilter, true);
        },
      });
    }
  }
}

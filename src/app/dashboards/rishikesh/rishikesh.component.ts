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
  selector: "app-rishikesh",
  templateUrl: "./rishikesh.component.html",
  styleUrls: ["./rishikesh.component.scss"],
})
export class RishikeshComponent implements OnInit {
  rishikeshFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  loading: boolean = false;
  rishikeshPage: number = 1;
  rishikeshList: twoHunTTCModel[] = [];
  rishikeshTotal: number = 0;
  rishikeshPayType: string = "All";
  courseTypeOption = [
    { label: "All", value: "All" },
    { label: "100 hours", value: "100" },
    { label: "200 hours", value: "200" },
    { label: "300 hours", value: "300" },
  ];
  monthOption = ["All Month Data", "March, 2026", "October, 2026"];
  roomTypeOption = [
    { label: "All Rooms", value: "" },
    { label: "Shared room", value: "Shared room" },
    { label: "Private room", value: "Private room" },
    { label: "30% deposit – Shared", value: "Reserve your shared room with a 30% deposit" },
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
    this.rishikeshFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      courseType: "All",
      month: "",
    };
    this.getRishikeshData(this.rishikeshFilter, false);
  }

  getRishikeshData(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.loading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    filter.courseType = filter.courseType == "All" ? "" : filter.courseType;
    filter.month = filter.month == this.monthOption[0] ? "" : filter.month;
    this.rishikeshPage = isSearch ? 1 : this.rishikeshPage;
    this.service
      .getRishikeshData(filter)
      .subscribe((res: twoHunTTCModelResultModel) => {
        this.rishikeshList = res.data || [];
        this.rishikeshTotal = res.total ?? 0;
        this.dashboardShared.rishikeshTitle = `Rishikesh (${this.rishikeshTotal})`;
        this.loading = this.rishikeshList ? false : true;
      });
  }

  clearFilter(): void {
    this.rishikeshFilter.searchText = "";
    this.rishikeshFilter.fromDate = "";
    this.rishikeshFilter.toDate = "";
    this.rishikeshFilter.paymentStatus = "";
    this.rishikeshFilter.courseType = "All";
    this.rishikeshFilter.month = "";
    (this.rishikeshFilter as any).roomType = "";
    this.getRishikeshData(this.rishikeshFilter, true);
  }

  onPayStatusValueChange(status: string): void {
    status = status == "all" ? "" : status;
    this.rishikeshFilter.paymentStatus = status;
    this.getRishikeshData(this.rishikeshFilter, true);
  }

  onRoomTypeChange(roomType: string): void {
    (this.rishikeshFilter as any).roomType = roomType;
    this.getRishikeshData(this.rishikeshFilter, true);
  }

  rishikeshExportToExcel(tableId: string): void {
    this.loading = true;
    let filter = { ...this.rishikeshFilter };
    filter.size = 100000;
    filter.pageNo = 1;
    this.service
      .getRishikeshData(filter)
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
    this.rishikeshFilter.courseType = courseType;
    this.getRishikeshData(this.rishikeshFilter, true);
  }

  onRishikeshTableDataChange(event: number): void {
    this.rishikeshFilter.pageNo = event;
    this.rishikeshPage = event;
    this.getRishikeshData(this.rishikeshFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  onMonthChange(month: string) {
    this.rishikeshFilter.month = month;
    this.getRishikeshData(this.rishikeshFilter, true);
  }

  deleteRow(student: twoHunTTCModel): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removeRishikeshData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getRishikeshData(this.rishikeshFilter, false);
        },
      });
    }
  }
}

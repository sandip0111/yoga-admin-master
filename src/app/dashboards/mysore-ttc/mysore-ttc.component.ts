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
  selector: "app-mysore-ttc",
  templateUrl: "./mysore-ttc.component.html",
  styleUrls: ["./mysore-ttc.component.scss"],
})
export class MysoreTTCComponent implements OnInit {
  mysoreTTCFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  loading: boolean = false;
  mysoreTTCPage: number = 1;
  mysoreTTCList: twoHunTTCModel[] = [];
  mysoreTTCTotal: number = 0;
  mysoreTTCPayType: string = "All";

  courseTypeOption = [
    { label: "All", value: "All" },
    { label: "100 hours", value: "100" },
    { label: "200 hours", value: "200" },
  ];
  monthOption = ["All Month Data", "October, 2027"];
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
    this.mysoreTTCFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      courseType: "All",
      month: "",
    };
    this.getMysoreTTCData(this.mysoreTTCFilter, false);
  }

  getMysoreTTCData(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.loading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    filter.courseType = filter.courseType == "All" ? "" : filter.courseType;
    filter.month = filter.month == this.monthOption[0] ? "" : filter.month;
    this.mysoreTTCPage = isSearch ? 1 : this.mysoreTTCPage;
    this.service
      .getMysoreTTCData(filter)
      .subscribe((res: twoHunTTCModelResultModel) => {
        this.mysoreTTCList = res.data || [];
        this.mysoreTTCTotal = res.total ?? 0;
        this.dashboardShared.mysoreTTCTitle = `Mysore TTC (${this.mysoreTTCTotal})`;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

  clearFilter(): void {
    this.mysoreTTCFilter.searchText = "";
    this.mysoreTTCFilter.fromDate = "";
    this.mysoreTTCFilter.toDate = "";
    this.mysoreTTCFilter.paymentStatus = "";
    this.mysoreTTCFilter.courseType = "All";
    this.mysoreTTCFilter.month = "";
    (this.mysoreTTCFilter as any).roomType = "";
    this.getMysoreTTCData(this.mysoreTTCFilter, true);
  }

  onPayStatusValueChange(status: string): void {
    status = status == "all" ? "" : status;
    this.mysoreTTCFilter.paymentStatus = status;
    this.getMysoreTTCData(this.mysoreTTCFilter, true);
  }

  onRoomTypeChange(roomType: string): void {
    (this.mysoreTTCFilter as any).roomType = roomType;
    this.getMysoreTTCData(this.mysoreTTCFilter, true);
  }

  mysoreTTCExportToExcel(tableId: string): void {
    this.loading = true;
    let filter = { ...this.mysoreTTCFilter };
    filter.size = 100000;
    filter.pageNo = 1;
    this.service
      .getMysoreTTCData(filter)
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
      }, () => {
        this.loading = false;
      });
  }

  onCourseTypeChange(courseType: string): void {
    this.mysoreTTCFilter.courseType = courseType;
    this.getMysoreTTCData(this.mysoreTTCFilter, true);
  }

  onMysoreTTCTableDataChange(event: number): void {
    this.mysoreTTCFilter.pageNo = event;
    this.mysoreTTCPage = event;
    this.getMysoreTTCData(this.mysoreTTCFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  onMonthChange(month: string) {
    this.mysoreTTCFilter.month = month;
    this.getMysoreTTCData(this.mysoreTTCFilter, true);
  }

  deleteRow(student: twoHunTTCModel): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removeMysoreTTCData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getMysoreTTCData(this.mysoreTTCFilter, true);
        },
      });
    }
  }
}

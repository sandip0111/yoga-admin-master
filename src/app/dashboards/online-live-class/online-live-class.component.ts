import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  liveClassDataModel,
  searchLiveClassFilter,
} from "src/app/models/dashboard";
import { ServiceService } from "src/app/services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  standalone: false,
  selector: "app-online-live-class",
  templateUrl: "./online-live-class.component.html",
  styleUrls: ["./online-live-class.component.scss"],
})
export class OnlineLiveClassComponent implements OnInit {
  onlineClassFilter: searchLiveClassFilter | undefined;
  onineClassLoading: boolean = false;
  onlineClassPage: number = 1;
  onlineClassList: any;
  onlineClassTotal: number = 0;
  onlineClassPayType: string = "All";
  selectedGroupId!: string;
  teachersDropdown: teachersDropdownDto[] = [];
  selectedTeacher: number = 1;

  @Input() paymentOption: { value: string; name: string };
  @Input() paymentTypeOption: string[];
  @Input() customerGroups;
  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();
  monthOption = [
    "All Month Data",
    "October",
    "November",
    "December",
    "January, 2026",
    "February, 2026",
    "March, 2026",
    "April, 2026",
    "May, 2026",
    "June, 2026",
    "July, 2026",
    "August, 2026",
  ];
  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService,
  ) {}

  ngOnInit(): void {
    this.selectedGroupId = this.customerGroups[0].courseName;
    this.onlineClassFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
      month: "",
      course: this.selectedGroupId,
      paymentStatus: "all",
      paymentType: "",
      teacherId: this.selectedTeacher,
    };
    this.getTeachersData();
  }
  getTeachersData() {
    this.service
      .getAllLiveClassTeacher()
      .subscribe((res: teacherDropdownResponseDto) => {
        this.teachersDropdown = res.data.teachersData;
        this.getTeachersName(this.selectedTeacher);
        this.getAllOnlineClassStudent(this.onlineClassFilter, false);
      });
  }
  getAllOnlineClassStudent(
    filter: searchLiveClassFilter,
    isSearch: boolean,
  ): void {
    this.onineClassLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.onlineClassPage = isSearch ? 1 : this.onlineClassPage;
    filter.month = filter.month == this.monthOption[0] ? "" : filter.month;
    filter.course = "Acharya Prashant Jakhmola";
    filter.paymentStatus =
      filter.paymentStatus == "all" ? "" : filter.paymentStatus;
    filter.paymentType = filter.paymentType == "All" ? "" : filter.paymentType;
    this.service
      .getAllLiveClassStudent(filter)
      .subscribe((res: liveClassDataModel) => {
        this.onlineClassList = res.data;
        this.onlineClassTotal = res.total;
        this.dashboardShared.onlineClassTitle = `Online Live Class (${this.onlineClassTotal})`;
        this.onineClassLoading = this.onlineClassList ? false : true;
      });
  }

  clearFilter(): void {
    if (this.onlineClassFilter) {
      this.onlineClassFilter.searchText = "";
      this.onlineClassFilter.fromDate = "";
      this.onlineClassFilter.toDate = "";
      this.onlineClassFilter.month = "";
      this.onlineClassFilter.paymentStatus = "all";
      this.onlineClassFilter.paymentType = "";
      this.getAllOnlineClassStudent(this.onlineClassFilter, true);
    }
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
    this.onlineClassFilter.paymentStatus = status;
    this.getAllOnlineClassStudent(this.onlineClassFilter, true);
  }

  onPayTypeValueChange(type: string) {
    this.onlineClassFilter.paymentType = type;
    this.getAllOnlineClassStudent(this.onlineClassFilter, true);
  }

  onlineClassTableDataChange(page: number) {
    this.onlineClassFilter.pageNo = page;
    this.onlineClassPage = page;
    this.getAllOnlineClassStudent(this.onlineClassFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  onMonthChange(month: string) {
    this.onlineClassFilter.month = month;
    this.getAllOnlineClassStudent(this.onlineClassFilter, true);
  }

  selectedTeacherName: string = "";
  onTeacherChange() {
    this.getTeachersName(this.selectedTeacher);
    this.onlineClassFilter.teacherId = this.selectedTeacher;
    this.getAllOnlineClassStudent(this.onlineClassFilter, true);
  }

  getTeachersName(selectedTeacherId: number) {
    this.selectedTeacherName = this.teachersDropdown.find(
      (t) => t.id == selectedTeacherId,
    ).name;
  }

  deleteRow(student: any): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removeOnlineLiveClassData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getAllOnlineClassStudent(this.onlineClassFilter, false);
        },
      });
    }
  }
}
class teachersDropdownDto {
  id: number;
  name: string;
}

class teacherDropdownResponseDto {
  status: boolean;
  data: {
    _id: string;
    teachersData: teachersDropdownDto[];
  };
}

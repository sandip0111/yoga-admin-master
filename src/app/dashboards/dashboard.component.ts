import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  liveClassCustomerModel,
  liveClassDataModel,
  liveClassTeacherModel,
  searchLiveClassFilter,
  searchPranaRambhFilter,
  swarSadhnaDataModel,
  swarSadhnaStudentModel,
} from "../models/dashboard";
import { paymentStatus } from "../enums/payment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = false;
  filteredStudents: any[] = [];
  filter: searchPranaRambhFilter;
  allPranayamStudents: any[] = [];
  breathDetoxfilter: searchPranaRambhFilter;
  foundationDetoxfilter: any = {};
  pranayamStudentTotal: number;
  foundationTotal: any;
  breathDetoxTotal: any;
  p: number = 1;
  breathP: any = 1;
  foundationP: any = 1;
  students: any[] = []; // Store student data
  totalCustomers: number = 0;
  totalCustomersAll: number = 0;
  customers: liveClassCustomerModel[] = [];
  customerGroups: liveClassTeacherModel[] = [];
  breathDetox: any[] = [];
  spiritualityStudent: any[] = [];
  searchTextBreathDetox: string = "";
  searchTextFOS: string = "";
  liveClassFilter: searchLiveClassFilter;
  swaraSadhnaFilter: searchPranaRambhFilter;
  swaraSadhanaList: swarSadhnaStudentModel[] = [];
  swarSadhanaTotal: number = 0;
  swarSadhnaTitle: string = `Swara Sadhana (${this.swarSadhanaTotal})`;
  swarSadhanaPage: number = 1;
  paymentStatusEnum = paymentStatus;
  swaraLoading: boolean = false;
  bDtoxLoading: boolean = false;
  fosLoading: boolean = false;
  liveClassLoading: boolean = false;
  selectedGroupId: string;
  liveClassPage: number = 1;
  constructor(private service: ServiceService, private route: ActivatedRoute) {
    this.filter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.breathDetoxfilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.customerGroups = [
      {
        courseName: "Acharya Prashant Jakhmola online yoga class",
        courseValue: 0,
      },
      {
        courseName: "Anuj online yoga class",
        courseValue: 1,
      },
      {
        courseName: "Taniya online yoga class",
        courseValue: 2,
      },
      {
        courseName: "Shivam Joshi online yoga class",
        courseValue: 3,
      },
    ];
    this.selectedGroupId = this.customerGroups[0].courseName;
    this.liveClassFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
      course: this.selectedGroupId,
    };
    this.swaraSadhnaFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
  }
  ngOnInit(): void {
    this.foundationDetoxfilter = { pageNo: 1, size: 10 };
    this.getAllParayanamStudent(this.filter, false);
    this.getAllLiveClassStudent(this.liveClassFilter, false);
    this.getAllBreathDetoxStudent(this.breathDetoxfilter);
    this.getAllFoundationOfSpiritualityStudent();
    this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
  }
  searchFOS() {
    this.foundationDetoxfilter.searchText = this.searchTextFOS;
    this.service
      .getAllFoundationOfSpiritualityStudent(this.foundationDetoxfilter)
      .subscribe(
        (response: any) => {
          if (response && response.data.length > 0) {
            this.foundationTotal = response.total;
            this.spiritualityStudent = response.data;
            console.log(
              "Response fetching spiritualityStudent data:",
              this.spiritualityStudent,
              "total",
              this.foundationTotal
            );
          }
        },
        (error) => {
          console.error("Error fetching breathDetox data:", error);
        }
      );
  }
  getAllParayanamStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean
  ): void {
    this.isLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.p = isSearch ? 1 : this.p;
    this.service.getAllParayanamStudent(filter).subscribe((res: any) => {
      this.students = res.data;
      this.pranayamStudentTotal = res.total;
      if (this.students && this.students.length > 0) {
        for (let obj of this.students) {
          if (obj.paymentDetails?.length > 0) {
            for (let i in obj.paymentDetails) {
              if (+i > 0) {
                // ++this.pranayamStudentTotal;
              } else {
                obj.paymentDetailsObject = obj.paymentDetails[i];
              }
            }
          } else {
            obj.paymentDetailsObject = {};
          }
        }
      }
      this.isLoading = this.students ? false : true;
    });
  }
  getAllLiveClassStudent(filter: searchLiveClassFilter, isSearch: boolean) {
    this.liveClassLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.liveClassPage = isSearch ? 1 : this.liveClassPage;
    this.service.getAllLiveClassStudent(filter).subscribe(
      (response: liveClassDataModel) => {
        this.customers = response.data;
        this.totalCustomersAll = response.total;
        this.liveClassLoading = false;
      },
      (error) => {
        console.error("Error fetching customer data:", error);
      }
    );
  }
  getAllFoundationOfSpiritualityStudent() {
    this.service
      .getAllFoundationOfSpiritualityStudent(this.foundationDetoxfilter)
      .subscribe(
        (response: any) => {
          if (response && response.data.length > 0) {
            this.foundationTotal = response.total;
            this.spiritualityStudent = response.data;
            console.log(
              "Response fetching spiritualityStudent data:",
              this.spiritualityStudent,
              "total",
              this.foundationTotal
            );
          }
        },
        (error) => {
          console.error("Error fetching breathDetox data:", error);
        }
      );
  }
  getAllBreathDetoxStudent(filter: searchPranaRambhFilter): void {
    this.bDtoxLoading = true;
    this.service.getAllBreathDetoxStudent(filter).subscribe(
      (response: any) => {
        this.breathDetoxTotal = response.total;
        this.breathDetox = response.data;
        this.bDtoxLoading = this.breathDetox ? false : true;
      },
      (error) => {
        console.error("Error fetching breathDetox data:", error);
      }
    );
  }
  getAllSwaraSadhnaStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean
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
        this.swarSadhnaTitle = `Swara Sadhana (${this.swarSadhanaTotal})`;
        this.swaraLoading = this.swaraSadhanaList ? false : true;
      });
  }
  onLiveClassTableDataChange(event: number) {
    this.liveClassFilter.pageNo = event;
    this.liveClassPage = event;
    this.getAllLiveClassStudent(this.liveClassFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
  onBreathDetoxTableDataChange(event: any) {
    this.breathDetoxfilter.pageNo = event;
    this.getAllBreathDetoxStudent(this.breathDetoxfilter);
    this.breathP = event;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  onfoundationTableDataChange(event: any) {
    this.foundationDetoxfilter.pageNo = event;
    this.getAllFoundationOfSpiritualityStudent();
    this.foundationP = event;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  onswarSadhnaTableDataChange(event: number) {
    this.swaraSadhnaFilter.pageNo = event;
    this.swarSadhanaPage = event;
    this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  pranayamExportToExcel(tableId: string): void {
    let pranarambhFilter: searchPranaRambhFilter = {
      size: 10000,
      pageNo: 0,
      searchText: "",
      fromDate: "",
      toDate: "",
    }; // Ensure fetching all records

    this.service
      .getAllParayanamStudent(pranarambhFilter)
      .subscribe((res: any) => {
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

        // Extract headers
        const headers = Array.from(table.querySelectorAll("thead th"))
          .map((th) => (th as HTMLElement).innerText)
          .join(",");
        csvContent += headers + "\n";

        // Extract rows from API response
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
            student.latestOnlinePayment?.price || "N/A",
            student.latestOnlinePayment?.currency || "N/A",
            student.latestOnlinePayment?.paymentStatus || "N/A",
          ]);
        });

        // Add rows to CSV content
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });

        // Create & Download CSV file
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${tableId}_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  breathDetoxExportToExcel(tableId: string): void {
    let breathdetoxFilter: searchPranaRambhFilter = {
      size: 10000,
      pageNo: 0,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.service
      .getAllBreathDetoxStudent(breathdetoxFilter)
      .subscribe((res: any) => {
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

        // Extract headers
        const headers = Array.from(table.querySelectorAll("thead th"))
          .map((th) => (th as HTMLElement).innerText)
          .join(",");
        csvContent += headers + "\n";

        // Extract rows from API response
        const rowsData: any[][] = [];
        res.data.forEach((student, index) => {
          rowsData.push([
            index + 1,
            student.firstName,
            student.email,
            student.city,
            student.isActive,
          ]);
        });

        // Add rows to CSV content
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });

        // Create & Download CSV file
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${tableId}_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  foundationExportToExcel(tableId: string): void {
    let foundationFilter = { size: 10000 }; // Ensure fetching all records

    this.service
      .getAllFoundationOfSpiritualityStudent(foundationFilter)
      .subscribe((res: any) => {
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

        // Extract headers
        const headers = Array.from(table.querySelectorAll("thead th"))
          .map((th) => (th as HTMLElement).innerText)
          .join(",");
        csvContent += headers + "\n";

        // Extract rows from API response
        const rowsData: any[][] = [];
        res.data.forEach((student, index) => {
          rowsData.push([
            index + 1,
            student.firstName,
            student.email,
            student.isActive,
          ]);
        });

        // Add rows to CSV content
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });

        // Create & Download CSV file
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${tableId}_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  liveClassStudentExportToExcel(tableId: string) {
    this.liveClassLoading = true;
    let filter = { ...this.liveClassFilter };
    filter.size = 100000;
    filter.pageNo = 0;
    this.service
      .getAllLiveClassStudent(filter)
      .subscribe((res: liveClassDataModel) => {
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
            student.courseTimming,
            student.price,
            student.currency,
            student.paymentStatus,
            student.created || "N/A",
          ]);
        });
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });
        this.downloadCsv(csvContent, tableId);
        this.liveClassLoading = false;
      });
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
        this.downloadCsv(csvContent, tableId);
        this.swaraLoading = false;
      });
  }
  downloadCsv(csvContent: string, tableId: string) {
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${tableId}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

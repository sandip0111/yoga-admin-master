import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
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
  liveClassStudentTotal: number;
  foundationTotal: any;
  breathDetoxTotal: any;
  p: number = 1;
  breathP: any = 1;
  foundationP: any = 1;
  students: any[] = []; // Store student data
  totalCustomers: number = 0;
  totalCustomersAll: number = 0;
  customers: any[] = [];
  customerGroups: any[] = [];
  breathDetox: any[] = [];
  spiritualityStudent: any[] = [];
  searchTextBreathDetox: string = "";
  searchTextFOS: string = "";
  liveClassFilter: searchPranaRambhFilter;
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
  constructor(private service: ServiceService, private route: ActivatedRoute) {}
  ngOnInit(): void {
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
    this.liveClassFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.swaraSadhnaFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.foundationDetoxfilter = { pageNo: 1, size: 10 };
    this.getAllParayanamStudent(this.filter, false);
    this.getAllLiveClassStudent(this.liveClassFilter);
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
  getAllLiveClassStudent(filter: searchPranaRambhFilter) {
    this.liveClassLoading = true;
    this.service.getAllLiveClassStudent(filter).subscribe(
      (response: any) => {
        if (response && response.data.length > 0) {
          this.customerGroups = response.data;
          this.liveClassStudentTotal = response.total;
          this.liveClassLoading = false;
          const selectCorse =
            this.selectedGroupId ?? this.customerGroups[0]._id;
          this.onSelectCustomerGroup(selectCorse);
          this.totalCustomersAll = response.data.reduce(
            (sum, item) => sum + item.totalCustomers,
            0
          );
          console.log("live class stdnt", this.customers);
        }
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
  selectedGroupId: string;
  onSelectCustomerGroup(selectedId: string) {
    const selectedGroup = this.customerGroups.find(
      (group) => group._id === selectedId
    );
    this.selectedGroupId = selectedId;
    console.log(selectedGroup);
    if (selectedGroup) {
      this.totalCustomers = selectedGroup.totalCustomers;
      this.customers = selectedGroup.customers;
    } else {
      this.totalCustomers = 0;
      this.customers = [];
    }
  }
  onLiveClassTableDataChange(event: number) {
    this.liveClassFilter.pageNo = event;
    this.getAllLiveClassStudent(this.liveClassFilter);
    this.p = event;
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
    const table = document.getElementById(tableId) as HTMLTableElement;
    if (!table) {
      console.error("Table not found:", tableId);
      return;
    }

    let csvContent = "";

    // Extract headers
    const headers = Array.from(table.querySelectorAll("thead th"))
      .map((th) => (th as HTMLElement).innerText) // ✅ Fix: Cast to HTMLElement
      .join(",");
    csvContent += headers + "\n";

    // Extract rows
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    rows.forEach((row) => {
      const rowData = Array.from(row.querySelectorAll("td"))
        .map((td) => (td as HTMLElement).innerText) // ✅ Fix: Cast to HTMLElement
        .join(",");
      csvContent += rowData + "\n";
    });

    // Create & Download CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${tableId}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${tableId}_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.swaraLoading = false;
      });
  }
}

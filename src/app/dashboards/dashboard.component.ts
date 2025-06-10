import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { searchPranaRambhFilter } from "../models/filter";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  filteredStudents: any[] = [];
  filter: searchPranaRambhFilter;
  allPranayamStudents: any[] = [];
  breathDetoxfilter: any = {};
  foundationDetoxfilter: any = {};
  pranayamStudentTotal: any;
  liveClassStudentTotal: any;
  foundationTotal: any;
  breathDetoxTotal: any;
  p: any = 1;
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
  constructor(private service: ServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.breathDetoxfilter = { pageNo: 1, size: 10 };
    this.foundationDetoxfilter = { pageNo: 1, size: 10 };
    this.getAllParayanamStudent(this.filter);
    this.getAllLiveClassStudent();
    this.getAllBreathDetoxStudent();
    this.getAllFoundationOfSpiritualityStudent();
  }
  searchBreath() {
    this.breathDetoxfilter.searchText = this.searchTextBreathDetox;
    this.service.getAllBreathDetoxStudent(this.breathDetoxfilter).subscribe(
      (response: any) => {
        if (response && response.data.length > 0) {
          this.breathDetoxTotal = response.total;
          this.breathDetox = response.data;
        }
      },
      (error) => {
        console.error("Error fetching breathDetox data:", error);
      }
    );
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

  getAllParayanamStudent(filter: searchPranaRambhFilter): void {
    this.isLoading = true;
    this.service.getAllParayanamStudent(filter).subscribe((res: any) => {
      console.log("Fetched Students:", res);
      this.students = res.data;
      this.pranayamStudentTotal = res.total;
      this.isLoading = this.students ? false : true;
    });
  }

  getAllLiveClassStudent() {
    this.service.getAllLiveClassStudent(this.filter).subscribe(
      (response: any) => {
        if (response && response.data.length > 0) {
          this.customerGroups = response.data;
          this.liveClassStudentTotal = response.total;
          this.isLoading = false;
          this.onSelectCustomerGroup(this.customerGroups[0]._id);
          this.totalCustomers = response.data[0].totalCustomers;
          this.totalCustomersAll = response.data.reduce(
            (sum, item) => sum + item.totalCustomers,
            0
          );
          this.customers = response.data[0].customers;
          console.log("live class stdnt", this.totalCustomersAll);
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
  getAllBreathDetoxStudent() {
    this.service.getAllBreathDetoxStudent(this.breathDetoxfilter).subscribe(
      (response: any) => {
        if (response && response.data.length > 0) {
          this.breathDetoxTotal = response.total;
          this.breathDetox = response.data;
        }
      },
      (error) => {
        console.error("Error fetching breathDetox data:", error);
      }
    );
  }

  onSelectCustomerGroup(selectedId: string) {
    const selectedGroup = this.customerGroups.find(
      (group) => group._id === selectedId
    );
    if (selectedGroup) {
      this.totalCustomers = selectedGroup.totalCustomers;
      this.customers = selectedGroup.customers;
    } else {
      this.totalCustomers = 0;
      this.customers = [];
    }
  }

  onTableDataChange(event: number) {
    this.filter.pageNo = event;
    this.getAllParayanamStudent(this.filter);
    // this.getAllLiveClassStudent();
    this.p = event;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  onBreathDetoxTableDataChange(event: any) {
    this.breathDetoxfilter.pageNo = event;
    this.getAllBreathDetoxStudent();
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
    let breathdetoxFilter = { size: 10000 }; // Ensure fetching all records

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
}

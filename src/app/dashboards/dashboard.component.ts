import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  fosFilterModel,
  liveClassCustomerModel,
  liveClassDataModel,
  liveClassTeacherModel,
  PranArambhModel,
  searchLiveClassFilter,
  searchPranaRambhFilter,
  StudentModel,
  swarSadhnaDataModel,
  swarSadhnaStudentModel,
  createSwaraSadhna,
  generatePassword,
  PaymentDetailsModel,
  pranicPurificationResultModel,
  pranicPurificationModel,
  twoHunTTCModelResultModel,
  twoHunTTCModel,
  createPranicPurification,
  octoberPrashantFilter,
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
  foundationDetoxfilter: fosFilterModel;
  pranayamStudentTotal: number;
  foundationTotal: any;
  breathDetoxTotal: any;
  p: number = 1;
  breathP: any = 1;
  foundationP: any = 1;
  students: StudentModel[] = [];
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
  createSwaraSadhnaFrom: createSwaraSadhna;
  createSwaraSadhnaTitle: string = `Create Student`;
  swarSadhanaPage: number = 1;
  paymentStatusEnum = paymentStatus;
  swaraLoading: boolean = false;
  bDtoxLoading: boolean = false;
  fosLoading: boolean = false;
  liveClassLoading: boolean = false;
  selectedGroupId: string;
  liveClassPage: number = 1;
  pranicPurificationFilter: searchPranaRambhFilter =
    new searchPranaRambhFilter();
  pranicLoading: boolean = false;
  pranicPurificationList: pranicPurificationModel[] = [];
  pranicPurificationTotal: number = 0;
  pranicPurificationPage: number = 1;
  pranicPurificationTitle: string = "";
  twoHunTTCTitle: string = "";
  twoHunTTCFilter: searchPranaRambhFilter = new searchPranaRambhFilter();
  twoHunTTCLoading: boolean = false;
  twoHunTTCPage: number = 1;
  twoHunTTCList: twoHunTTCModel[] = [];
  twoHunTTCTotal: number = 0;
  octoberPrashantTitle: string = "";
  octoberPrashantFilter: octoberPrashantFilter;
  octoberPrashantLoading: boolean = false;
  octoberPrashantPage: number = 1;
  octoberPrashantList: any;
  octoberPrashantTotal: number = 0;
  selectedOption: number = 0;
  options = [
    { value: 1, label: "Swar Sadhana" },
    { value: 2, label: "Pranic Purification" },
    { value: 3, label: "200 Teacher Training Course" },
    { value: 4, label: "Online Class" },
  ];
  paymentOption = [
    { value: "all", name: "All" },
    { value: "paid", name: "Paid" },
    { value: "unpaid", name: "Unpaid" },
  ];
  onlineTeacherOption = [
    {
      id: 1,
      priceINR: 2999,
      priceUSD: 70,
      quantity: 1,
      title: "Acharya Prashant Jakhmola - Yoga Sadhana",
      name: "Yoga Sadhana",
      shortDescription:
        "Interactive class combining Hatha asanas and pranayama each morning for holistic physical, mental, and spiritual growth. Suitable for all levels, with focus on correct alignment and routine building.",
    },
    {
      id: 3,
      priceINR: 1999,
      priceUSD: 40,
      quantity: 1,
      title: "Taniya Verma - Woman Wellness Yoga",
      name: "Woman Wellness Yoga",
      shortDescription:
        "A gentle and supportive practice designed specially for women from menstruation to menopause combining asana, pranayama, nutrition tips and hormone-balancing restorative techniques.",
    },
  ];
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
    this.foundationDetoxfilter = { pageNo: 1, size: 10, searchText: "" };
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
      paymentStatus: "all",
      month: "October",
    };
    this.swaraSadhnaFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.createSwaraSadhnaFrom = {
      name: "",
      email: "",
      phone: "",
      city: "",
      password: "",
      webinar: "Swara Sadhana",
    };
    this.pranicPurificationFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
    };
    this.octoberPrashantFilter = {
      pageNo: 1,
      size: 10,
      searchText: "",
      fromDate: "",
      toDate: "",
      month: "October",
      course: this.selectedGroupId,
      paymentStatus: "all",
    };
    this.twoHunTTCFilter = this.pranicPurificationFilter;
  }
  ngOnInit(): void {
    this.getAllParayanamStudent(this.filter, false);
    this.getAllLiveClassStudent(this.liveClassFilter, false);
    this.getAllBreathDetoxStudent(this.breathDetoxfilter);
    this.getAllFoundationOfSpiritualityStudent(this.foundationDetoxfilter);
    this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
    this.getAllPranicPurificationStudent(this.pranicPurificationFilter, false);
    this.getAll200TTCStudent(this.twoHunTTCFilter, false);
    this.getAllOctoberPrashantStudent(this.octoberPrashantFilter, false);
  }
  getAllParayanamStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean
  ): void {
    this.isLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.p = isSearch ? 1 : this.p;
    this.service
      .getAllParayanamStudent(filter)
      .subscribe((res: PranArambhModel) => {
        this.students = res.data;
        this.pranayamStudentTotal = res.total;
        if (this.students && this.students.length > 0) {
          for (let obj of this.students) {
            if (obj.paymentDetails?.length > 0) {
              for (let i in obj.paymentDetails) {
                if (+i == 0) {
                  obj.paymentDetailsObject = obj.paymentDetails[i];
                }
              }
            } else {
              obj.paymentDetailsObject = new PaymentDetailsModel();
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
  getAllFoundationOfSpiritualityStudent(filter: fosFilterModel) {
    this.fosLoading = true;
    this.service.getAllFoundationOfSpiritualityStudent(filter).subscribe(
      (response: any) => {
        this.foundationTotal = response.total;
        this.spiritualityStudent = response.data;
        this.fosLoading = false;
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
    this.getAllFoundationOfSpiritualityStudent(this.foundationDetoxfilter);
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
    this.isLoading = true;
    let filter = { ...this.filter };
    filter.size = 100000;
    filter.pageNo = 0;
    this.service.getAllParayanamStudent(filter).subscribe((res: any) => {
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
          student.firstName,
          student.email,
          student.paymentDetails[0]?.amount || "N/A",
          student.paymentDetails[0]?.currency || "N/A",
          student.paymentDetails[0]?.paymentStatus || "N/A",
          student.paymentDetails[0]?.paymentBy || "N/A",
          student.paymentDetails[0]?.created || "N/A",
        ]);
      });
      rowsData.forEach((row) => {
        csvContent += row.join(",") + "\n";
      });
      this.downloadCsv(csvContent, tableId);
      this.isLoading = false;
    });
  }
  breathDetoxExportToExcel(tableId: string): void {
    this.bDtoxLoading = true;
    let filter = { ...this.breathDetoxfilter };
    filter.size = 100000;
    filter.pageNo = 0;
    this.service.getAllBreathDetoxStudent(filter).subscribe((res: any) => {
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
          student.firstName,
          student.email,
          student.phoneNumber,
          student.city,
          student.isActive,
        ]);
      });
      rowsData.forEach((row) => {
        csvContent += row.join(",") + "\n";
      });
      this.downloadCsv(csvContent, tableId);
      this.bDtoxLoading = false;
    });
  }
  foundationExportToExcel(tableId: string): void {
    this.fosLoading = true;
    let filter = { ...this.foundationDetoxfilter };
    filter.size = 100000;
    filter.pageNo = 0;
    this.service
      .getAllFoundationOfSpiritualityStudent(filter)
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
        const headers = Array.from(table.querySelectorAll("thead th"))
          .map((th) => (th as HTMLElement).innerText)
          .join(",");
        csvContent += headers + "\n";
        const rowsData: any[][] = [];
        res.data.forEach((student, index) => {
          rowsData.push([
            index + 1,
            student.firstName,
            student.email,
            student.isActive,
          ]);
        });
        rowsData.forEach((row) => {
          csvContent += row.join(",") + "\n";
        });
        this.downloadCsv(csvContent, tableId);
        this.fosLoading = false;
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

  registerSwarSadhanaWebinarUser(data: createSwaraSadhna) {
    data.name = data.name == "" ? "Guest" : data.name;
    data.phone = data.phone || "N/A";
    data.email = String(data.email).toLowerCase();
    data.city = data.city || "N/A";
    if (data.name && data.email && data.phone) {
      if (this.selectedOption == 1) {
        this.swaraLoading = true;
        data.password = data.password || generatePassword();
        data.webinar = "Swara Sadhana";
        this.swarSadhanaSave(data);
      } else if (this.selectedOption == 2) {
        this.swaraLoading = true;
        const pranicData: createPranicPurification = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: "N/A",
        };
        this.pranicPurificationSave(pranicData);
      } else if (this.selectedOption == 3) {
        this.swaraLoading = true;
        const ttcData: createPranicPurification = {
          name: data.name,
          email: data.email,
          phone: data.phone,
        };
        this.twoHunTTCSave(ttcData);
      } else if (this.selectedOption == 4) {
        if (this.checkedTeacher.length > 0) {
          this.octoberPrashantLoading = true;
          this.onlineSadhanaSave(data);
        } else {
          alert("Please select at least one teacher.");
        }
      } else {
        alert("Please select a course.");
      }
    } else {
      alert("Fields are required");
      this.swaraLoading = false;
    }
  }
  swarSadhanaSave(data: createSwaraSadhna) {
    this.service.registerSwarSadhanaWebinarUser(data).subscribe(
      (res: any) => {
        if (res.status == "ok") {
          this.swaraLoading = false;
          this.getAllSwaraSadhnaStudent(this.swaraSadhnaFilter, false);
          this.createSwaraSadhnaFrom = {
            name: "",
            email: "",
            phone: "",
            city: "",
            password: "",
            webinar: "Swara Sadhana",
          };
          alert("Registration successful!");
        } else {
          this.swaraLoading = false;
          alert("Registration failed: " + res.message);
        }
      },
      (error) => {
        this.swaraLoading = false;
        alert("An error occurred while registering. Please try again.");
      }
    );
  }
  pranicPurificationSave(data: createPranicPurification) {
    this.service.registerPranicPurificationUser(data).subscribe(
      (res: any) => {
        if (res.status == "ok") {
          this.swaraLoading = false;
          this.getAllPranicPurificationStudent(
            this.pranicPurificationFilter,
            false
          );
          alert("Registration successful!");
        } else {
          this.swaraLoading = false;
          alert("Registration failed: " + res.message);
        }
      },
      (error) => {
        this.swaraLoading = false;
        alert("An error occurred while registering. Please try again.");
      }
    );
  }
  twoHunTTCSave(data: createPranicPurification) {
    this.service.register200TTCUser(data).subscribe(
      (res: any) => {
        if (res.status == "ok") {
          this.swaraLoading = false;
          this.getAll200TTCStudent(this.twoHunTTCFilter, false);
          alert("Registration successful!");
        } else {
          this.swaraLoading = false;
          alert("Registration failed: " + res.message);
        }
      },
      (error) => {
        this.swaraLoading = false;
        alert("An error occurred while registering. Please try again.");
      }
    );
  }
  onlineSadhanaSave(data: createSwaraSadhna) {
    let course = [];
    let courseList: string[] = [];
    this.checkedTeacher.map((item) => {
      course.push({
        id: item.id,
        priceINR: item.priceINR,
        priceUSD: item.priceUSD,
        quantity: item.quantity,
        title: item.title,
        shortDescription: item.shortDescription,
      });
      courseList.push(item.name);
    });
    const onlineSadhna: createPranicPurification = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      course: course,
      courseList: courseList,
    };
    this.service
      .createLiveCourseCustomer(onlineSadhna)
      .subscribe((res: any) => {
        if (res.status == "ok") {
          this.getAllLiveClassStudent(this.liveClassFilter, false);
          this.getAllOctoberPrashantStudent(this.octoberPrashantFilter, false);
          alert(res.message);
        } else {
          alert("Registration failed: " + res.message);
        }
        this.octoberPrashantLoading = false;
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
  getAllPranicPurificationStudent(
    filter: searchPranaRambhFilter,
    isSearch: boolean
  ): void {
    this.pranicLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.pranicPurificationPage = isSearch ? 1 : this.pranicPurificationPage;
    this.service
      .getAllPranicPurificationStudent(filter)
      .subscribe((res: pranicPurificationResultModel) => {
        this.pranicPurificationList = res.data;
        this.pranicPurificationTotal = res.total;
        this.pranicPurificationTitle = `Pranic Purification (${this.pranicPurificationTotal})`;
        this.pranicLoading = this.pranicPurificationList ? false : true;
      });
  }
  onPranicPurificationTableDataChange(event: number) {
    this.pranicPurificationFilter.pageNo = event;
    this.pranicPurificationPage = event;
    this.getAllPranicPurificationStudent(this.pranicPurificationFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  getAll200TTCStudent(filter: searchPranaRambhFilter, isSearch: boolean): void {
    this.twoHunTTCLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.twoHunTTCPage = isSearch ? 1 : this.twoHunTTCPage;
    this.service
      .getAll200ttcStudent(filter)
      .subscribe((res: twoHunTTCModelResultModel) => {
        this.twoHunTTCList = res.data;
        this.twoHunTTCTotal = res.total;
        this.twoHunTTCTitle = `200 TTC (${this.twoHunTTCTotal})`;
        this.twoHunTTCLoading = this.twoHunTTCList ? false : true;
      });
  }
  getAllOctoberPrashantStudent(
    filter: octoberPrashantFilter,
    isSearch: boolean
  ): void {
    this.octoberPrashantLoading = true;
    filter.pageNo = isSearch ? 1 : filter.pageNo;
    filter.size = isSearch ? 10 : filter.size;
    this.octoberPrashantPage = isSearch ? 1 : this.octoberPrashantPage;
    filter.month = "October";
    filter.course = "Acharya Prashant Jakhmola";
    this.service
      .getAllLiveClassStudent(filter)
      .subscribe((res: liveClassDataModel) => {
        this.octoberPrashantList = res.data;
        this.octoberPrashantTotal = res.total;
        this.octoberPrashantTitle = `October Prashant Jhakmola (${this.octoberPrashantTotal})`;
        this.octoberPrashantLoading = this.octoberPrashantList ? false : true;
      });
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
  onoctoberPrashantTableDataChange(event: number) {
    this.octoberPrashantFilter.pageNo = event;
    this.octoberPrashantPage = event;
    this.getAllOctoberPrashantStudent(this.octoberPrashantFilter, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  onPayStatusValueChange(event: string) {
    this.octoberPrashantFilter.paymentStatus = event;
    this.getAllOctoberPrashantStudent(this.octoberPrashantFilter, false);
  }
  checkedTeacher: any[] = [];
  onCheckboxChange(event: any) {
    if (this.checkedTeacher.includes(event)) {
      const index = this.checkedTeacher.indexOf(event);
      if (index > -1) {
        this.checkedTeacher.splice(index, 1);
      }
    } else {
      this.checkedTeacher.push(event);
    }
  }
}

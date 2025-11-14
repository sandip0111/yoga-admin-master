import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import {
  fosFilterModel,
  liveClassCustomerModel,
  liveClassDataModel,
  liveClassTeacherModel,
  searchPranaRambhFilter,
  createSwaraSadhna,
  generatePassword,
  pranicPurificationResultModel,
  pranicPurificationModel,
  createPranicPurification,
  swarSadhnaDataModel,
  swarSadhnaStudentModel,
  createFreeWebinar,
  createBreathDetox,
} from "../models/dashboard";
import { paymentStatus } from "../enums/payment";
import { DashboardSharedService } from "./dashboard-shared.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  filteredStudents: any[] = [];
  allPranayamStudents: any[] = [];
  totalCustomers: number = 0;
  customerGroups: liveClassTeacherModel[] = [];
  searchTextBreathDetox: string = "";
  searchTextFOS: string = "";
  swaraSadhnaFilter: searchPranaRambhFilter;
  swaraSadhanaList: swarSadhnaStudentModel[] = [];
  swarSadhanaTotal: number = 0;
  swarSadhnaTitle: string = `Swara Sadhana (${this.swarSadhanaTotal})`;
  createSwaraSadhnaFrom: createSwaraSadhna;
  createSwaraSadhnaTitle: string = `Create Student`;
  swarSadhanaPage: number = 1;
  paymentStatusEnum = paymentStatus;
  loading: boolean = false;
  liveClassPage: number = 1;
  selectedOption: number = 0;
  options = [
    { value: 8, label: "Prana Arambh" },
    { value: 10, label: "Breath Detox" },
    { value: 11, label: "Foundation of Spirituality" },
    { value: 1, label: "Swara Sadhana" },
    { value: 9, label: "Free Webinar" },
    { value: 2, label: "Pranic Purification" },
    { value: 3, label: "200 Online TTC" },
    { value: 4, label: "Online Live Class" },
    { value: 5, label: "Rishikesh 100" },
    { value: 6, label: "Rishikesh 200" },
    { value: 7, label: "Rishikesh 300" },
  ];
  paymentOption = [
    { value: "all", name: "All" },
    { value: "paid", name: "Paid" },
    { value: "unpaid", name: "Unpaid" },
    { value: "pending", name: "Pending" },
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
  paymentTypeOption = ["All", "razorpay", "stripe", "paypal"];
  monthOption = ["All Month Data", "October", "November"];
  constructor(
    private service: ServiceService,
    public dashboardShared: DashboardSharedService
  ) {
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
    this.createSwaraSadhnaFrom = {
      name: "",
      email: "",
      phone: "",
      city: "",
      password: "",
      webinar: "Swara Sadhana",
    };
  }
  ngOnInit(): void {}
  registerSwarSadhanaWebinarUser(data: createSwaraSadhna) {
    data.name = data.name == "" ? "Guest" : data.name;
    data.phone = data.phone || "N/A";
    data.email = String(data.email).toLowerCase();
    data.city = data.city || "N/A";
    if (data.name && data.email && data.phone) {
      if (this.selectedOption == 1) {
        this.loading = true;
        data.password = data.password || generatePassword();
        data.webinar = "Swara Sadhana";
        this.swarSadhanaSave(data);
      } else if (this.selectedOption == 2) {
        this.loading = true;
        const pranicData: createPranicPurification = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: "N/A",
        };
        this.pranicPurificationSave(pranicData);
      } else if (this.selectedOption == 3) {
        this.loading = true;
        const ttcData: createPranicPurification = {
          name: data.name,
          email: data.email,
          phone: data.phone,
        };
        this.twoHunTTCSave(ttcData);
      } else if (this.selectedOption == 4) {
        if (this.checkedTeacher.length > 0) {
          this.onlineSadhanaSave(data);
        } else {
          alert("Please select at least one teacher.");
        }
      } else if (
        this.selectedOption == 5 ||
        this.selectedOption == 6 ||
        this.selectedOption == 7
      ) {
        this.onlineRishikeshSave(data, this.selectedOption);
      } else if (this.selectedOption == 8) {
        this.pranaArambhSave(data);
      } else if (this.selectedOption == 9) {
        this.loading = true;
        const freeWebinr: createFreeWebinar = {
          name: data.name,
          email: data.email,
        };
        this.freeWebinrSave(freeWebinr);
      } else if (this.selectedOption == 10) {
        this.loading = true;
        const breathDetox: createBreathDetox = {
          firstName: data.name,
          lastName: "",
          email: data.email,
          course: ["63c3f26c461e531f3c3452e1"],
          isActive: true,
          isBreatDox: true,
          password: data.password || generatePassword(),
          paymentCourseId: "63c3f26c461e531f3c3452e1",
          source: "web",
        };
        this.breathDetoxSave(breathDetox);
      } else {
        alert("Please select a course.");
      }
    } else {
      alert("Fields are required");
      this.loading = false;
    }
  }
  swarSadhanaSave(data: createSwaraSadhna) {
    this.service.registerSwarSadhanaWebinarUser(data).subscribe(
      (res: any) => {
        if (res.status == "ok") {
          this.loading = false;
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
          this.loading = false;
          alert("Registration failed: " + res.message);
        }
      },
      (error) => {
        this.loading = false;
        alert("An error occurred while registering. Please try again.");
      }
    );
  }
  pranicPurificationSave(data: createPranicPurification) {
    this.service.registerPranicPurificationUser(data).subscribe(
      (res: any) => {
        if (res.status == "ok") {
          this.loading = false;
          alert("Registration successful!");
        } else {
          this.loading = false;
          alert("Registration failed: " + res.message);
        }
      },
      (error) => {
        this.loading = false;
        alert("An error occurred while registering. Please try again.");
      }
    );
  }
  twoHunTTCSave(data: createPranicPurification) {
    this.service.register200TTCUser(data).subscribe(
      (res: any) => {
        if (res.status == "ok") {
          this.loading = false;
          alert("Registration successful!");
        } else {
          this.loading = false;
          alert("Registration failed: " + res.message);
        }
      },
      (error) => {
        this.loading = false;
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
          alert(res.message);
        } else {
          alert("Registration failed: " + res.message);
        }
      });
  }
  onlineRishikeshSave(data: createSwaraSadhna, selectedHour: number) {
    let hour: number =
      selectedHour == 5
        ? 100
        : selectedHour == 6
        ? 200
        : selectedHour == 7
        ? 300
        : 0;
    const rishikeshData: createPranicPurification = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      hour: hour,
    };
    this.service
      .createRishikeshCustomer(rishikeshData)
      .subscribe((res: any) => {
        if (res.status == "ok") {
          alert(res.message);
        } else {
          alert("Registration failed: " + res.message);
        }
      });
  }
  pranaArambhSave(data: createSwaraSadhna) {
    const pranaData: createPranicPurification = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: generatePassword(),
    };
    this.service.createPranaArambhCustomer(pranaData).subscribe((res: any) => {
      if (res.status == "ok") {
        alert(res.message);
      } else {
        alert("Registration failed: " + res.message);
      }
    });
  }
  freeWebinrSave(data: createFreeWebinar) {
    this.service.createFreeWebinrCustomer(data).subscribe((res: any) => {
      if (res.status == "ok") {
        this.loading = false;
        alert(res.message);
      } else {
        alert("Registration failed: " + res.message);
      }
    });
  }
  breathDetoxSave(data: createBreathDetox) {
    this.service.createStudent(data).subscribe((res: any) => {
      if (res.status == "ok") {
        this.loading = false;
        alert(res.msg);
      } else {
        alert("Registration failed: " + res.msg);
      }
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

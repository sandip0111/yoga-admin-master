export interface searchPranaRambhFilter {
  pageNo: number;
  size: number;
  searchText: string;
  fromDate: string;
  toDate: string;
}
export class swarSadhnaStudentModel {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  paymentStatus: string;
  created: string;
  constructor() {
    this._id = "";
    this.name = "";
    this.email = "";
    this.phone = "";
    this.city = "";
    this.paymentStatus = "";
    this.created = "";
  }
}
export interface swarSadhnaDataModel {
  data: swarSadhnaStudentModel[];
  total: number;
}
export class liveClassTeacherModel {
  courseName: string;
  courseValue: number;
  constructor() {
    this.courseName = "";
    this.courseValue = 0;
  }
}
export interface searchLiveClassFilter {
  pageNo: number;
  size: number;
  searchText: string;
  fromDate: string;
  toDate: string;
  course: string;
}
export class liveClassCustomerModel {
  name: string;
  email: string;
  phone: string;
  currency: string;
  price: string;
  paymentStatus: string;
  created: string;
  courseTimming: string;
  constructor() {
    this.name = "";
    this.email = "";
    this.phone = "";
    this.currency = "";
    this.price = "";
    this.paymentStatus = "";
    this.created = "";
    this.courseTimming = "";
  }
}
export interface liveClassDataModel {
  data: liveClassCustomerModel[];
  total: number;
}
export interface fosFilterModel {
  pageNo: number;
  size: number;
  searchText: string;
}
export class PaymentDetailsModel {
  amount: string;
  created: string;
  currency: string;
  paymentBy: string;
  paymentStatus: string;
  studentId: string;
}
export class StudentModel {
  _id: string;
  firstName: string;
  email: string;
  phoneNumber: number;
  password: string;
  created: string;
  paymentDetails: PaymentDetailsModel[];
  paymentDetailsObject: PaymentDetailsModel;
}
export interface PranArambhModel {
  data: StudentModel[];
  total: number;
}
export class searchPranicPurificationFilter {
  pageNo: number;
  size: number;
  searchText: string;
  fromDate: string;
  toDate: string;
}
export interface pranicPurificationModel {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  courseStartDate: Date | string;
  courseTimeDuration: string;
  price: number | string;
  currency: string;
  paymentStatus: string;
  created?: Date | string;
  couponUsed: boolean;
  couponcode: string;
}
export interface pranicPurificationResultModel {
  data: pranicPurificationModel[];
  total: number;
}
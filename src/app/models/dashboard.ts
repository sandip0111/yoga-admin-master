export class searchPranaRambhFilter {
  pageNo: number;
  size: number;
  searchText: string;
  fromDate: string;
  toDate: string;
  paymentType?: string;
  paymentStatus?: string;
}
export interface createSwaraSadhna {
  name: string;
  email: string;
  phone: string;
  webinar: string;
  city: string;
  password: string;
}
export class swarSadhnaStudentModel {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  paymentStatus: string;
  created: string;
  password: string;
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
  month: string;
  paymentStatus: string;
  paymentType?: string;
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

export const generatePassword = () => {
  const digits = "0123456789";
  const specialChars = "!@#$&";

  let password = "";
  for (let i = 0; i < 5; i++) {
    password += digits[Math.floor(Math.random() * digits.length)];
  }
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  return password;
};
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
export interface twoHunTTCModel {
  courseStartDate: string;
  courseTimeDuration: string;
  created: string;
  currency: string;
  email: string;
  name: string;
  package: string;
  paymentId: string;
  paymentStatus: string;
  phoneNumber: string;
  price: string;
  _id: string;
}
export interface twoHunTTCModelResultModel {
  data: twoHunTTCModel[];
  total: number;
}
export interface createPranicPurification {
  name: string;
  email: string;
  phone: string;
  address?: string;
  course?: any[];
  courseList?: string[];
  hour?: number;
  password?: string;
}

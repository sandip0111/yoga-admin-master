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
export interface swarSadhnaDataModel{
  data: swarSadhnaStudentModel[],
  total: number
}
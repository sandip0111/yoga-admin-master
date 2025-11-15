import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  createFreeWebinar,
  createPranicPurification,
  createSwaraSadhna,
  searchFreeWebinarFilter,
  searchLiveClassFilter,
  searchPranaRambhFilter,
  twoHunTTCModel,
} from "../models/dashboard";
@Injectable({
  providedIn: "root",
})
export class ServiceService {
  private url = environment.apiUrl;
  public imageUrl = environment.imageUrl;
  public videoUrl = "https://yogavidyaschool.com:3000/public/video/";
  constructor(private http: HttpClient) {}

  isLogedIn() {
    return sessionStorage.getItem("token");
  }

  createStudent(data: any) {
    return this.http.post(this.url + "api/v1/createStudent", data);
  }

  getstudent(data: any) {
    return this.http.post(this.url + "api/v1/student", data);
  }
  checkEmail(data: any) {
    return this.http.post(this.url + "api/v1/checkEmail", data);
  }

  getstudentByid(id) {
    return this.http.get(this.url + "api/v1/student/" + id);
  }

  createMentor(data: any) {
    return this.http.post(this.url + "api/v1/createMentor", data);
  }

  getAllMentor(id = "") {
    return this.http.get(this.url + "api/v1/getAllMentor");
  }
  getMentorById(id: any) {
    return this.http.get(this.url + "api/v1/getMentorById/" + id);
  }

  createSlider(data: any) {
    return this.http.post(this.url + "api/v1/createSlider", data);
  }

  getSlider(id = "") {
    return this.http.get(this.url + "api/v1/getSlider");
  }
  getSliderById(id: any) {
    return this.http.get(this.url + "api/v1/getimagesliderById/" + id);
  }

  createCategory(data: any) {
    return this.http.post(this.url + "api/v1/createcategory", data);
  }

  getAllCategory(id = "") {
    return this.http.get(this.url + "api/v1/getAllCategory" + id);
  }

  getCategoryById(id) {
    return this.http.get(this.url + "api/v1/getCategoryById/" + id);
  }

  createCourse(data: any) {
    return this.http.post(this.url + "api/v1/createCourse", data);
  }
  getAllCourse(data: any) {
    return this.http.post(this.url + "api/v1/getAllCourse", data);
  }

  getAllWebinarRegistration(data: any) {
    return this.http.post(this.url + "api/v1/getAllWebinarRegistration", data);
  }

  getAllCourseV2(id = "") {
    return this.http.get(this.url + "api/v1/getAllCourseV2");
  }
  getCourseByid(id) {
    return this.http.get(this.url + "api/v1/getCourseById/" + id);
  }
  createEmploye(data: any) {
    return this.http.post(this.url + "api/v1/createEmploye", data);
  }

  getEmploye(id = "") {
    return this.http.get(this.url + "api/v1/getEmploye");
  }

  getEmployeById(id) {
    return this.http.get(this.url + "api/v1/getEmployeById/" + id);
  }

  uploadImage(dam: any) {
    return this.http.post(this.url + "api/v1/uploadImage", dam);
  }

  createBlog(data: any) {
    return this.http.post(this.url + "api/v1/createBlog", data);
  }
  getAllBlog(data: any) {
    return this.http.post(this.url + "api/v1/getAllBlog", data);
  }
  getBlogById(id) {
    return this.http.get(this.url + "api/v1/getBlogById/" + id);
  }

  createMedia(data: any) {
    return this.http.post(this.url + "api/v1/createMedia", data);
  }
  getAllMedia(id = "") {
    return this.http.get(this.url + "api/v1/getAllMedia" + id);
  }

  createPage(data: any) {
    return this.http.post(this.url + "api/v1/createPage", data);
  }

  getAllPages(id = "") {
    return this.http.get(this.url + "api/v1/getAllPages");
  }
  getPageById(id: any) {
    return this.http.get(this.url + "api/v1/getPageById/" + id);
  }

  createTestimonial(data: any) {
    return this.http.post(this.url + "api/v1/createTestimonial", data);
  }

  getAllTestimonial(id = "") {
    return this.http.get(this.url + "api/v1/getAllTestimonial");
  }
  getTestimonialById(id: any) {
    return this.http.get(this.url + "api/v1/getTestimonialById/" + id);
  }

  createSubCategory(data: any) {
    return this.http.post(this.url + "api/v1/createSubcategory", data);
  }

  getAllSubCategory(id = "") {
    return this.http.get(this.url + "api/v1/getAllSubCategory" + id);
  }

  getSubCategoryById(id) {
    return this.http.get(this.url + "api/v1/getSubCategoryById/" + id);
  }

  createSubCourseCategory(data: any) {
    return this.http.post(this.url + "api/v1/createSubCoursecategory", data);
  }

  getAllSubCourseCategory(id = "") {
    return this.http.get(this.url + "api/v1/getAllSubCourseCategory" + id);
  }

  getSubCourseCategoryById(id) {
    return this.http.get(this.url + "api/v1/getSubCourseCategoryById/" + id);
  }

  doLogin(data: any) {
    return this.http.post(this.url + "api/v1/doLogin", data);
  }
  searchStudent(data: any) {
    return this.http.post(this.url + "api/v1/searchStudent", data);
  }

  getAllVideoReviews(data: any) {
    return this.http.post(this.url + "api/v1/getAllVideoReviews", data);
  }
  getAllInquiry(data: any) {
    return this.http.post(this.url + "api/v1/getAllInquiry", data);
  }
  getAllPayment(data: any) {
    return this.http.post(this.url + "api/v1/getAllPayment", data);
  }

  exportFile(id: any = "") {
    return this.http.get(this.url + "api/v1/exportInquiry", {
      responseType: "arraybuffer",
    });
  }

  getCourseVideoV2(data: any) {
    return this.http.post(this.url + "api/v1/getCourseVideosById", data);
  }
  setAccessPran(data: any) {
    return this.http.post(this.url + "api/v1/setAccessPran", data);
  }
  setAccessFoundation(data: any) {
    return this.http.post(this.url + "api/v1/setAccessFoundation", data);
  }
  setAccessBreath(data: any) {
    return this.http.post(this.url + "api/v1/setAccessBreath", data);
  }

  getCourseVideoDataById(id) {
    return this.http.get(this.url + "api/v1/getCourseVideoDataById/" + id);
  }

  createVideo(data: any) {
    return this.http.post(this.url + "api/v1/createVideo", data);
  }

  getAllCourseAdmin(id = "") {
    return this.http.get(this.url + "api/v1/getAllCourseAdmin");
  }

  uploadVideo(data: any) {
    return this.http.post(this.url + "api/v1/uploadVideo", data);
  }

  insertVideo(data: any) {
    return this.http.post(this.url + "api/v1/uploadOnlineVideo", data);
  }

  getAnalyticsByDate(data: any) {
    return this.http.post(this.url + "api/v1/getAnalyticsByDate", data);
  }
  getAllParayanamStudent(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getAllParayanamStudent", data);
  }

  getAllLiveClassStudent(data: searchLiveClassFilter) {
    return this.http.post(this.url + "api/v1/getAllLiveClassStudent", data);
  }
  getAllFoundationOfSpiritualityStudent(data: any) {
    return this.http.post(
      this.url + "api/v1/getAllFoundationOfSpiritualityStudent",
      data
    );
  }
  getAllBreathDetoxStudent(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getAllBreathDetoxStudent", data);
  }
  getAllSwaraSadhanaData(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getAllSwaraSadhanaData", data);
  }

  getAllFreeWebinarData(data: searchFreeWebinarFilter) {
    return this.http.post(this.url + "api/v1/getAllFreeWebinarData", data);
  }
  registerSwarSadhanaWebinarUser(data: createSwaraSadhna) {
    return this.http.post(
      this.url + "api/v1/registerSwarSadhanaWebinarUser",
      data
    );
  }
  registerPranicPurificationUser(data: createPranicPurification) {
    return this.http.post(
      this.url + "api/v1/registerPranicPurificationUser",
      data
    );
  }
  register200TTCUser(data: createPranicPurification) {
    return this.http.post(this.url + "api/v1/register200TTCUser", data);
  }
  getAllPranicPurificationStudent(data: searchPranaRambhFilter) {
    return this.http.post(
      this.url + "api/v1/getAllPranicPurificationStudent",
      data
    );
  }
  getAll200ttcStudent(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/get200ttcData", data);
  }
  getRishikeshData(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getRishikeshData", data);
  }
  sendMailToPrashantJi(data: { name: string; email: string }) {
    console.log("mdamk");
    return this.http.post(this.url + "api/v1/sendMailToPrashantJi", data);
  }
  createLiveCourseCustomer(data: createPranicPurification) {
    return this.http.post(this.url + "api/v1/createLiveCourseCustomer", data);
  }
  createRishikeshCustomer(data: createPranicPurification) {
    return this.http.post(this.url + "api/v1/createRishikeshCustomer", data);
  }
  createPranaArambhCustomer(data: createPranicPurification) {
    return this.http.post(this.url + "api/v1/createPranaArambhCustomer", data);
  }
  createFreeWebinrCustomer(data: createFreeWebinar) {
    return this.http.post(this.url + "api/v1/createFreeWebinarCustomer", data);
  }
  sendBulkMailFreeWebiner() {
    return this.http.get(this.url + "api/v1/sendBulkMailFreeWebiner");
  }
  getAllPendingPaymentList(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getAllPendingPaymentList", data);
  }
  sendBulkMail200TTC() {
    return this.http.get(this.url + "api/v1/sendBulkMail200TTC");
  }
  giveAccessToUser(data: twoHunTTCModel) {
    return this.http.post(this.url + "api/v1/giveAccessToUser", data);
  }
  foundationOfSpiritualitySave(data: createFreeWebinar) {
    return this.http.post(
      this.url + "api/v1/foundationOfSpiritualitySave",
      data
    );
  }
}

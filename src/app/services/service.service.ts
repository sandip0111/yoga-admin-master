import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  createFoundationOfSpirituality,
  createFreeWebinar,
  createPranicPurification,
  createRetreatYoga,
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
  public videoUrl = environment.apiUrl + "public/video/";
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

  getAllMentor() {
    return this.http.get(this.url + "api/v1/getAllMentor");
  }

  getAllSubscribers(data: any) {
    return this.http.post(this.url + "api/v1/getAllSubscribers", data);
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

  getAllCourseV2() {
    return this.http.get(this.url + "api/v1/getAllCourseV2");
  }
  getCourseByid(id) {
    return this.http.get(this.url + "api/v1/getCourseById/" + id);
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
  deleteBlog(data: any) {
    return this.http.post(this.url + "api/v1/deleteBlog", data);
  }
  updateBlogStatus(data: any) {
    return this.http.post(this.url + "api/v1/updateBlogStatus", data);
  }

  createMedia(data: any) {
    return this.http.post(this.url + "api/v1/createMedia", data);
  }
  getAllMedia() {
    return this.http.get(this.url + "api/v1/getAllMedia");
  }

  createPage(data: any) {
    return this.http.post(this.url + "api/v1/createPage", data);
  }

  getAllPages() {
    return this.http.get(this.url + "api/v1/getAllPages");
  }
  getPageById(id: any) {
    return this.http.get(this.url + "api/v1/getPageById/" + id);
  }

  createTestimonial(data: any) {
    return this.http.post(this.url + "api/v1/createTestimonial", data);
  }

  getAllTestimonial() {
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

  exportFile() {
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

  getAllCourseAdmin() {
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
      data,
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
      data,
    );
  }
  registerPranicPurificationUser(data: createPranicPurification) {
    return this.http.post(
      this.url + "api/v1/registerPranicPurificationUser",
      data,
    );
  }
  registerPranicPurificationIIUser(data: createPranicPurification) {
    return this.http.post(
      this.url + "api/v1/registerPranicPurificationIIUser",
      data,
    );
  }
  register200TTCUser(data: createPranicPurification) {
    return this.http.post(this.url + "api/v1/register200TTCUser", data);
  }
  getAllPranicPurificationStudent(data: searchPranaRambhFilter) {
    return this.http.post(
      this.url + "api/v1/getAllPranicPurificationStudent",
      data,
    );
  }
  getAllPranicPurificationIIStudent(data: searchPranaRambhFilter) {
    return this.http.post(
      this.url + "api/v1/getAllPranicPurificationIIStudent",
      data,
    );
  }
  getAll200ttcStudent(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/get200ttcData", data);
  }
  getRishikeshData(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getRishikeshData", data);
  }
  getBaliData(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getBaliData", data);
  }
  sendMailToPrashantJi(data: { name: string; email: string }) {
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
  foundationOfSpiritualitySave(data: createFoundationOfSpirituality) {
    return this.http.post(
      this.url + "api/v1/foundationOfSpiritualitySave",
      data,
    );
  }
  getAllLiveClassTeacher() {
    return this.http.get(this.url + "api/v1/getAllLiveClassTeacher");
  }
  getCourseBySlug(data: { slug: string }) {
    return this.http.post(this.url + "api/v1/getCourseBySlug", data);
  }
  createBaliCustomer(data: createPranicPurification) {
    return this.http.post(this.url + "api/v1/createBaliCustomer", data);
  }
  registerPranayamaCertificationUser(data: createPranicPurification) {
    return this.http.post(this.url + "api/v1/registerPranayamaCertificationUser", data);
  }
  getAllPranayamaCertificationStudent(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getPranayamaCertificationData", data);
  }
  removePranaArambhData(studentId: string) {
    return this.http.post(this.url + "api/v1/removePranaArambhData", {
      studentId,
    });
  }
  removeSwaraSadhanaData(studentId: string) {
    return this.http.post(this.url + "api/v1/removeSwaraSadhanaData", {
      studentId,
    });
  }
  removeFreeWebinarData(studentId: string) {
    return this.http.post(this.url + "api/v1/removeFreeWebinarData", {
      studentId,
    });
  }
  removePranicPurificationData(studentId: string) {
    return this.http.post(this.url + "api/v1/removePranicPurificationData", {
      studentId,
    });
  }
  removePranicPurificationIIData(studentId: string) {
    return this.http.post(this.url + "api/v1/removePranicPurificationIIData", {
      studentId,
    });
  }
  remove200TTCData(studentId: string) {
    return this.http.post(this.url + "api/v1/remove200TTCData", { studentId });
  }
  removeOnlineLiveClassData(studentId: string) {
    return this.http.post(this.url + "api/v1/removeOnlineLiveClassData", {
      studentId,
    });
  }
  removeRishikeshData(studentId: string) {
    return this.http.post(this.url + "api/v1/removeRishikeshData", {
      studentId,
    });
  }
  removeBaliData(studentId: string) {
    return this.http.post(this.url + "api/v1/removeBaliData", {
      studentId,
    });
  }
  removeSubscribeData(studentId: string) {
    return this.http.post(this.url + "api/v1/removeSubscribeData", {
      studentId,
    });
  }
  registerRetreatYogaUser(data: createRetreatYoga) {
    return this.http.post(this.url + "api/v1/registerRetreatYogaUser", data);
  }
  getRetreatData(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getRetreatData", data);
  }
  removeRetreatData(studentId: string) {
    return this.http.post(this.url + "api/v1/removeRetreatData", {
      studentId,
    });
  }
  getPersonalGuidanceData(data: searchPranaRambhFilter) {
    return this.http.post(this.url + "api/v1/getPgData", data);
  }
}

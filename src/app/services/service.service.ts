import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  // private url = "http://34.203.244.83:3000/";

  private url = "http://localhost:3000/";
  // public imageUrl = "http://localhost:3000/public/images/";
  // private url = 'https://yogavidyaschool.com:3000/';
  public imageUrl = "https://yogavidyaschool.com:3000/public/images/";
  public videoUrl = "https://yogavidyaschool.com:3000/public/video/";

  constructor(private data: HttpClient) {}


  isLogedIn(){
    return sessionStorage.getItem('token');
  }

  createStudent(data: any) {
    return this.data.post(this.url + "api/v1/createStudent", data);
  }

  getstudent(data: any) {
    return this.data.post(this.url + "api/v1/student",data);
  }
  checkEmail(data: any) {
    return this.data.post(this.url + "api/v1/checkEmail",data);
  }


  getstudentByid(id) {
    return this.data.get(this.url + "api/v1/student/" + id);
  }

  createMentor(data: any) {
    return this.data.post(this.url + "api/v1/createMentor", data);
  }

  getAllMentor(id = "") {
    return this.data.get(this.url + "api/v1/getAllMentor");
  }
  getMentorById(id:any) {
    return this.data.get(this.url + "api/v1/getMentorById/"+id);
  }

  createSlider(data: any) {
    return this.data.post(this.url + "api/v1/createSlider", data);
  }

  getSlider(id = "") {
    return this.data.get(this.url + "api/v1/getSlider");
  }
  getSliderById(id:any) {
    return this.data.get(this.url + "api/v1/getimagesliderById/"+id);
  }

  createCategory(data: any) {
    return this.data.post(this.url + "api/v1/createcategory", data);
  }

  getAllCategory(id = "") {
    return this.data.get(this.url + "api/v1/getAllCategory"+id);
  }

  getCategoryById(id) {
    return this.data.get(this.url + "api/v1/getCategoryById/" + id);
  }

  createCourse(data: any) {
    return this.data.post(this.url + "api/v1/createCourse", data);
  }
  getAllCourse(data:any){
   return this.data.post(this.url + 'api/v1/getAllCourse',data);
}
getAllCourseV2(id=""){
  return this.data.get(this.url + 'api/v1/getAllCourseV2');
}
getCourseByid(id) {
  return this.data.get(this.url + "api/v1/getCourseById/" + id);
}
createEmploye(data:any){
  return this.data.post(this.url + "api/v1/createEmploye",data);
}

getEmploye(id=""){
 return this.data.get(this.url +'api/v1/getEmploye');
}

getEmployeById(id){
  return this.data.get(this.url + "api/v1/getEmployeById/" + id)
}

uploadImage(dam:any){
  console.log(dam);
return this.data.post(this.url+"api/v1/uploadImage",dam);
}

createBlog(data: any) {
  return this.data.post(this.url + "api/v1/createBlog", data);
}
getAllBlog(data:any){
  return this.data.post(this.url + 'api/v1/getAllBlog',data);
}
getBlogById(id){
  return this.data.get(this.url + "api/v1/getBlogById/" + id)
}

createMedia(data: any) {
  return this.data.post(this.url + "api/v1/createMedia", data);
}
getAllMedia(id=""){
  return this.data.get(this.url + 'api/v1/getAllMedia'+id);
}

createPage(data: any) {
  return this.data.post(this.url + "api/v1/createPage", data);
}

getAllPages(id = "") {
  return this.data.get(this.url + "api/v1/getAllPages");
}
getPageById(id:any) {
  return this.data.get(this.url + "api/v1/getPageById/"+id);
}

createTestimonial(data: any) {
  return this.data.post(this.url + "api/v1/createTestimonial", data);
}

getAllTestimonial(id = "") {
  return this.data.get(this.url + "api/v1/getAllTestimonial");
}
getTestimonialById(id:any) {
  return this.data.get(this.url + "api/v1/getTestimonialById/"+id);
}

createSubCategory(data: any) {
  return this.data.post(this.url + "api/v1/createSubcategory", data);
}

getAllSubCategory(id = "") {
  return this.data.get(this.url + "api/v1/getAllSubCategory"+id);
}

getSubCategoryById(id) {
  return this.data.get(this.url + "api/v1/getSubCategoryById/" + id);
}

createSubCourseCategory(data: any) {
  return this.data.post(this.url + "api/v1/createSubCoursecategory", data);
}

getAllSubCourseCategory(id = "") {
  return this.data.get(this.url + "api/v1/getAllSubCourseCategory"+id);
}

getSubCourseCategoryById(id) {
  return this.data.get(this.url + "api/v1/getSubCourseCategoryById/" + id);
}

doLogin(data:any){
  return this.data.post(this.url+"api/v1/doLogin",data);
 }
 searchStudent(data:any){
  return this.data.post(this.url+"api/v1/searchStudent",data);
 }

 getAllVideoReviews(data: any) {
  return this.data.post(this.url + "api/v1/getAllVideoReviews",data);
}
getAllInquiry(data: any) {
  return this.data.post(this.url + "api/v1/getAllInquiry",data);
}
getAllPayment(data: any) {
  return this.data.post(this.url + "api/v1/getAllPayment",data);
}

exportFile(id:any=""){
  return this.data.get(this.url+"api/v1/exportInquiry",{ responseType: 'arraybuffer' });
}

getCourseVideoV2(data: any) {
  return this.data.post(this.url + "api/v1/getCourseVideosById", data);
}
setAccessPran(data: any) {
  return this.data.post(this.url + "api/v1/setAccessPran", data);
}
setAccessFoundation(data: any) {
  return this.data.post(this.url + "api/v1/setAccessFoundation", data);
}

getCourseVideoDataById(id) {
  return this.data.get(this.url + "api/v1/getCourseVideoDataById/" + id);
}

createVideo(data: any) {
  return this.data.post(this.url + "api/v1/createVideo", data);
}

getAllCourseAdmin(id = "") {
  return this.data.get(this.url + "api/v1/getAllCourseAdmin");
}

uploadVideo(data: any) {
  return this.data.post(this.url + "api/v1/uploadVideo", data);
}

insertVideo(data: any) {
  return this.data.post(this.url + "api/v1/uploadOnlineVideo", data);
}

getAnalyticsByDate(data: any) {
  return this.data.post(this.url + "api/v1/getAnalyticsByDate", data);
}

}

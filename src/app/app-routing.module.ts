import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { authGuard } from "./auth.guard";
import { AddstudentComponent } from "./student/addstudent/addstudent.component";
import { ViewStudentComponent } from "./student/view-student/view-student.component";
import { CourseComponent } from "./courses/course/course.component";
import { AddcourseComponent } from "./courses/addcourse/addcourse.component";
import { MentorsComponent } from "./Mentor/mentors/mentors.component";
import { AddmentorComponent } from "./Mentor/addmentor/addmentor.component";
import { ImagesliderComponent } from "./Image/imageslider/imageslider.component";
import { ViewImagesComponent } from "./Image/view-images/view-images.component";
import { AddCategoryComponent } from "./category/add-category/add-category.component";
import { ViewCategoriesComponent } from "./category/view-categories/view-categories.component";
import { SubcategoryComponent } from "./category/subcategory/subcategory.component";
import { ContentComponent } from "./courses/content/content.component";
import { BlogComponent } from "./blog/blog.component";
import { ViewBlogComponent } from "./blog/view-blog/view-blog.component";
import { MediaComponent } from "./media/media.component";
import { FeeComponent } from "./courses/fee/fee.component";
import { PagesComponent } from "./pages/pages.component";
import { TestimonialComponent } from "./testimonial/testimonial.component";
import { SubCourseComponent } from "./category/sub-course/sub-course.component";
import { UpcomingEventComponent } from "./courses/upcoming-event/upcoming-event.component";
import { LoginComponent } from "./user-pages/login/login.component";
import { VideoReviewComponent } from "./video-review/video-review.component";
import { ContactInquiryComponent } from "./contact-inquiry/contact-inquiry.component";
import { PaymentDetailsComponent } from "./payment-details/payment-details.component";
import { UploadedVideosComponent } from "./uploaded-videos/uploaded-videos.component";
import { VideoEditComponent } from "./video-edit/video-edit.component";
import { OnlineVideoUploadComponent } from "./online-video-upload/online-video-upload.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { WebinarRegistrationComponent } from "./webinarRegistrationForms/webinar-registration/webinar-registration.component";
import { DashboardComponent } from "./dashboards/dashboard.component";
import { SendEmailComponent } from "./send-email/send-email.component";
import { AddCourseVideoComponent } from "./courses/add-course-video/add-course-video.component";
const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "addstudent",
    component: AddstudentComponent,
    canActivate: [authGuard],
  },
  { path: "login", component: LoginComponent },
  {
    path: "addstudent/:id",
    component: AddstudentComponent,
    canActivate: [authGuard],
  },
  {
    path: "view-student",
    component: ViewStudentComponent,
    canActivate: [authGuard],
  },
  { path: "course", component: CourseComponent, canActivate: [authGuard] },
  { path: "addCourseVideo", component: AddCourseVideoComponent, canActivate: [authGuard] },
  {
    path: "addcourse",
    component: AddcourseComponent,
    canActivate: [authGuard],
  },
  {
    path: "addcourse/:id",
    component: AddcourseComponent,
    canActivate: [authGuard],
  },
  { path: "mentors", component: MentorsComponent, canActivate: [authGuard] },
  {
    path: "addmentor",
    component: AddmentorComponent,
    canActivate: [authGuard],
  },
  {
    path: "addmentor/:id",
    component: AddmentorComponent,
    canActivate: [authGuard],
  },
  {
    path: "imageslider",
    component: ImagesliderComponent,
    canActivate: [authGuard],
  },
  {
    path: "imageslider/:id",
    component: ImagesliderComponent,
    canActivate: [authGuard],
  },
  {
    path: "view-images",
    component: ViewImagesComponent,
    canActivate: [authGuard],
  },
  {
    path: "add-category",
    component: AddCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: "view-categories",
    component: ViewCategoriesComponent,
    canActivate: [authGuard],
  },
  {
    path: "subcategory",
    component: SubcategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: "subcategory/:id",
    component: SubcategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: "subcategorycourse",
    component: SubCourseComponent,
    canActivate: [authGuard],
  },
  {
    path: "subcategorycourse/:id",
    component: SubCourseComponent,
    canActivate: [authGuard],
  },
  {
    path: "add-category/:id",
    component: AddCategoryComponent,
    canActivate: [authGuard],
  },
  { path: "content", component: ContentComponent, canActivate: [authGuard] },
  {
    path: "content/:id",
    component: ContentComponent,
    canActivate: [authGuard],
  },
  { path: "blog", component: BlogComponent, canActivate: [authGuard] },
  { path: "blog/:id", component: BlogComponent, canActivate: [authGuard] },
  { path: "view-blog", component: ViewBlogComponent, canActivate: [authGuard] },
  { path: "media", component: MediaComponent, canActivate: [authGuard] },
  { path: "fee/:id", component: FeeComponent, canActivate: [authGuard] },
  { path: "pages", component: PagesComponent, canActivate: [authGuard] },
  { path: "pages/:id", component: PagesComponent, canActivate: [authGuard] },
  {
    path: "testimonial",
    component: TestimonialComponent,
    canActivate: [authGuard],
  },
  {
    path: "testimonial/:id",
    component: TestimonialComponent,
    canActivate: [authGuard],
  },
  {
    path: "upEvent",
    component: UpcomingEventComponent,
    canActivate: [authGuard],
  },
  {
    path: "upEvent/:id",
    component: UpcomingEventComponent,
    canActivate: [authGuard],
  },
  {
    path: "video-review",
    component: VideoReviewComponent,
    canActivate: [authGuard],
  },
  {
    path: "inquiry",
    component: ContactInquiryComponent,
    canActivate: [authGuard],
  },
  {
    path: "payment-details",
    component: PaymentDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: "course-video/:id",
    component: UploadedVideosComponent,
    canActivate: [authGuard],
  },
  { path: "edit/:id", component: VideoEditComponent, canActivate: [authGuard] },
  {
    path: "video-upload",
    component: OnlineVideoUploadComponent,
    canActivate: [authGuard],
  },
  {
    path: "analytics",
    component: AnalyticsComponent,
    canActivate: [authGuard],
  },
  {
    path: "webinar",
    component: WebinarRegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: "send-email",
    component: SendEmailComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

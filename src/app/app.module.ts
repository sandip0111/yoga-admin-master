import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from "ng2-charts";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { ContentAnimateDirective } from "./shared/directives/content-animate.directive";
import { AddstudentComponent } from "./student/addstudent/addstudent.component";
import { ViewStudentComponent } from "./student/view-student/view-student.component";
import { CourseComponent } from "./courses/course/course.component";
import { AddcourseComponent } from "./courses/addcourse/addcourse.component";
import { AddmentorComponent } from "./Mentor/addmentor/addmentor.component";
import { MentorsComponent } from "./Mentor/mentors/mentors.component";
import { ImagesliderComponent } from "./Image/imageslider/imageslider.component";
import { ViewImagesComponent } from "./Image/view-images/view-images.component";
import { AddCategoryComponent } from "./category/add-category/add-category.component";
import { ViewCategoriesComponent } from "./category/view-categories/view-categories.component";
import { SubcategoryComponent } from "./category/subcategory/subcategory.component";
import { ContentComponent } from "./courses/content/content.component";
import { EditorModule } from "@tinymce/tinymce-angular";
import { BlogComponent } from "./blog/blog.component";
import { ViewBlogComponent } from "./blog/view-blog/view-blog.component";
import { MediaComponent } from "./media/media.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FeeComponent } from "./courses/fee/fee.component";
import { UpcomingEventComponent } from "./courses/upcoming-event/upcoming-event.component";
import { PagesComponent } from "./pages/pages.component";
import { TestimonialComponent } from "./testimonial/testimonial.component";
import { SubCourseComponent } from "./category/sub-course/sub-course.component";
import { LoginComponent } from "./user-pages/login/login.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { VideoReviewComponent } from "./video-review/video-review.component";
import { ContactInquiryComponent } from "./contact-inquiry/contact-inquiry.component";
import { PaymentDetailsComponent } from "./payment-details/payment-details.component";
import { UploadedVideosComponent } from "./uploaded-videos/uploaded-videos.component";
import { VideoEditComponent } from "./video-edit/video-edit.component";
import { OnlineVideoUploadComponent } from "./online-video-upload/online-video-upload.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { DashboardComponent } from "./dashboards/dashboard.component";
import { WebinarRegistrationComponent } from "./webinarRegistrationForms/webinar-registration/webinar-registration.component";
import { SendEmailComponent } from "./send-email/send-email.component";
import { SwaraSadhanaComponent } from "./dashboards/swara-sadhana/swara-sadhana.component";
import { OnlineLiveClassComponent } from "./dashboards/online-live-class/online-live-class.component";
import { PranaArambhComponent } from "./dashboards/prana-arambh/prana-arambh.component";
import { FreeWebinnerComponent } from "./dashboards/free-webinner/free-webinner.component";
import { TwoHundredOnlineTtcComponent } from "./dashboards/two-hundred-online-ttc/two-hundred-online-ttc.component";
import { BreathDtoxComponent } from "./dashboards/breath-dtox/breath-dtox.component";
import { PendingPaymentComponent } from "./dashboards/pending-payment/pending-payment.component";
import { PranicPurificationComponent } from "./dashboards/pranic-purification/pranic-purification.component";
import { FunctionalSpiritualityComponent } from "./dashboards/functional-spirituality/functional-spirituality.component";
import { AddCourseVideoComponent } from "./courses/add-course-video/add-course-video.component";
import { RishikeshComponent } from "./dashboards/rishikesh/rishikesh.component";
import { BaliComponent } from "./dashboards/bali/bali.component";
import { SubscribersComponent } from "./dashboards/subscribers/subscribers.component";
import { PranayamaCertificationDashboardComponent } from "./dashboards/pranayama-certification-dashboard/pranayama-certification-dashboard.component";
import { Retreat } from "./dashboards/retreat/retreat";
import { PersonalGuidance } from "./dashboards/personal-guidance/personal-guidance";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    AddstudentComponent,
    ViewStudentComponent,
    CourseComponent,
    AddcourseComponent,
    AddmentorComponent,
    MentorsComponent,
    ImagesliderComponent,
    ViewImagesComponent,
    AddCategoryComponent,
    ViewCategoriesComponent,
    SubcategoryComponent,
    ContentComponent,
    BlogComponent,
    ViewBlogComponent,
    MediaComponent,
    FeeComponent,
    UpcomingEventComponent,
    PagesComponent,
    TestimonialComponent,
    SubCourseComponent,
    LoginComponent,
    VideoReviewComponent,
    ContactInquiryComponent,
    PaymentDetailsComponent,
    UploadedVideosComponent,
    VideoEditComponent,
    OnlineVideoUploadComponent,
    AnalyticsComponent,
    WebinarRegistrationComponent,
    DashboardComponent,
    SendEmailComponent,
    SwaraSadhanaComponent,
    OnlineLiveClassComponent,
    PranaArambhComponent,
    FreeWebinnerComponent,
    TwoHundredOnlineTtcComponent,
    BreathDtoxComponent,
    PendingPaymentComponent,
    PranicPurificationComponent,
    FunctionalSpiritualityComponent,
    AddCourseVideoComponent,
    RishikeshComponent,
    BaliComponent,
    SubscribersComponent,
    PranayamaCertificationDashboardComponent,
    Retreat,
    PersonalGuidance
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
    EditorModule,
    NgxPaginationModule,
    CKEditorModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptorsFromDi()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

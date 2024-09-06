import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { AddstudentComponent } from './student/addstudent/addstudent.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { CourseComponent } from './courses/course/course.component';
import { AddcourseComponent } from './courses/addcourse/addcourse.component';
import { AddmentorComponent } from './Mentor/addmentor/addmentor.component';
import { MentorsComponent } from './Mentor/mentors/mentors.component';
import { ImagesliderComponent } from './Image/imageslider/imageslider.component';
import { ViewImagesComponent } from './Image/view-images/view-images.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoriesComponent } from './category/view-categories/view-categories.component';
import { SubcategoryComponent } from './category/subcategory/subcategory.component';
import { ContentComponent } from './courses/content/content.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BlogComponent } from './blog/blog.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { MediaComponent } from './media/media.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeeComponent } from './courses/fee/fee.component';
import { FaqComponent } from './courses/faq/faq.component';
import { UpcomingEventComponent } from './courses/upcoming-event/upcoming-event.component';
import { PagesComponent } from './pages/pages.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SubCourseComponent } from './category/sub-course/sub-course.component';
import { LoginComponent } from './user-pages/login/login.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { VideoReviewComponent } from './video-review/video-review.component';
import { ContactInquiryComponent } from './contact-inquiry/contact-inquiry.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { UploadedVideosComponent } from './uploaded-videos/uploaded-videos.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { OnlineVideoUploadComponent } from './online-video-upload/online-video-upload.component';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    TodoListComponent,
    TodoComponent,
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
    FaqComponent,
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
    AnalyticsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    EditorModule,
    NgxPaginationModule,
    CKEditorModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import { AddstudentComponent } from './student/addstudent/addstudent.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { CourseComponent } from './courses/course/course.component';
import { AddcourseComponent } from './courses/addcourse/addcourse.component';
import { MentorsComponent } from './Mentor/mentors/mentors.component';
import { AddmentorComponent } from './Mentor/addmentor/addmentor.component';
import { ImagesliderComponent } from './Image/imageslider/imageslider.component';
import { ViewImagesComponent } from './Image/view-images/view-images.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoriesComponent } from './category/view-categories/view-categories.component';
import { SubcategoryComponent } from './category/subcategory/subcategory.component';
import { ContentComponent } from './courses/content/content.component';
import { BlogComponent } from './blog/blog.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { MediaComponent } from './media/media.component';
import { FeeComponent } from './courses/fee/fee.component';
import { PagesComponent } from './pages/pages.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SubCourseComponent } from './category/sub-course/sub-course.component';
import { UpcomingEventComponent } from './courses/upcoming-event/upcoming-event.component';
import { LoginComponent } from './user-pages/login/login.component';
import { VideoReviewComponent } from './video-review/video-review.component';
import { ContactInquiryComponent } from './contact-inquiry/contact-inquiry.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { UploadedVideosComponent } from './uploaded-videos/uploaded-videos.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { OnlineVideoUploadComponent } from './online-video-upload/online-video-upload.component';
import { AnalyticsComponent } from './analytics/analytics.component';
const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  // { path: 'client', component: ClientComponent },
  // // { path: 'client/:id', component: ClientComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'employee', component: EmployeeComponent,canActivate:[AuthGuard]},
  // { path: 'employee/:id', component: EmployeeComponent,canActivate:[AuthGuard]},
  // // { path: 'team', component: TeamComponent },
  // // { path: 'team/:id', component: TeamComponent },
  // // { path: 'profile', component: ProfileComponent },
  // // { path: 'setting', component: SettingsComponent },
  // // { path: 'export', component: ExportComponent },
  // // { path: 'new-application', component: NewApplicationComponent },
  // // { path: 'application', component: ApplicationComponent },
  // // { path: 'checks', component: ChecksComponent },
  // { path: 'bulk-application', component: BulkApplicationComponent },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  {path: 'addstudent', component: AddstudentComponent,canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'addstudent/:id', component: AddstudentComponent,canActivate:[AuthGuard]},
  {path: 'view-student', component: ViewStudentComponent,canActivate:[AuthGuard]},
  {path: 'course', component: CourseComponent,canActivate:[AuthGuard]},
  {path: 'addcourse', component: AddcourseComponent,canActivate:[AuthGuard]},
  {path: 'addcourse/:id', component: AddcourseComponent,canActivate:[AuthGuard]},
  {path: 'mentors', component: MentorsComponent,canActivate:[AuthGuard]},
  {path: 'addmentor', component: AddmentorComponent,canActivate:[AuthGuard]},
  {path: 'addmentor/:id', component: AddmentorComponent,canActivate:[AuthGuard]},
  {path: 'imageslider', component:ImagesliderComponent,canActivate:[AuthGuard]},
  {path: 'imageslider/:id', component:ImagesliderComponent,canActivate:[AuthGuard]},
  {path: 'view-images', component:ViewImagesComponent,canActivate:[AuthGuard]},
  {path: 'add-category', component:AddCategoryComponent,canActivate:[AuthGuard]},
  {path: 'view-categories', component:ViewCategoriesComponent,canActivate:[AuthGuard]},
  {path: 'subcategory', component:SubcategoryComponent,canActivate:[AuthGuard]},
  {path: 'subcategory/:id', component:SubcategoryComponent,canActivate:[AuthGuard]},
  {path: 'subcategorycourse', component:SubCourseComponent,canActivate:[AuthGuard]},
  {path: 'subcategorycourse/:id', component:SubCourseComponent,canActivate:[AuthGuard]},
  {path: 'add-category/:id', component:AddCategoryComponent,canActivate:[AuthGuard]},
  {path: 'content', component:ContentComponent,canActivate:[AuthGuard]},
  {path: 'content/:id',component:ContentComponent,canActivate:[AuthGuard]},
  {path:'blog',component:BlogComponent,canActivate:[AuthGuard]},
  {path:'blog/:id',component:BlogComponent,canActivate:[AuthGuard]},
  {path:'view-blog',component:ViewBlogComponent,canActivate:[AuthGuard]},
  {path:'media',component:MediaComponent,canActivate:[AuthGuard]},
  {path:'fee/:id',component:FeeComponent,canActivate:[AuthGuard]},
  {path:'pages',component:PagesComponent,canActivate:[AuthGuard]},
  {path:'pages/:id',component:PagesComponent,canActivate:[AuthGuard]},
  {path:'testimonial',component:TestimonialComponent,canActivate:[AuthGuard]},
  {path:'testimonial/:id',component:TestimonialComponent,canActivate:[AuthGuard]},
  {path: 'upEvent', component:UpcomingEventComponent,canActivate:[AuthGuard]},
  {path: 'upEvent/:id',component:UpcomingEventComponent,canActivate:[AuthGuard]},
  {path: 'video-review',component:VideoReviewComponent,canActivate:[AuthGuard]},
  {path: 'inquiry',component:ContactInquiryComponent,canActivate:[AuthGuard]},
  {path: 'payment-details',component:PaymentDetailsComponent,canActivate:[AuthGuard]},
  {path: 'course-video/:id',component:UploadedVideosComponent,canActivate:[AuthGuard]},
  {path: 'edit/:id',component:VideoEditComponent,canActivate:[AuthGuard]},
  {path: 'video-upload',component:OnlineVideoUploadComponent,canActivate:[AuthGuard]},
  {path: 'analytics',component:AnalyticsComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

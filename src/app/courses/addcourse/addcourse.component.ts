import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  standalone: false,
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  [key: string]: any;
  public details: any;
  public coursedetails: any = {};
  public courseId: any;
  public showDescCode: boolean = false;
  public showSubjectCode: boolean = false;
  public showIECode: boolean = false;

  constructor(
    private service: ServiceService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.showDescCode = false;
    this.showSubjectCode = false;
    this.showIECode = false;
  }

  public toggleDescCode(): void {
    this.showDescCode = !this.showDescCode;
  }

  public toggleSubjectCode(): void {
    this.showSubjectCode = !this.showSubjectCode;
  }

  public toggleIECode(): void {
    this.showIECode = !this.showIECode;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      if (this.courseId) {
        this.getCourseById(this.courseId);
      }
    });
  }

  uploadMedia(e: any) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('type', 'return');
    this.service.uploadImage(formData).subscribe((res: any) => {
      if (res.status == 'ok') {
        alert('Upload successful');
        this.coursedetails.sliderImage = res.imageName;
      } else {
        alert('Something went wrong');
      }
    });
  }

  createCourse(data: any) {
    if (!this.courseId) {
      data.isActive = true;
    }
    this.service.createCourse(data).subscribe((res: any) => {
      if (res.status === 'ok') {
        alert(res.msg);
        this.router.navigate(['/course']);
      } else {
        alert('Something went wrong');
      }
    });
  }

  getCourseById(id: any) {
    this.service.getCourseByid(id).subscribe((res: any) => {
      this.coursedetails = res.data;
    });
  }
}


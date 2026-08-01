import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-addmentor',
  templateUrl: './addmentor.component.html',
  styleUrls: ['./addmentor.component.scss']
})
export class AddmentorComponent implements OnInit {
  [key: string]: any;
  public formData: any = {};
  public url: any;
  public mentorId: any;
  public pictureFetch: any;
  public thumbFetch: any;
  public showCode: boolean = false;

  constructor(private service: ServiceService, private router: Router, private acroute: ActivatedRoute) {
    this.showCode = false;
  }

  public toggleCode(): void {
    this.showCode = !this.showCode;
  }

  ngOnInit(): void {
    this.url = this.service.imageUrl;
    this.acroute.params.subscribe(params => {
      return this.mentorId = params['id'];
    });

    if (this.mentorId) {
      this.getMentorById(this.mentorId);
    }
  }

  selectThumb(e: any) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('type', 'return');
    this.service.uploadImage(formData).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.formData.thumb = res.imageName;
      } else {
        alert('something went wrong');
      }
    });
  }

  selectPicture(e: any) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('type', 'return');
    this.service.uploadImage(formData).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.formData.picture = res.imageName;
      } else {
        alert('something went wrong');
      }
    });
  }

  createMentor(data: any) {
    if (!this.mentorId) {
      data.isActive = true;
    }
    this.service.createMentor(data).subscribe((res: any) => {
      if (res.status == 'ok') {
        alert(res.msg);
        this.router.navigate(['/mentors']);
      } else {
        alert(res.msg);
      }
    });
  }

  getMentorById(id: any) {
    this.service.getMentorById(id).subscribe((res: any) => {
      this.formData = res.data;
      this.pictureFetch = res.data.picture;
      this.thumbFetch = res.data.thumb;
    });
  }
}

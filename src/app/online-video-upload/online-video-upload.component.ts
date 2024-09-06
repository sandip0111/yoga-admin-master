import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../app/services/service.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-online-video-upload',
  templateUrl: './online-video-upload.component.html',
  styleUrls: ['./online-video-upload.component.scss']
})
export class OnlineVideoUploadComponent implements OnInit {
  formData:any={};
  courseList: any;
  isLoading: boolean =false;

  constructor(private service:ServiceService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getAllCourseAdmin();
  }

  InsertData(data:any){
  this.service.insertVideo(data).subscribe((res: any) => {
   console.log(res,'---');
   if(res == "ok"){
    alert(res.msg);
    this.router.navigate([`/course-video/${data.courseId}`]);
   }
   else{
    alert(res.msg);
    this.router.navigate([`/course-video/${data.courseId}`]);
   }
  });

  }

  getAllCourseAdmin(){
    this.service.getAllCourseAdmin().subscribe((res:any)=>{
      // console.log(res);
      this.courseList = res.data;
    })
  }

  uploadVideo(e: any) {
    this.isLoading =true;
    if (e.target.files[0].type == "video/mp4" || e.target.files[0].type == "video/mov" || e.target.files[0].type == "video/avi" || e.target.files[0].type == "video/heic" || e.target.files[0].type == "video/hevc" || e.target.files[0].type == "video/quicktime") {
      const formData = new FormData();
      formData.append('video', e.target.files[0]);
      formData.append('type', 'return');
      this.service.uploadVideo(formData).subscribe((res: any) => {
        console.log(res);
        if (res.status == "ok") {
          alert('upload success');
          this.formData.videoName = res.videoName
          this.isLoading =false;
        }
        else {
          alert("something went wrong");
          this.isLoading =false;
        }
      });
    }
    else {
      alert("Please select Video file");
      e.target.value = '';
      this.isLoading =false;
    }

  }

}

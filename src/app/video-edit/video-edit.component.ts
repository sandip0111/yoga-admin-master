import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../app/services/service.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit {
  courseId: any;
  formData: any = {};
  constructor(private service:ServiceService,private route: ActivatedRoute,private router:Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      return  this.courseId  = params['id']
    });
    if(this.courseId){
      this.getCourseVideoDataById(this.courseId)
    }
  }

  getCourseVideoDataById(id:any){
    this.service.getCourseVideoDataById(id).subscribe((res:any) => {
      //  console.log(res,'-----');
       this.formData = res.data
   });
  }

  setData(data:any){
   this.service.createVideo(data).subscribe((res:any) => {
    // console.log(res,'-----');
    if(res.status == "ok"){
      alert(res.msg);
      this.router.navigate([`/course-video/${data.courseId}`]);
    }
    else{
      alert(res.msg);
      this.router.navigate([`/course-video/${data.courseId}`]);

    }
});
  }

}

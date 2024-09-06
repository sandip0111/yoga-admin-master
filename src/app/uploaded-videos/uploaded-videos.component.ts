import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-uploaded-videos',
  templateUrl: './uploaded-videos.component.html',
  styleUrls: ['./uploaded-videos.component.scss']
})
export class UploadedVideosComponent implements OnInit {
  id: any;
  videoList: any;
  title: any;

  constructor(private service:ServiceService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      return  this.id  = params['id']
    });
    if(this.id){
      this.getCourseByIdV2(this.id)
      this.getCourseById(this.id)
    }
  }

  getCourseById(id:any){
   let val = {
    "courseId":id
   }
   this.service.getCourseVideoV2(val).subscribe((res:any) => {
    // console.log(res,'--');
    this.videoList = res.slice().sort((a,b) =>a.sortBy - b.sortBy);

  });
  }

  getCourseByIdV2(id:any){
    this.service.getCourseByid(id).subscribe((res:any) => {
    //  console.log(res,'--');
     this.title = res.data.coursetitle;
   });
   }

}

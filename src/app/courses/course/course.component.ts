import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  isLoading = false;
  courseData: any;
  filter:any={};
  total:any;
  p:any=1;
  constructor(private service:ServiceService,private route:ActivatedRoute) { }
 ngOnInit(): void {
  this.filter = {
    pageNo:1,
    size:10
  }
  this.getAllCourse()
  }
  getAllCourse(){
    this.isLoading = true;
    this.service.getAllCourse(this.filter).subscribe((res:any)=>{
      this.courseData = res.data;
      this.total = res.total;
    this.isLoading = false;
    })
  }

  onTableDataChange(event: any) {
    this.filter.pageNo = event;
    this.getAllCourse();
    this.p = event;
    window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }
}

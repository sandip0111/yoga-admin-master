import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
 studentdetails:any={};
  userList: [];
  routeSub: any;
  userdetails:any={};
  courseList: any
  constructor(private service:ServiceService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      return  this.routeSub  = params['id']
    });

    if(this.routeSub){
      console.log(this.routeSub);
      this.getstudentByid(this.routeSub)
    }
    this.getAllCourseV2();
  }
  studentData(data:any){
       this.studentdetails = data;
       console.log(this.studentdetails);
    }

    checkEmail(e:any){
      let val = {
        email: e.target.value.replace(/\s/g, '')
      }
      this.service.checkEmail(val).subscribe((res:any)=>{
        if(res.status == "ok"){
          alert("email already exist");
         e.target.value ='';
        }
     })
    }

  createStudent(data:any){
   if(this.routeSub){
    data._id = this.routeSub;
    if(data.course.length > 0){
      let arr = [];
      arr = [...data.selected,...data.course]
      let distArr = [...new Set(arr)];
      data.course = distArr;
    }
   }
   data.course = data.selected;
   data.isActive = true;
   data.source = 'admin';
//    console.log(data);
// return
    this.service.createStudent(data).subscribe((res:any)=>{
     if(res.status == "ok"){
      alert(res.msg);
      this.router.navigate(['/view-student']);
     }
     else if(res.status == "error"){
      alert(res.msg);
     }
     else{
      alert('something went wrong')
     }
  })
}
  getstudentByid(id) {
    this.service.getstudentByid(id).subscribe((res:any) => {
       this.userdetails = res.Data;
       this.userdetails.selected = res.Data.course;
    });
  }
  getAllCourseV2() {
    this.service.getAllCourseV2().subscribe((res:any) => {
      //  console.log(res);
       this.courseList = res.data;

    });
  }

}

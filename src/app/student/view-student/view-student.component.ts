import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: "app-view-student",
  templateUrl: "./view-student.component.html",
  styleUrls: ["./view-student.component.scss"],
})
export class ViewStudentComponent implements OnInit {
  isLoading =false;
  userList:any;
  id:any;
  filter:any={};
  p: number = 1;
  total:any
  constructor(private service: ServiceService, private router:Router) {}

  ngOnInit(){
    this.filter={
      firstName:"",
      pageNo:1,
      size:10
    };
    this.getstudent(this.filter);
  }

  getstudent(filter:any) {
    this.isLoading =true;
    this.service.getstudent(filter).subscribe((res:any) => {
       this.userList = res.data;
       this.total = res.total;
       this.isLoading =false;

       for (const it of this.userList) {

        it.pranCounter = false;
        it.fCounter = false;
        it.BCounter = false;
        if(it.course.length > 0) {
          if(it.course.includes("644f9dfc499ffcfb45df35cd")){
            it.pranCounter = true;
          }
          if(it.course.includes("63c4de4a2bce43a907211c74")){
            it.fCounter = true;
          }
         if(it.course.includes("63c3f26c461e531f3c3452e1")){
            it.BCounter = true;
          }
        }
        // else{
        //   it.pranCounter = false;
        //   it.fCounter = false;
        //   it.BCounter = false;
        // }      
      }

    });
  }

  onTableDataChange(event: any) {
    this.filter.pageNo = event;
    this.getstudent(this.filter);
    this.p = event;
    window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }

 deleteStudent(id:any){
  let c = confirm("Are you sure you want to delete?");
  if(c){
    let val={
      "_id":id,
      "isActive":false
     }
     this.service.createStudent(val).subscribe((res:any)=>{
      if(res.status == "ok"){
        alert(res.msg);
        location.reload();
       }
       else{
        alert('something went wrong')
       }
   })
  }

 }

 searchStudent(e:any){
    this.filter.firstName = e.target.value;
    this.getstudent(this.filter);
 }

 setAccess(id:any){
  let c = confirm("Are you sure you want to Give Access?");
  if(c){
    let val={
      "studentId":id,
     }
     this.service.setAccessPran(val).subscribe((res:any)=>{

       if(res.status == "ok"){
        alert("Access has been granted and emailed.");
        this.getstudent(this.filter);
       }
       else{


       }
   })
  }
 }

 setAccessV2(id:any){
  let c = confirm("Are you sure you want to Give Access?");
  if(c){
    let val={
      "studentId":id,
     }
     this.service.setAccessFoundation(val).subscribe((res:any)=>{

       if(res.status == "ok"){
        alert("Access has been granted and emailed.");
        this.getstudent(this.filter);
       }
       else{


       }
   })
  }
 }
 setAccessV3(id:any){
  let c = confirm("Are you sure you want to Give Access?");
  if(c){
    let val={
      "studentId":id,
     }
     this.service.setAccessBreath(val).subscribe((res:any)=>{

       if(res.status == "ok"){
        alert("Access has been granted and emailed.");
        this.getstudent(this.filter);
       }
       else{


       }
   })
  }
 }

}

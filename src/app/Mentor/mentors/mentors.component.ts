import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss']
})
export class MentorsComponent implements OnInit {
  userlist:any;
  imageUrl:any;
  constructor(private service:ServiceService) {}

  getmentorsdetails:any = [];

  ngOnInit(): void {
    this.imageUrl = this.service.imageUrl;
    this.getAllMentor();
  }

  getAllMentor(){
    this.service.getAllMentor().subscribe((res:any)=>{
      console.log(res,'fgh');

      this.userlist =  res.user;
      // console.warn(this.userlist);
    })
  }

  deleteMentor(id:any){
    let temp = confirm("Are you sure you want to delete");
 if(temp){
  let val={
    "_id":id,
    "isActive":false
   };
   this.service.createMentor(val).subscribe((res:any)=>{
    if(res.status == "ok"){
      alert(res.msg);
      location.reload();
    }
    else{
      alert('something went wrong');
    }
   });
 }

  }


}

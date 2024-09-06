import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  formData:any={};
  testId: any;
  testList: any;
  imageUrl:any;

  constructor(private service:ServiceService,private router:Router,private acroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.imageUrl =this.service.imageUrl;
    this.acroute.params.subscribe(params => {
      return  this.testId  = params['id']
    });
   this.getAllTestimonial();
  }

  uploadImage(e:any){
    const formData = new FormData();
    formData.append('image',e.target.files[0]);
    formData.append('type','return');
    this.service.uploadImage(formData).subscribe((res: any) => {
       if(res.status == "ok"){
        this.formData.image = res.imageName
       }
       else{
        alert("something went wrong")
       }
     });
  }

  getAllTestimonial(){
    this.service.getAllTestimonial().subscribe((res: any) => {
    console.log(res);
    this.testList = res.data

    });
  }

  saveTestimonial(data:any){
    // console.log(data);
    // return

    if(!this.testId){
      data.isActive = true;
    }
    this.service.createTestimonial(data).subscribe((res: any) => {
       if(res.status == "ok"){
        alert(res.msg);
        location.reload();
       }
       else{
        alert('something went wrong');
       }
    });
  }

  deleteTestimonial(id:any){
    let h = confirm("Are you sure you want to delete?");
    if(h){
      let val = {
        "_id":id,
        "isActive":false
       }
       this.service.createTestimonial(val).subscribe((res: any) => {
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

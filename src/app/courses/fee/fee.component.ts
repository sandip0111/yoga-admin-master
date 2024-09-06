import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {
  formData:any={};
  id:any
  feeData:any
  constructor(private service: ServiceService,private acroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.acroute.params.subscribe(params => {
      return  this.id  = params['id']
    });
    if(this.id){
      this.getCourseById(this.id);
    }
  }

  getCourseById(id:any) {
    this.service.getCourseByid(id).subscribe((res:any) => {
      this.formData = res?.data?.feeInfo[0];
    });
  }

  createFee(data:any){
    let val = {
      "_id":this.id,
      "feeInfo":data
    }
    console.log(val);
    this.service.createCourse(val).subscribe((res:any)=>{
      if(res.status == 'ok'){
       alert(res.msg);
       location.reload();
      }
      else{
        alert('something went wrong');
      }
      })
  }

}

import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.scss']
})
export class ViewImagesComponent implements OnInit {
  imagedetails:any;
  url:any;
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    this.url = this.service.imageUrl;
    this.getSlider();
  }

  getSlider(){
    this.service.getSlider().subscribe((res:any)=>{
      this.imagedetails =  res.data;
    })
  }
  deleteSlider(id:any){

    let temp = confirm("Are you sure you want to delete");
    if(temp){
      let val = {
        "_id":id,
        "isActive":false
      }
      this.service.createSlider(val).subscribe((res:any)=>{
        if(res.status == "ok"){
          alert(res.msg);
          location.reload();
        }
        else{
          alert(res.msg);
        }
      })
    }

  }

}

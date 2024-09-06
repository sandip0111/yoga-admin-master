import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-imageslider',
  templateUrl: './imageslider.component.html',
  styleUrls: ['./imageslider.component.scss']
})
export class ImagesliderComponent implements OnInit {
  formData:any={};
  result:any;
  sliderId:any;
  imageFetch:any;
  url:any;
  constructor(private service:ServiceService,private router:Router,private acroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.url = this.service.imageUrl;
    this.acroute.params.subscribe(params => {
      return  this.sliderId  = params['id']
    });

    if(this.sliderId){
      this.getSliderById(this.sliderId);
    }
  }

  selectSlider(e){
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

  createSlider(data:any){
    if(!this.sliderId){
      data.isActive = true;
    }
    this.service.createSlider(data).subscribe((res:any)=>{
      if(res.status == "ok"){
     alert(res.msg);
     this.router.navigate(['/view-images']);
      }
      else{
        alert("something went wrong");
      }
    })
  }

  getSliderById(id:any){
    this.service. getSliderById(id).subscribe((res:any)=>{
      // console.log(res.data.image);
      this.formData = res.data;
      this.imageFetch = res.data.image;
    })
  }

}

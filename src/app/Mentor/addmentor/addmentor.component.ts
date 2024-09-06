import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addmentor',
  templateUrl: './addmentor.component.html',
  styleUrls: ['./addmentor.component.scss']
})
export class AddmentorComponent implements OnInit {
  formData:any={};
  url: any;
  mentorId:any;
  pictureFetch:any;
  thumbFetch:any
  constructor(private service:ServiceService,private router:Router,private acroute:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.url = this.service.imageUrl;
    this.acroute.params.subscribe(params => {
      return  this.mentorId  = params['id']
    });

    if(this.mentorId){
      this.getMentorById(this.mentorId);
    }

    }

    selectThumb(e){
      const formData = new FormData();
       formData.append('image',e.target.files[0]);
       formData.append('type','return');
       this.service.uploadImage(formData).subscribe((res: any) => {
          if(res.status == "ok"){
            this.formData.thumb = res.imageName
           }
           else{
            alert("something went wrong")
           }
        });
    }
    selectPicture(e){
      const formData = new FormData();
      formData.append('image',e.target.files[0]);
      formData.append('type','return');
      this.service.uploadImage(formData).subscribe((res: any) => {
         if(res.status == "ok"){
          this.formData.picture = res.imageName
         }
         else{
          alert("something went wrong")
         }
       });
    }
    createMentor(data:any){
      if(!this.mentorId){
        data.isActive = true;
      }
        this.service.createMentor(data).subscribe((res:any)=>{
    if(res.status=="ok"){
    alert(res.msg);
    this.router.navigate(['/mentors'])
   }
   else{
    alert(res.msg);
    }
       })
  }

  getMentorById(id:any){
    this.service.getMentorById(id).subscribe((res:any)=>{
    console.log(res);
   this.formData = res.data
   this.pictureFetch = res.data.picture;
   this.thumbFetch = res.data.thumb;
    });
  }

  getSlug(e:any){
   let str = e.target.value
    let s = str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

    this.formData.slug = s;
  }


}


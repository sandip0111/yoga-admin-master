import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  formData:any={}
  blogId: any;
  url: any;
  mentorList: any;
  isLoading: boolean =false;
  constructor(private service:ServiceService,private router:Router,private acroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.service.imageUrl;
    this.acroute.params.subscribe(params => {
      return  this.blogId  = params['id']
    });
   this.getAllMentor();

    if(this.blogId){
      this.getBlogById(this.blogId);
    }

  }

  getAllMentor(){
    this.service.getAllMentor().subscribe((res:any)=>{
      this.mentorList =  res.user;
    })
  }

  createBlog(data:any){
   if(!this.blogId){
     data.isActive = true;
   }
   this.service.createBlog(data).subscribe((res: any) => {
    console.log(res);
    if(res.status == "ok"){
      alert(res.msg);
      this.router.navigate(['/view-blog']);
    }
    else{
      alert('something went wrong');
    }
   });

  }

  selectBlogImage(e:any){
    this.isLoading =true;
    console.log(e.target.files);
    if(e.target.files[0].size > 500000){
      alert('File Size should be less than 500kb');
      e.target.value = '';
    this.isLoading =false;

    }
    else{
      const formData = new FormData();
      formData.append('image',e.target.files[0]);
      formData.append('type','return');
      this.service.uploadImage(formData).subscribe((res: any) => {
         if(res.status == "ok"){
    this.isLoading =false;

          this.formData.image = res.imageName
          alert('Uploaded');
         }
         else{
          alert("something went wrong")
         }
       });
    }

  }

  getBlogById(id:any){
    this.service.getBlogById(id).subscribe((res:any)=>{
     this.formData = res.data
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

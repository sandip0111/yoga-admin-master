import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  standalone: false,
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  [key: string]: any;
  public formData: any = {};
  public blogId: any;
  public url: any;
  public mentorList: any;
  public isLoading: boolean = false;
  public showCode: boolean = false;

  constructor(private service: ServiceService, private router: Router, private acroute: ActivatedRoute) {
    this.showCode = false;
  }

  public toggleCode(): void {
    this.showCode = !this.showCode;
  }

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

  removeImage() {
    this.formData.image = '';
  }

  getBlogById(id:any){
    this.service.getBlogById(id).subscribe((res:any)=>{
     this.formData = res.data
    });
  }
}


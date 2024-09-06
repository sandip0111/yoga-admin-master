import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {
 isLoading =false;
  blogList:any;
  imageUrl:any;
  filter:any={};
  p: number = 1;
  total:any
  constructor(private service:ServiceService) {}

  ngOnInit(): void {
    this.imageUrl = this.service.imageUrl;
    this.getAllBlog();
    this.filter={
      pageNo:1,
      size:10
    };
  }

  getAllBlog(){
    this.isLoading = true;
    this.service.getAllBlog(this.filter).subscribe((res:any)=>{
      this.blogList =  res.data;
      this.total = res.total;
      this.isLoading =false
      // console.warn(this.userlist);
    })
  }

  deleteBlog(id:any){
   let val={
    "_id":id,
    "isActive":false
   };
   this.service.createBlog(val).subscribe((res:any)=>{
    if(res.status == "ok"){
      alert(res.msg);
      location.reload();
    }
    else{
      alert('something went wrong');
    }
   });

  }
  onTableDataChange(event: any) {
    this.filter.pageNo = event;
    this.getAllBlog();
    this.p = event;
    window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }
}

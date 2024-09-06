import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  formData:any={};
  pageId:any;
  pageData:any;
  constructor(private acroute:ActivatedRoute,private service:ServiceService) { }

  ngOnInit(): void {
    this.acroute.params.subscribe(params => {
      return  this.pageId  = params['id']
    });
   this.getAllPages();
    if(this.pageId){
      this.getPageById(this.pageId);
    }
  }

  createPageData(data:any){
    if(!this.pageId){
      data.isActive = true;
    }
    this.service.createPage(data).subscribe((res: any) => {
       if(res.status == "ok"){
        alert(res.msg);
        location.reload();
       }
       else{
        alert('something went wrong');
       }
    });

  }

  getAllPages(){
    this.service.getAllPages().subscribe((res: any) => {
    this.pageData =res.data;
    });
  }

  getPageById(id:any){
    this.service.getPageById(id).subscribe((res: any) => {
    this.formData =res.data;
    });
  }

  deletePage(id:any){
    let h = confirm("Are you sure you want to delete?");
    if(h){
      let val = {
        "_id":id,
        "isActive":false
       }
       this.service.createPage(val).subscribe((res: any) => {
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

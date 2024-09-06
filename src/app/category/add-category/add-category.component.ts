import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryDetails:any={};
  categoryData:any;
  catId: any;
  constructor(private http:ServiceService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      return  this.catId  = params['id']
    });
  this.getAllCategory();
    if(this.catId){
      this.getCategoryById(this.catId)
    }
  }

 createCategory(data:any){
  if(!this.catId){
    data.isActive = true;
  }
  this.http.createCategory(data).subscribe((res:any)=>{
      if(res.status == "ok"){
        alert(res.msg);
        location.reload();
      }
      else{
        alert('something went wrong');
      }
    })
 }

 getCategoryById(id) {
    this.http.getCategoryById(id).subscribe((res:any) => {
       this.categoryDetails = res.Data;
     console.log(res.Data,'-----------------------------');
    });
  }
  deleteCategory(id:any){
    let val={
      "_id":id,
      "isActive":false
    }
   }

   getAllCategory(){
    this.http.getAllCategory().subscribe((res:any)=>{
    this.categoryData = res.data;
    })
  }
 }



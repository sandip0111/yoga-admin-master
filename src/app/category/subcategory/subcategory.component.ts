import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  formData:any={};
  subId: any;
  subcatList: any;
  categoryData: any;
  subcategoryData: any;

  constructor(private http:ServiceService,private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllSubCategory();
    this.route.params.subscribe(params => {
      return  this.subId  = params['id']
    });

    if(this.subId){
      this.getSubCategoryById(this.subId)
    }
  }

  getAllCategory(){
    this.http.getAllCategory().subscribe((res:any)=>{
    this.categoryData = res.data;
    })
  }

  createSubCategory(data:any){
    if(!this.subId){
      data.isActive = true;
    }
    this.http.createSubCategory(data).subscribe((res:any)=>{
        if(res.status == "ok"){
          alert(res.msg);
          location.reload();
        }
        else{
          alert('something went wrong');
        }
      })
   }

  getSubCategoryById(id) {
    this.http.getSubCategoryById(id).subscribe((res:any) => {
     this.formData = res.data;
    });
  }

  getAllSubCategory(){
    this.http.getAllSubCategory().subscribe((res:any)=>{
    this.subcategoryData = res.data;
    for (const sub of this.subcategoryData) {
      this.http.getCategoryById(sub.categoryId).subscribe((res:any) => {
      sub.categoryData = res.data;
      });
     }
    })


  }

  deleteSubCategory(index:any){

  }


}

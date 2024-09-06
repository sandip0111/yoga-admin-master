import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html',
  styleUrls: ['./sub-course.component.scss']
})
export class SubCourseComponent implements OnInit {
  formData:any={};
  subCId: any;
  subcoursecatList: any;
  subcategoryData: any;
  subcoursecategoryData: any;

  constructor(private http:ServiceService,private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllSubCategory();
   this.getAllSubCourseCategory();
    this.route.params.subscribe(params => {
      return  this.subCId  = params['id']
    });

    if(this.subCId){
      this.getSubCourseCategoryById(this.subCId)
    }
  }

  getAllSubCategory(){
    this.http.getAllSubCategory().subscribe((res:any)=>{
    this.subcategoryData = res.data;
    })
  }

  createSubCourseCategory(data:any){
    if(!this.subCId){
      data.isActive = true;
    }
    this.http.createSubCourseCategory(data).subscribe((res:any)=>{
        if(res.status == "ok"){
          alert(res.msg);
          location.reload();
        }
        else{
          alert('something went wrong');
        }
      })
   }

  getSubCourseCategoryById(id) {
    this.http.getSubCourseCategoryById(id).subscribe((res:any) => {
     this.formData = res.data;
    });
  }

  getAllSubCourseCategory(){
    this.http.getAllSubCourseCategory().subscribe((res:any)=>{
    this.subcoursecategoryData = res.data;
    for (const sub of this.subcoursecategoryData) {
      this.http.getSubCategoryById(sub.subcategoryId).subscribe((res:any) => {
      sub.subcategoryData = res.data;
      });
     }
    })
  }

  deleteSubCourseCategory(id:any){

  }
}

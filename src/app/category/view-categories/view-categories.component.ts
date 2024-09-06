import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit {
  categoryData:any=[];
  formmodal:any;
  subDetails:any = {};
  categoryDetails:any={};
  userid:any={};
  routeSub: any;
  constructor(private http:ServiceService,private modalService: NgbModal, private route: ActivatedRoute) {

   }
  ngOnInit(): void {
    this.getAllCategory();
}
  getAllCategory(){
    this.http.getAllCategory().subscribe((res:any)=>{
      console.log(res);
   this.categoryData = res.data;
    })
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  submitdata(){
    this.categoryDetails.subcategory.push(this.subDetails)
    this.createCategory();
  }
  createCategory(){
    this.http.createCategory(this.categoryDetails).subscribe((res)=>{
      // this.response = res;
      // console.log(this.response,'---------')
    })
 }

 deleteCategory(id:any){
  let val={
    "_id":id,
    "isActive":false
  }
 }

}

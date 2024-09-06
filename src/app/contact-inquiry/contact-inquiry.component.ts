import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-contact-inquiry',
  templateUrl: './contact-inquiry.component.html',
  styleUrls: ['./contact-inquiry.component.scss']
})
export class ContactInquiryComponent implements OnInit {

  imagedetails:any;
  url:any;
  filter:any={};
  p: number = 1;
  total:any;
  isLoading:boolean = false;
  videoList: any;
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    this.filter={
      pageNo:1,
      size:10
    };
    // this.url = this.service.videoUrl;
    this.getInquiry(this.filter);
  }

  getInquiry(filter:any) {
    this.isLoading =true;
    this.service.getAllInquiry(filter).subscribe((res:any) => {
       this.videoList = res.data;
       this.total = res.total;
       this.isLoading =false;
    });
  }

  onTableDataChange(event: any) {
    this.filter.pageNo = event;
    this.getInquiry(this.filter);
    this.p = event;
    window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }

 exportExcelData(){
this.isLoading  =true;
  this.service.exportFile().subscribe((res: any) => {
    // console.log(res);
    if(res){
      this.isLoading = false;
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Export_Inquiry.xlsx');
    }

  });
}

}

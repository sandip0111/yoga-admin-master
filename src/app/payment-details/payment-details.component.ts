import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  imagedetails:any;
  url:any;
  filter:any={};
  p: number = 1;
  total:any;
  isLoading:boolean = false;
  payList: any;
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    this.filter={
      pageNo:1,
      size:10
    };
    // this.url = this.service.videoUrl;
    this.getPayment(this.filter);
  }

  getPayment(filter:any) {
    this.isLoading =true;
    this.service.getAllPayment(filter).subscribe((res:any) => {
      console.log(res);

       this.payList = res.data;
       this.total = res.total;
       this.isLoading =false;
    });
  }

  onTableDataChange(event: any) {
    this.filter.pageNo = event;
    this.getPayment(this.filter);
    this.p = event;
    window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }

//  exportExcelData(){
// this.isLoading  =true;
//   this.service.exportFile().subscribe((res: any) => {
//     // console.log(res);
//     if(res){
//       this.isLoading = false;
//       const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       FileSaver.saveAs(blob, 'Export_Inquiry.xlsx');
//     }

//   });
// }

}

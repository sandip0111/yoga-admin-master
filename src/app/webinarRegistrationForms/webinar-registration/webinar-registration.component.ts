import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  standalone: false,
  selector: 'app-webinar-registration',
  templateUrl: './webinar-registration.component.html',
  styleUrls: ['./webinar-registration.component.scss']
})
export class WebinarRegistrationComponent implements OnInit {
  isLoading = false;
  registrationData: any;
  filter:any={};
  total:any;
  p:any=1;
  constructor(private service:ServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.filter = {
      pageNo:1,
      size:10
    }
    this.getAllWebinarRegistration()
  }

  getAllWebinarRegistration(){
    this.isLoading = true;
    this.service.getAllWebinarRegistration(this.filter).subscribe((res:any)=>{
      this.registrationData = res.data;
      this.total = res.total;
      this.isLoading = false;
    })
  }

  onTableDataChange(event: any) {
    this.filter.pageNo = event;
    this.getAllWebinarRegistration();
    this.p = event;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
 }

}

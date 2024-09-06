import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  aList: any;

  constructor(private service:ServiceService,private router:Router,private acroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAnalyticsDataV2(7);
  }

  getAnalyticsData(e:any){
  let val = e.target.value;
  this.service.getAnalyticsByDate({days:val}).subscribe((res:any)=>{
    this.aList = res;

  })
  }

  getAnalyticsDataV2(e:any){
    this.service.getAnalyticsByDate({days:e}).subscribe((res:any)=>{

      this.aList = res;
    })
    }

}

import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-video-review',
  templateUrl: './video-review.component.html',
  styleUrls: ['./video-review.component.scss']
})
export class VideoReviewComponent implements OnInit {
  imagedetails:any;
  url:any;
  filter:any={};
  p: number = 1;
  total:any;
  isLoading =false;
  videoList: any;
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    this.filter={
      pageNo:1,
      size:10
    };
    this.url = this.service.videoUrl;
    this.getVideoReview(this.filter);
  }

  getVideoReview(filter:any) {
    this.isLoading =true;
    this.service.getAllVideoReviews(filter).subscribe((res:any) => {
       this.videoList = res.data;
       this.total = res.total;
       this.isLoading =false;
    });
  }

  onTableDataChange(event: any) {
    this.filter.pageNo = event;
    this.getVideoReview(this.filter);
    this.p = event;
    window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }
}


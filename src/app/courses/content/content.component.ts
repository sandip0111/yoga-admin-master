import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  contentData:any = {};
  id: any;
  contentList: any;
  editIndex: any;
  editCounter: boolean=true;
  constructor(private service:ServiceService,private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void{
    this.route.params.subscribe(params => {
      return  this.id  = params['id']
    });
    if(this.id){
      this.getCourseById(this.id)
    }
  }

  getCourseById(id:any) {
    this.service.getCourseByid(id).subscribe((res:any) => {
      this.contentList = res.data.content;
    });
  }

  createContent(data:any){

    if(this.contentList.length > 0){
      if(this.editCounter){
        this.contentList[this.editIndex] = data;
        var val = {
          "_id":this.id,
          "content":this.contentList
        }
      }
      else{
        this.contentList.push(data)
        var val = {
          "_id":this.id,
          "content":this.contentList
        }
      }
    }
    else{
      val = {
        "_id":this.id,
        "content":[data]
      }
    }
    console.log(val);

    this.service.createCourse(val).subscribe((res:any)=>{
      if(res.status === 'ok'){
       alert(res.msg);
       location.reload();
       this.editIndex = "";
       this.editCounter = false;
      }
      else{
        alert('something went wrong');
      }
      })
  }

  editContent(data:any,index:any){
   this.contentData = data;
   this.editIndex = index;
   this.editCounter = true;

  }
  deleteContent(data:any,index:any){
  console.log(data,index);

  }

  }

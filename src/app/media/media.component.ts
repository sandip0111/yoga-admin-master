import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
 formData:any={};
  mediaList: any;
  imageUrl:any;
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    this.imageUrl = this.service.imageUrl;
    this.getAllMedia();
  }

  uploadMedia(e:any){
    const formData = new FormData();
    formData.append('image',e.target.files[0]);
    formData.append('type','return');
    this.service.uploadImage(formData).subscribe((res: any) => {
       if(res.status == "ok"){
        alert('Upload successful');
        this.formData.image = res.imageName
       }
       else{
        alert("something went wrong")
       }
     });
  }
  createMedia(data:any){
    data.isActive = true;
    this.service.createMedia(data).subscribe((res: any) => {
       if(res.status == "ok"){
        alert(res.msg);
        location.reload();
       }
       else{
        alert('something went wrong');
       }
    });
  }

  getAllMedia(){
    this.service.getAllMedia().subscribe((res:any)=>{
      this.mediaList =  res.data;
      // console.warn(this.userlist);
    })
  }

  deleteMedia(id:any){
    let temp = confirm("Are you sure you want to delete");
    if(temp){
      let val ={
        "_id":id,
        "isActive":false
       }
       this.service.createMedia(val).subscribe((res: any) => {
        if(res.status == "ok"){
         alert(res.msg);
         location.reload();
        }
        else{
         alert('something went wrong');
        }
       });
    }
  }

}

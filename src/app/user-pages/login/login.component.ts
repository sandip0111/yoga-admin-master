import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../../services/service.service';
@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: any={};

  constructor(private webapiservice:ServiceService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  doLogin(data:any){

   this.webapiservice.doLogin(data).subscribe((res:any)=>{

    if(res.status == "ok"){
      sessionStorage.setItem('token',res.token);
      sessionStorage.setItem('loginId',res.user._id);
     // sessionStorage.setItem('name',res.user.name);
      // sessionStorage.setItem('type',res.user.type);
      this.router.navigate(['/dashboard']);
    }
    else{
      alert(res.msg);
    }
   })

  }
}

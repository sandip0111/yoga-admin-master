import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: any = {};
  loading: boolean = false;
  showPassword: boolean = false;
  rememberMe: boolean = true;

  constructor(
    private webapiservice: ServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  doLogin(data: any) {
    if (!data.email || !data.password) {
      alert("Please fill in both email and password.");
      return;
    }
    this.loading = true;
    this.webapiservice.doLogin(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == "ok") {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('loginId', res.user._id);
          this.router.navigate(['/dashboard']);
        } else {
          alert(res.msg || "Invalid credentials");
        }
      },
      (err) => {
        this.loading = false;
        alert("An error occurred during login. Please try again.");
      }
    );
  }
}

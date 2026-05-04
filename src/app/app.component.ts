import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Yoga Vidya School';
  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isLoading: boolean = false;

  constructor(private router: Router) {
    const userLogin = sessionStorage.getItem('loginId');

    // Toggle sidebar/navbar/footer visibility based on route
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        const isLoginPage = event.url === '/' || event.url === '/login';
        const isUnauthenticated = isLoginPage && !userLogin;

        if (isUnauthenticated || event.url === '/login') {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          document.querySelector('.main-panel')?.classList.add('w-100');
          document.querySelector('.page-body-wrapper')?.classList.add('full-page-wrapper');
          document.querySelector('.content-wrapper')?.classList.remove('auth', 'auth-img-bg', 'lock-full-bg');
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          document.querySelector('.main-panel')?.classList.remove('w-100');
          document.querySelector('.page-body-wrapper')?.classList.remove('full-page-wrapper');
          document.querySelector('.content-wrapper')?.classList.remove('auth', 'auth-img-bg', 'p-0');
        }
      }
    });

    // Spinner for lazy-loaded modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    // Scroll to top after route change
    this.router.events
      .pipe(filter((evt) => evt instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));
  }
}

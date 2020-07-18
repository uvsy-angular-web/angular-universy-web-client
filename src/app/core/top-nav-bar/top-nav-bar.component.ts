import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {
  isLoggedIn = false;
  navbarCollapsed = true;
  constructor(private authService: AuthService) {
  }


  onCollapse() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  ngOnInit() {
    this.checkLogIn();
  }

  logoutEvent() {
    this.authService.logout();
  }

  private checkLogIn() {
    this.isLoggedIn = AuthService.isLoggedIn();
  }
}

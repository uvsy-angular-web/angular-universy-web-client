import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {
  isLoggedIn = false;

  constructor() {
  }

  ngOnInit() {
    this.checkLogIn();
  }

  logoutEvent() {
    AuthService.logout();
  }

  private checkLogIn() {
    this.isLoggedIn = AuthService.isLoggedIn();
  }
}

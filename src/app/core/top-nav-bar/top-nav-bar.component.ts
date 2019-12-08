import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  logoutEvent() {
    AuthService.logout();
  }

  isLoggedIn(): boolean {
    return AuthService.isLoggedIn();
  }
}

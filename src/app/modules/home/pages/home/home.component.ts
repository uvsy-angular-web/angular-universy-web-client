import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/system/navigation.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.verifyUserNotLoggedIn();
  }

  private verifyUserNotLoggedIn() {
    if (AuthService.isLoggedIn()) {
      this.navigateToInstitutionPage();
    }
  }

  public navigateToInstitutionPage() {
    this.navigationService.navigateToInstitutionPage();
  }
}

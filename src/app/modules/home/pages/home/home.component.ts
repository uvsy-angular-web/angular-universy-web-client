import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../../core/services/system/navigation.service';

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
  }

  public navigationServicePage() {
    this.navigationService.navigateToInstitutionPage();
  }
}

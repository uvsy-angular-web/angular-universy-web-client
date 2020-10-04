import { Component, OnInit, Input } from '@angular/core';
import { CareerService } from 'src/app/core/services/career.service';
import { NavigationService } from 'src/app/core/services/system/navigation.service';
import { Route } from 'src/app/core/services/system/routes/routes.enum';
import { Career } from 'src/app/models/career.model';
import { CareerStat } from 'src/app/models/career-stat.model';

@Component({
  selector: 'app-career-stats-card',
  templateUrl: './career-stats-card.component.html',
  styleUrls: ['./career-stats-card.component.css']
})
export class CareerStatsCardComponent implements OnInit {
  @Input() career: CareerStat;
  noProgramTxt = 'no posee programas';

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }

  navigateToCareerStats() {
    const currentCareer = new Career(this.career.careerId)
    CareerService.setCurrentCareer(currentCareer);
    this.navigationService.navigateToRoute(Route.CAREER_STATS);
  }

}

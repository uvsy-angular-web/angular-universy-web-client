import { Component, OnInit, Input } from '@angular/core';
import { CareerStat } from 'src/app/models/institution-report.model';

@Component({
  selector: 'app-career-stats-card',
  templateUrl: './career-stats-card.component.html',
  styleUrls: ['./career-stats-card.component.css']
})
export class CareerStatsCardComponent implements OnInit {
  @Input() career: CareerStat;
  noProgramTxt = 'no posee programas';

  constructor() { }

  ngOnInit() {
  }

  navigateToCareerStats() {
    //T ODO: Change this after updating the career stat
    // CareerService.setCurrentCareer(this.career);
    // this.navigationService.navigateToRoute(Route.CAREER_STATS);
  }

}

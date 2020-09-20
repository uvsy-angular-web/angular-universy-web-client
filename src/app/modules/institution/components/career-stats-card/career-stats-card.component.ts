import { Component, OnInit, Input } from '@angular/core';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';
import { CareerService } from 'src/app/core/services/career.service';
import { CareerStat } from 'src/app/models/career-stat.model';

@Component({
  selector: 'app-career-stats-card',
  templateUrl: './career-stats-card.component.html',
  styleUrls: ['./career-stats-card.component.css']
})
export class CareerStatsCardComponent {
  @Input() careerStat: CareerStat;
  noProgramTxt = 'no posee programas';

  programs: Program[] = [];

  constructor(
    private careerService: CareerService,
  ) { }

  navigateToCareerStats() {
    this.careerService.navigateToCareerState(this.careerStat.careerId)
  }

}

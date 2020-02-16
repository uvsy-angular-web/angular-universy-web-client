import { Component, OnInit, Input } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';
import { CareerService } from 'src/app/core/services/career.service';
import { NavigationService } from 'src/app/core/services/system/navigation.service';
import { Route } from 'src/app/core/services/system/routes/routes.enum';

@Component({
  selector: 'app-career-stats-card',
  templateUrl: './career-stats-card.component.html',
  styleUrls: ['./career-stats-card.component.css']
})
export class CareerStatsCardComponent implements OnInit {
  @Input() career: Career;
  noProgramTxt = 'no posee programas';

  programs: Program[] = [];

  constructor(
    private programService: ProgramService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    this.getPrograms();
  }

  navigateToCareerStats() {
    CareerService.setCurrentCareer(this.career);
    this.navigationService.navigateToRoute(Route.CAREER_STATS);
  }

  private getPrograms() {
    this.programService.getProgramsByCareer(this.career)
      .subscribe((programs: Program[]) => this.programs = programs);
  }
}

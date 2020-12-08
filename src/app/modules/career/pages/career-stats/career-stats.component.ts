import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { Route } from 'src/app/core/services/system/routes/routes.enum';
import { CareerService } from 'src/app/core/services/career.service';
import { ProgramReport } from 'src/app/models/program-report.model';
import { SubjectStat } from 'src/app/models/subject-stat.model';

const FIRST_ITEM_INDEX = 0;

@Component({
  selector: 'app-career-stats',
  templateUrl: './career-stats.component.html',
  styleUrls: ['./career-stats.component.css']
})
export class CareerStatsComponent implements OnInit {
  public career: Career;
  public backNavigationRoute = Route.INSTITUTION_STATS;
  public selectedSubject: SubjectStat;
  public programReport: ProgramReport
  public careerStatsTitle = 'Estadísticas de valoración por materia'
  constructor() { }

  public ngOnInit() {
    this.getCareer();
  }

  public selectSubject(subject: SubjectStat) {
    this.selectedSubject = subject;
  }

  private getCareer() {
    this.career = CareerService.getCurrentCareer();
  }
}

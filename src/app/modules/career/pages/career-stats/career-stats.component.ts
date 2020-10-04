import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { Route } from 'src/app/core/services/system/routes/routes.enum';
import { CareerService } from 'src/app/core/services/career.service';
import { ProgramReport, SubjectStat } from 'src/app/models/program-report.model';

const FIRST_ITEM_INDEX = 0;

@Component({
  selector: 'app-career-stats',
  templateUrl: './career-stats.component.html',
  styleUrls: ['./career-stats.component.css']
})
export class CareerStatsComponent implements OnInit {
  career: Career;
  backNavigationRoute = Route.INSTITUTION_STATS;
  selectedSubject: SubjectStat;
  programReport: ProgramReport
  constructor() { }

  ngOnInit() {
    this.getCareer();
  }

  selectSubject(subject: SubjectStat) {
    this.selectedSubject = subject;
  }

  private getCareer() {
    this.career = CareerService.getCurrentCareer();
  }
}

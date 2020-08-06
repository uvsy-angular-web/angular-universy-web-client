import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career.model';
import { Route } from 'src/app/core/services/system/routes/routes.enum';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/core/services/subject.service';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from 'src/app/core/services/program.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CareerService } from 'src/app/core/services/career.service';

const FIRST_ITEM_INDEX = 0;

@Component({
  selector: 'app-career-stats',
  templateUrl: './career-stats.component.html',
  styleUrls: ['./career-stats.component.css']
})
export class CareerStatsComponent implements OnInit {
  career: Career;
  backNavigationRoute = Route.INSTITUTION_STATS;
  selectedSubject: Subject;

  constructor() { }

  ngOnInit() {
    this.getCareer();
  }

  selectSubject(subject: Subject) {
    this.selectedSubject = subject;
  }

  private getCareer() {
    this.career = CareerService.getCurrentCareer();
  }
}

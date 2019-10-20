import { Component, OnInit } from '@angular/core';
import {Course} from '../../../../shared/models/course.model';
import {CourseService} from '../../../../core/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public course = new Course();

  constructor(
        private courseService: CourseService,
  ) {}

  ngOnInit() {
  }

  // public openNewPeriodModal() {
  //   this.PeriodModalService.openNewPeriodModal().subscribe(
  //     (newProgram: Period) => this.addPeriod(newProgram)
  //   );
  // }
}

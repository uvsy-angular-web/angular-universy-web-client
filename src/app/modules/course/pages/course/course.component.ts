import {Component, OnInit} from '@angular/core';
import {Course} from '../../../../models/course.model';
import {CourseService} from '../../../../core/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public course: Course;

  constructor() {
  }

  ngOnInit() {
    this.getCurrentCourse();
  }

  private getCurrentCourse() {
    this.course = CourseService.getCurrentCourse();
    console.log(this.course); // TODO: delete this
  }

  // public openNewPeriodModal() {
  //   this.PeriodModalService.openNewPeriodModal().subscribe(
  //     (newProgram: Period) => this.addPeriod(newProgram)
  //   );
  // }
}

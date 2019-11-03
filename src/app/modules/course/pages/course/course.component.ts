import {Component, OnInit} from '@angular/core';
import {Course} from '../../../../models/course.model';
import {CourseService} from '../../../../core/services/course.service';
import {CourseModalService} from '../../modals/course-modal.service';
import {Period} from '../../../../models/period.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public course: Course;

  constructor(private courseModalService: CourseModalService) {
  }

  ngOnInit() {
    this.getCurrentCourse();
  }

  private getCurrentCourse() {
    this.course = CourseService.getCurrentCourse();
  }

  public openNewPeriodModal() {
    this.courseModalService.openNewPeriodModal().subscribe(
      (newProgram: Period) => this.addPeriod(newProgram)
    );
  }

  private addPeriod(period: Period) {
    alert(period.beginMonth + period.endMonth);
  }
}

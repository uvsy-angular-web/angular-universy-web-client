import {Component, OnInit} from '@angular/core';
import {Course} from '../../../../models/course.model';
import {CourseService} from '../../../../core/services/course.service';
import {CourseModalService} from '../../modals/course-modal.service';
import {Period} from '../../../../models/period.model';
import {TimeService} from '../../../../core/services/time.service';

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

  public getPeriodRange(period: Period): string {
    const beginMonthName = TimeService.getNameOfMonth(period.beginMonth);
    const endMonthName = TimeService.getNameOfMonth(period.endMonth);
    return `${beginMonthName} - ${endMonthName}`;
  }

  public openNewPeriodModal() {
    this.courseModalService.openNewPeriodModal().subscribe(
      (newProgram: Period) => this.addPeriod(newProgram)
    );
  }

  private addPeriod(period: Period) {
    this.course.periods.push(period);
  }
}

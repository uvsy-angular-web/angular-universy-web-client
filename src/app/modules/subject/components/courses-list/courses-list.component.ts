import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { Commission } from 'src/app/models/commission.model';
import { Course } from 'src/app/models/course.model';

class CommissionCourse {
  commission: Commission;
  course: Course;
  hasCourse: boolean;
  constructor(commission?: Commission, course?: Course, hasCourse?: boolean) {
    this.commission = commission;
    this.course = course;
    this.hasCourse = hasCourse;
  }
}

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnChanges {
  @Input() commissions: Commission[] = [];
  @Input() courses: Course[] = [];
  commissionsCourses: CommissionCourse[] = [];
  noCommissionsMessage = 'Este nivel no cuenta con comisiones cargadas aún.';
  constructor() { }

  ngOnChanges() {
    this.generateCommissionCourses();
  }
  private generateCommissionCourses() {
    this.commissionsCourses = [];
    this.commissions.forEach(
      (commission: Commission) => {
        const courseInCommision = this.courses.find(
          (course: Course) => course.commissionId === commission.id
        );
        const commissionCourse = new CommissionCourse();
        commissionCourse.commission = commission;
        commissionCourse.course = courseInCommision;
        commissionCourse.hasCourse = courseInCommision !== undefined;

        this.commissionsCourses.push(commissionCourse);
      }
    );
  }
}

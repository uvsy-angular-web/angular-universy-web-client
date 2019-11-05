import {Component, OnInit} from '@angular/core';
import {Course} from '../../../../models/course.model';
import {CourseService} from '../../../../core/services/course.service';
import {CourseModalService} from '../../modals/course-modal.service';
import {Period} from '../../../../models/period.model';
import {NavigationService} from '../../../../core/services/system/navigation.service';
import {NotificationService} from '../../../../shared/modals/notification.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public course: Course;

  constructor(private courseModalService: CourseModalService,
              private courseService: CourseService,
              private navigationService: NavigationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getCurrentCourse();
  }

  private getCurrentCourse() {
    this.course = CourseService.getCurrentCourse();
  }

  public openNewPeriodModal() {
    this.courseModalService.openNewPeriodModal().subscribe(
      (newPeriod: Period) => this.addPeriod(newPeriod)
    );
  }

  public saveCourse() {
    this.courseService.updateCourse(this.course).subscribe(
      () => {
        this.notificationService.inform('Se guardo con éxito', 'Se actualizo la comisión con éxito');
        this.navigationService.navigateToSubjectPage();
      }, (error) => {
        this.notificationService.showError('Ocurrió un problema tratando de publicar el plan');
        console.error(error);
      }
    );
  }

  private addPeriod(period: Period) {
    this.course.periods.push(period);
  }
}

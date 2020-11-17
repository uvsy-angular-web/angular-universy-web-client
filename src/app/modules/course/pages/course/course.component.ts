import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../models/course.model';
import { CourseService } from '../../../../core/services/course.service';
import { CourseModalService } from '../../modals/course-modal.service';
import { Period } from '../../../../models/period.model';
import { NavigationService } from '../../../../core/services/system/navigation.service';
import { ModalService } from '../../../../modals/modal.service';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { CommissionService } from 'src/app/core/services/commission.service';
import { Commission } from 'src/app/models/commission.model';

const DELETE_COURSE_TITLE = 'Eliminar curso';
const DELETE_COURSE_DESCRIPTION = 'Se eliminará el curso junto con sus períodos, profesores y horarios.';
const DELETE_COURSE_QUESTION = '¿Desea continuar?';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  title = 'Cargando...';
  course: Course;
  commission: Commission;

  constructor(
    private courseModalService: CourseModalService,
    private courseService: CourseService,
    private commissionService: CommissionService,
    private navigationService: NavigationService,
    private notificationService: ModalService) {
  }

  ngOnInit() {
    this.getCurrentCourse();
  }

  private getCurrentCourse() {
    this.course = CourseService.getCurrentCourse();
    this.commissionService.getCommission(this.course.commissionId).subscribe(
      (commission: Commission) => {
        this.commission = commission;
        this.updateTitle();
      }
    );
  }

  openNewPeriodModal() {
    this.courseModalService.openNewPeriodModal().subscribe(
      (newPeriod: Period) => this.addPeriod(newPeriod)
    );
  }

  saveCourse() {
    this.courseService.updateCourse(this.course).subscribe(
      () => {
        this.notificationService.inform('Se guardó con éxito', 'Se actualizó el curso exitosamente');
        this.navigationService.navigateToSubjectPage();
      }, (error) => {
        this.notificationService.showError('Ocurrió un problema tratando de obtener el plan');
        console.error(error);
      }
    );
  }

  private updateTitle() {
    this.title = `Curso: ${this.commission && this.commission.name}`;
  }

  private addPeriod(period: Period) {
    if (!this.course.periods) {
      this.course.periods = [];
    }
    this.course.periods.push(period);
  }

  openDeleteModal() {
    this.notificationService.openConfirmModal(
      DELETE_COURSE_TITLE,
      DELETE_COURSE_DESCRIPTION,
      DELETE_COURSE_QUESTION,
      ButtonText.Delete
    ).subscribe(
      () => {
        this.deleteCourse();
      }
    );
  }

  private deleteCourse() {
    this.courseService.deleteCourse(this.course).subscribe(
      () => {
        this.navigationService.navigateToSubjectPage();
      },
      (error) => {
        this.notificationService.showError('Ocurrió un error intentando borrar la comisión.');
        console.error(error);
      });
  }

}

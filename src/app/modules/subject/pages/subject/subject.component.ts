import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../../core/services/subject.service';
import { Subject } from '../../../../models/subject.model';
import { ButtonText } from '../../../../shared/enums/button-text.enum';
import { ModalService } from '../../../../modals/modal.service';
import { NavigationService } from '../../../../core/services/system/navigation.service';
import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../../../models/course.model';
import { ProgramService } from '../../../../core/services/program.service';
import { SubjectModalService } from '../../modals/subject-modal.service';
import { Correlative } from '../../../../models/correlative.model';
import { CorrelativeService } from 'src/app/core/services/correlative.service';
import { Commission } from 'src/app/models/commission.model';
import { CommissionService } from 'src/app/core/services/commission.service';

const NEW_COURSE_MODAL_TITLE = 'Crear un nuevo curso';
const NEW_COURSE_MODAL_QUESTION = '¿ Desea continuar ?';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject = new Subject();
  courses: Course[] = [];
  commissions: Commission[] = [];
  correlatives: Correlative[] = [];

  constructor(
    private subjectService: SubjectService,
    private correlativeService: CorrelativeService,
    private commissionService: CommissionService,
    private navigationService: NavigationService,
    private subjectModalService: SubjectModalService,
    private courseService: CourseService,
    private notificationService: ModalService) {
  }

  ngOnInit() {
    this.subject = SubjectService.getCurrentSubject();
    this.getCorrelatives();
    this.getCourses();
    this.getCommissions();
  }

  canModifySubject() {
    return !ProgramService.getCurrentProgram().active || this.subject.optative;
  }


  openDeleteModal() {
    this.notificationService.openConfirmModal(
      'Eliminar materia',
      'Se eliminará la materia y sus comisiones.',
      '¿ Está seguro que desea eliminarla ?',
      ButtonText.Delete
    ).subscribe(
      () => {
        this.deleteSubject();
      }
    );
  }

  openCoursePage(course: Course) {
    CourseService.setCurrentCourse(course);
    this.navigationService.navigateToCoursePage();
  }

  openManageCorrelativesModal() {
    const oldCorrelatives = { ...this.correlatives };
    this.subjectModalService.openModifySubjectCorrelatives(this.subject, this.correlatives).subscribe(
      (correlatives: Correlative[]) => {
        if (this.didCorrelativesChanged(oldCorrelatives, correlatives)) {
          this.updateSubjectCorrelatives(correlatives);
        } else {
          this.notificationService.inform('No se guardaron los cambios', 'Al parecer no hubo cambios en las correlativas');
        }
      }
    );
  }

  openViewCorrelativesModal() {
    this.subjectModalService.openViewSubjectCorrelatives(this.subject, this.correlatives);
  }

  openEditModal() {
    const isProgramPublished = ProgramService.getCurrentProgram().active;
    this.subjectModalService.openEditSubjectModal(this.subject, isProgramPublished).subscribe(
      (updatedSubject: Subject) => {
        this.subjectService.updateSubject(updatedSubject).subscribe(() => {
          this.subject = updatedSubject;
          this.notificationService.inform(
            '¡Modificación con éxito!',
            'Se actualizó la materia exitosamente.');
        }
        );
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de modificar la materia');
        console.error(error.message);
      })
    );
  }
  onCourseClick(course: Course) {
    CourseService.setCurrentCourse(course);
    this.navigationService.navigateToCoursePage();
  }

  onNewCourseClick(commission: Commission) {
    const newCourseModalMessage = `Se creara un nuevo curso en la comisión: ${commission.name}`;
    this.notificationService.openConfirmModal(
      NEW_COURSE_MODAL_TITLE,
      newCourseModalMessage,
      NEW_COURSE_MODAL_QUESTION,
      ButtonText.Accept
    ).subscribe(
      (confirm) => {
        if (confirm) {
          this.courseService.addCourse(commission).subscribe(
            () => this.getCourses()
          );
        }
      }
    );
  }

  private getCourses() {
    this.courseService.getCourses()
      .subscribe((courses) => {
        this.courses = courses;
      }
      );
  }

  private getCommissions() {
    this.commissionService.getCommissions()
      .subscribe((commissions) => {
        this.commissions = commissions.filter((commission) => commission.level === this.subject.level);
      }
      );
  }

  private getCorrelatives() {
    this.correlativeService.getCorrelatives(this.subject)
      .subscribe((correlatives) => {
        this.correlatives = correlatives;
      }
      );
  }

  private deleteSubject() {
    this.subjectService.deleteSubject(this.subject).subscribe(
      () => {
        this.navigationService.navigateToProgramPage();
      },
      (error) => {
        this.notificationService.showError('Ocurrió un error intentando borrar la materia.');
        console.error(error);
      });
  }


  private didCorrelativesChanged(oldCorrelatives: Correlative[], newCorrelatives: Correlative[]) {
    return JSON.stringify(oldCorrelatives) !== JSON.stringify(newCorrelatives);
  }

  private updateSubjectCorrelatives(correlatives: Correlative[]) {
    this.correlativeService.updatesCorrelativeList(this.subject, correlatives);
    this.correlatives = correlatives;
  }
}

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

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject = new Subject();
  courses: Course[] = [];
  correlatives: Correlative[] = [];

  constructor(
    private subjectService: SubjectService,
    private correlativeService: CorrelativeService,
    private navigationService: NavigationService,
    private subjectModalService: SubjectModalService,
    private courseService: CourseService,
    private notificationService: ModalService) {
  }

  ngOnInit() {
    this.subject = SubjectService.getCurrentSubject();
    this.getCorrelatives();
    this.getCourses();
  }

  openNewCourseModal() {
    this.notificationService.openEditNameModal(
      'Agregar Comisión',
      ButtonText.Add,
      '').subscribe(
        (courseName) => {
          this.addCourse(courseName);
        }
      );
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
    this.subjectModalService.openModifySubjectCorrelatives(this.subject, this.correlatives).subscribe(
      (correlatives: Correlative[]) => {
        if (this.didCorrelativesChanged(correlatives)) {
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
      () => {
        this.subjectService.updateSubject(this.subject).subscribe(() => {
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
  private addCourse(courseName: string) {
    this.courseService.addCourse(courseName).subscribe(
      () => {
        this.getCourses();
      },
      (error) => {
        this.notificationService.showError('Ocurrió un error tratando de agregar una comisión.');
        console.error(error);
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


  private didCorrelativesChanged(correlatives: Correlative[]) {
    return JSON.stringify(this.correlatives) !== JSON.stringify(correlatives);
  }

  private updateSubjectCorrelatives(correlatives: Correlative[]) {
    this.correlativeService.updatesCorrelativeList(this.subject, correlatives);
    this.correlatives = correlatives;
  }
}

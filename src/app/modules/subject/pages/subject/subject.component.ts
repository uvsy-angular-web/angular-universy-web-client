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

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public subject = new Subject();
  public courses: Course[] = [];

  constructor(
    private subjectService: SubjectService,
    private navigationService: NavigationService,
    private subjectModalService: SubjectModalService,
    private courseService: CourseService,
    private notificationService: ModalService) {
  }

  public openNewCourseModal() {
    this.notificationService.openEditNameModal(
      'Agregar Comisión',
      ButtonText.Add,
      '').subscribe(
        (courseName) => {
          this.addCourse(courseName);
        }
      );
  }

  public canModifySubject() {
    return !ProgramService.getCurrentProgram().active || this.subject.optative;
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

  public openDeleteModal() {
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

  public openCoursePage(course: Course) {
    CourseService.setCurrentCourse(course);
    this.navigationService.navigateToCoursePage();
  }

  ngOnInit() {
    this.subject = SubjectService.getCurrentSubject();
    this.getCourses();
  }

  private getCourses() {
    this.courseService.getCourses()
      .subscribe((courses) => {
        this.courses = courses;
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

  public openManageCorrelativesModal() {
    this.subjectModalService.openModifySubjectCorrelatives(this.subject).subscribe(
      (correlatives: Correlative[]) => {
        if (this.didCorrelativesChanged(correlatives)) {
          this.subject.correlatives = correlatives;
          this.updateSubjectCorrelatives();
        } else {
          this.notificationService.inform('No se guardaron los cambios', 'Al parecer no hubo cambios en las correlativas');
        }
      }
    );
  }
  public openViewCorrelativesModal() {
    this.subjectModalService.openViewSubjectCorrelatives(this.subject);
  }

  private didCorrelativesChanged(correlatives: Correlative[]) {
    return JSON.stringify(this.subject.correlatives) !== JSON.stringify(correlatives);
  }

  public openEditModal() {
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

  private updateSubjectCorrelatives() {
    this.subjectService.updateSubject(this.subject).subscribe(
      () => {
        this.notificationService.inform(
          '¡Actualización con éxito!',
          'Se actualizó el estado de las correlativas exitosamente.');
        SubjectService.setCurrentSubject(this.subject);
      }, ((error) => {
        this.notificationService.showError('Ocurrió un error tratando de actualizar las correlativas');
        console.error(error.message);
      })
    );
  }
}

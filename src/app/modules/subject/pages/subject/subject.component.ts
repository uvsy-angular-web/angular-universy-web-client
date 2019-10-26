import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../../../../core/services/subject.service';
import {Subject} from '../../../../shared/models/subject.model';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {NavigationService} from '../../../../core/services/system/navigation.service';
import {CourseService} from '../../../../core/services/course.service';
import {Course} from '../../../../shared/models/course.model';
import {ProgramService} from '../../../../core/services/program.service';
import {SubjectModalService} from '../../modals/subject-modal.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public subject = new Subject();
  public courses: Course[] = [];

  constructor(private subjectService: SubjectService,
              private navigationService: NavigationService,
              private programService: ProgramService,
              private subjectModalService: SubjectModalService,
              private courseService: CourseService,
              private notificationService: NotificationService) {
  }

  public openNewCourseModal() {
    this.notificationService.openEditNameModal(
      'Agregar Comisión',
      ButtonText.Add,
      '',
      15).subscribe(
      (courseName) => {
        this.addCourse(courseName);
      }
    );
  }

  public canModifySubject() {
    return !ProgramService.getCurrentProgram().published;
  }

  private addCourse(courseName: string) {
    this.courseService.addCourse(courseName).subscribe(
      () => {
        this.getCourses();
      },
      (error) => {
        this.notificationService.showError('Ocurrió un error tratando de agrrgar una comisión.');
        console.error(error);
      }
    );
  }

  public openDeleteModal() {
    this.notificationService.openConfirmModal(
      'Eliminar materia',
      'Se eliminara la materia y sus comisiones.',
      '¿ Esta seguro que desea eliminarla ?',
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
    this.subjectModalService.openSubjectCorrelatives(this.subject.correlatives, this.subject.level).subscribe(
      (correlatives) => {
        if (this.subject.correlatives !== correlatives) {
          this.subject.correlatives = correlatives;
          this.updateSubjectCorrelatives();
        }
      }
    );
  }

  public openEditModal() {
    this.subjectModalService.openEditSubjectModal(this.subject).subscribe(
      () => {
        this.notificationService.inform('¡Modificación con éxito!',
          'Se actualizo la materia exitosamente.');
      }, ((error) => {
        this.notificationService.showError('Ocurrio un error tratando de modificar la materia');
        console.error(error.message);
      })
    );
  }

  private updateSubjectCorrelatives() {
    this.subjectService.updateSubject(this.subject).subscribe(
      () => {
        this.notificationService.inform('¡Actualización con éxito!',
          'Se actualizo el estado de las correlativas exitosamente.');
      }, ((error) => {
        this.notificationService.showError('Ocurrio un error tratando de actualizar las correlativas');
        console.error(error.message);
      })
    );
  }
}

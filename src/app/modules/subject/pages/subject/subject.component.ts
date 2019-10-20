import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../../../../core/services/subject.service';
import {Subject} from '../../../../shared/models/subject.model';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {NavigationService} from '../../../../core/services/system/navigation.service';
import {CourseService} from '../../../../core/services/course.service';
import {Course} from '../../../../shared/models/course.model';
import {ProgramService} from '../../../../core/services/program.service';

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
    return !this.programService.getCurrentProgram().published;
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


  ngOnInit() {
    this.subject = this.subjectService.getCurrentSubject();
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
}

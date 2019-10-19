import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../../../../core/services/subject.service';
import {Subject} from '../../../../shared/models/subject.model';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {NavigationService} from '../../../../core/services/system/navigation.service';
import {CourseService} from '../../../../core/services/course.service';
import {Course} from '../../../../shared/models/course.model';

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
              private courseService: CourseService,
              private notificationService: NotificationService) {
  }

  public openNewCourseModal() {
    this.notificationService.openEditNameModal('Agregar Comision',
      ButtonText.Add).subscribe(
      (courseName) => {
        this.addCourse(courseName);
      }
    );
  }

  private addCourse(courseName: string) {
    this.courseService.addCourse(courseName).subscribe(
      () => {
        this.getCourses();
      },
      (error) => {
        this.notificationService.showError('Ocurrió un error tratando de obtener los cursos.');
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
      (confirm) => {
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

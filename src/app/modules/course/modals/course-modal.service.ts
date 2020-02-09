import {Injectable} from '@angular/core';
import {ButtonText} from '../../../shared/enums/button-text.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PeriodModalComponent} from './period-modal/period-modal.component';
import {Period} from '../../../models/period.model';
import {ScheduleModalComponent} from './schedule-modal/schedule-modal.component';
import {Schedule} from '../../../models/schedule.model';
import {Professor} from '../../../models/professor.model';
import {ProfessorModalComponent} from './professor-modal/professor-modal.component';
import {Course} from '../../../models/course.model';

import {InformationModalComponent} from '../../../modals/components/error-modal/information-modal.component';
import {CourseModalComponent} from './course-modal/course-modal.component';
import {ConfirmActionModalComponent} from '../../../modals/components/confirm-action-modal/confirm-action-modal.component';
import {Subject} from '../../../models/subject.model';
import {SubjectModalComponent} from '../../subject/modals/subject-modal/subject-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CourseModalService {

  constructor(private modalService: NgbModal) {
  }


  public openNewPeriodModal() {
    const modalRef = this.modalService.open(PeriodModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Agregar Periodo';
    modalRef.componentInstance.confirmButtonText = ButtonText.Add;
    return modalRef.componentInstance.confirmEvent;
  }

  public openEditPeriodModal(period: Period) {
    const modalRef = this.modalService.open(PeriodModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Modificar Periodo';
    modalRef.componentInstance.period = period;
    modalRef.componentInstance.confirmButtonText = ButtonText.Edit;
    return modalRef.componentInstance.confirmEvent;
  }

  public openNewScheduleModal() {
    const modalRef = this.modalService.open(ScheduleModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Agregar Horario';
    modalRef.componentInstance.confirmButtonText = ButtonText.Add;
    return modalRef.componentInstance.confirmEvent;
  }

  public openEditScheduleModal(schedule: Schedule) {
    const modalRef = this.modalService.open(ScheduleModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Modificar Horario';
    modalRef.componentInstance.schedule = schedule;
    modalRef.componentInstance.confirmButtonText = ButtonText.Edit;
    return modalRef.componentInstance.confirmEvent;
  }

  public openNewProfessorModal() {
    const modalRef = this.modalService.open(ProfessorModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Agregar Profesor';
    modalRef.componentInstance.confirmButtonText = ButtonText.Add;
    return modalRef.componentInstance.confirmEvent;
  }

  public openEditProfessorModal(professor: Professor) {
    const modalRef = this.modalService.open(ProfessorModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Modificar Profesor';
    modalRef.componentInstance.professor = professor;
    modalRef.componentInstance.confirmButtonText = ButtonText.Edit;
    return modalRef.componentInstance.confirmEvent;
  }

  showError(errorMessage: string) {
    const modalRef = this.modalService.open(InformationModalComponent);
    modalRef.componentInstance.title = '¡Ocurrió un error!';
    modalRef.componentInstance.message = errorMessage;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
  }

  inform(title: string, message: string) {
    const modalRef = this.modalService.open(InformationModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
  }

  public openEditCourseNameModal(title: string, course: Course) {
    const modalRef = this.modalService.open(CourseModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.itemText = course.name;
    modalRef.componentInstance.confirmButtonText = ButtonText.Accept;
    return modalRef.componentInstance.confirmEvent;
  }

  openConfirmModal(title: string, message = '', confirmationQuestion = '', confirmationButtonText: ButtonText) {
    const modalRef = this.modalService.open(ConfirmActionModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.confirmationQuestion = confirmationQuestion;
    modalRef.componentInstance.confirmationButtonText = confirmationButtonText;
    return modalRef.componentInstance.confirmEvent;
  }

}

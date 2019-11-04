import {Injectable} from '@angular/core';
import {ButtonText} from '../../../shared/enums/button-text.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PeriodModalComponent} from './period-modal/period-modal.component';
import {Period, Schedule} from '../../../models/period.model';
import {ScheduleModalComponent} from './schedule-modal/schedule-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CourseModalService {

  constructor(private modalService: NgbModal) { }


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
    modalRef.componentInstance.confirmButtonText = ButtonText.Edit;
    return modalRef.componentInstance.confirmEvent;
  }
  public openEditScheduleModal(schedule: Schedule) {
    const modalRef = this.modalService.open(ScheduleModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.title = 'Modificar Horario';
    modalRef.componentInstance.schedule = schedule;
    modalRef.componentInstance.confirmButtonText = ButtonText.Edit;
    return modalRef.componentInstance.confirmEvent;
  }

}

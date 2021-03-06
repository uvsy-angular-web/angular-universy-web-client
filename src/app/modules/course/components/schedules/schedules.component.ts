import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimeService} from '../../../../core/services/time/time.service';
import {CourseModalService} from '../../modals/course-modal.service';
import {Schedule} from '../../../../models/schedule.model';
import {DayService} from '../../../../core/services/time/day.service';
import {ModalService} from '../../../../modals/modal.service';
import {ButtonText} from '../../../../shared/enums/button-text.enum';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  @Input() schedules: Schedule[] = [];
  @Output() scheduleAdded: EventEmitter<Schedule> = new EventEmitter<Schedule>();
  @Output() scheduleEdited: EventEmitter<Schedule> = new EventEmitter<Schedule>();
  @Output() scheduleDeleted: EventEmitter<Schedule> = new EventEmitter<Schedule>();
  noScheduleMessage = 'El período no posee horarios todavía, haz click en Agregar Horario';
  addScheduleButtonTitle = 'Agregar Horario';

  constructor(private courseModalService: CourseModalService, private modalService: ModalService) {
  }

  openNewScheduleModal() {
    this.courseModalService.openNewScheduleModal().subscribe(
      (schedule) => this.scheduleAdded.emit(schedule)
    );
  }

  getDayOfWeek(dayOfWeek) {
    return DayService.getNameOfDay(dayOfWeek);
  }

  getHoursInReadable(hoursAndMinutes) {
    return TimeService.showTime(hoursAndMinutes);
  }

  editSchedule(schedule: Schedule) {
    this.courseModalService.openEditScheduleModal(schedule).subscribe(
      (scheduleEdited) => this.scheduleEdited.emit(scheduleEdited)
    );
  }

  deleteSchedule(schedule: Schedule) {
    this.modalService.openConfirmModal(
      'Eliminar Horario',
      'Usted está por eliminar un Horario.',
      '¿Desea continuar?',
      ButtonText.Delete
    ).subscribe(
      () => {
        this.scheduleDeleted.emit(schedule);
    }
  );
  }

  ngOnInit() {
  }

}

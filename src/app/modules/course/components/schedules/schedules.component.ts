import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from '../../../../models/period.model';
import {TimeService} from '../../../../core/services/time.service';
import {CourseModalService} from '../../modals/course-modal.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  @Input() schedules: Schedule[] = [];
  noScheduleMessage = 'El período no posee horarios todavia, haz click en Agregar Horario';
  addScheduleButtonTitle = 'Agregar Horario';

  constructor(private courseModalService: CourseModalService) {
  }

  openNewScheduleModal() {
    this.courseModalService.openNewScheduleModal().subscribe(
      (schedule) => this.schedules.push(schedule)
    );
  }

  getDayOfWeek(dayOfWeek) {
    return TimeService.getNameOfDay(dayOfWeek);
  }

  getHoursInReadable(hoursAndMinutes) {
    return TimeService.formatHoursIntoReadable(hoursAndMinutes);
  }

  ngOnInit() {
  }

}

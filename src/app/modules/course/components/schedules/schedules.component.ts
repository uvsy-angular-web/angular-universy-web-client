import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from '../../../../models/period.model';
import {TimeService} from '../../../../core/services/time.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  @Input() schedules: Schedule[] = [new Schedule('MONDAY', 1012, 1235, 'asdas')];
  noScheduleMessage = 'El período no posee horarios todavia, haz click en Agregar Horario';
  addScheduleButtonTitle = 'Agregar Horario';

  constructor() {
  }

  openNewScheduleModal() {
    alert('Esto es un schedula');
  }

  getDayOfWeek(dayOfWeek) {
    return TimeService.getNameOfDay(dayOfWeek);
  }

  getHoursInReadable(hoursAndMinutes) {
    return TimeService.formatHoursIntoReadables(hoursAndMinutes);
  }

  ngOnInit() {
  }

}

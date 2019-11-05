import {Component, Input, OnInit} from '@angular/core';
import {Period} from '../../../../models/period.model';
import {TimeService} from '../../../../core/services/time.service';
import {Professor} from '../../../../models/professor.model';
import {Schedule} from '../../../../models/schedule.model';

const ONE_ELEMENT = 1;

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {
  @Input() periods: Period[] = [];
  noPeriodMessage = 'La carrera no posee períodos todavia, haz click en Agregar Período';

  constructor() {
  }

  ngOnInit() {
  }

  public addProfessor(professor: Professor, period: Period) {
    period.professors.push(professor);
  }

  public editSchedule(schedule, period: Period) {
    const index = period.schedules.indexOf(schedule);
    period.schedules[index] = schedule;
  }

  public editProfessor(professor: Professor, period: Period) {
    const index = period.professors.indexOf(professor);
    period.professors[index] = professor;
  }

  public deleteProfessor(professor: Professor, period: Period) {
    const index = period.professors.indexOf(professor);
    period.professors.splice(index, ONE_ELEMENT);
  }

  public deleteSchedule(schedule: Schedule, period: Period) {
    const index = period.schedules.indexOf(schedule);
    period.schedules.splice(index, ONE_ELEMENT);
  }

  public addSchedule(schedule: Schedule, period: Period) {
    period.schedules.push(schedule);
  }

  public getPeriodRangeTitle(period: Period): string {
    const beginMonthName = TimeService.getNameOfMonth(period.beginMonth);
    const endMonthName = TimeService.getNameOfMonth(period.endMonth);
    return `${beginMonthName} - ${endMonthName}`;
  }

}

import {Schedule} from './schedule.model';
import {Professor} from './professor.model';

export class Period {
  public schedules: Schedule[];
  public professors: Professor[];
  public beginMonth: number;
  public endMonth: number;

  constructor(schedules: Schedule[] = [],
              professors: Professor[] = [],
              beginMonth?: number,
              endMonth?: number) {
    this.schedules = schedules;
    this.professors = professors;
    this.beginMonth = beginMonth;
    this.endMonth = endMonth;
  }
}


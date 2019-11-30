import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() {
  }

  public static formatHoursIntoReadable(hoursAndMinutes: number): string {
    const time = TimeService.getTime(hoursAndMinutes);
    return `${time.hour} : ${time.minute}`;
  }

  public static getTime(hoursAndMinutes): Time {
    const hours = Math.floor((hoursAndMinutes / 100));
    const minutes = hoursAndMinutes - hours * 100;
    return new Time(hours, minutes);
  }

  public static getTimeNumber(time: Time): number {
    return +`${time.hour}${time.minute}`;
  }

}

export class Time {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }
}

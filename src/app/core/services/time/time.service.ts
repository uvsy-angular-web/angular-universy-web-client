import { Injectable } from '@angular/core';

const INDEX_HOUR_START = 0;
const INDEX_HOUR_END = 2;
const INDEX_MINUTES_START = 2;
const INDEX_MINUTES_END = 4;

const TIME_UNIT_FILLER = 0;

export class Time {
  hour: number;
  minute: number;

  constructor(hour?: number, minute?: number) {
    this.hour = hour;
    this.minute = minute;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() {
  }

  public static areTimesValids(beginTime: Time, endTime: Time): boolean {
    if (beginTime.hour < endTime.hour) {
      return true;
    } else if (beginTime.hour === endTime.hour) {
      return beginTime.minute < endTime.minute;
    } else {
      return false;
    }
  }

  public static showTime(timeNumber: number): string {
    const time = TimeService.getTime(timeNumber);
    const hour = TimeService.timeFragmentFormatted(time.hour);
    const minute = TimeService.timeFragmentFormatted(time.minute);
    return `${hour} : ${minute}`;
  }

  public static getTime(timeNumber, defaultTime?: Time): Time {
    if (timeNumber) {
      const timeString = TimeService.timeStringFormatted(timeNumber);
      const hours = +timeString.substr(INDEX_HOUR_START, INDEX_HOUR_END);
      const minutes = +timeString.substr(INDEX_MINUTES_START, INDEX_MINUTES_END);
      return new Time(hours, minutes);
    }
    return defaultTime || new Time();
  }

  public static getTimeNumber(time: Time): number {
    const hour = TimeService.timeFragmentFormatted(time.hour);
    const minute = TimeService.timeFragmentFormatted(time.minute);
    return +`${hour}${minute}`;
  }

  private static timeFragmentFormatted(timeFragment: number): string {
    return timeFragment < 10 ? `${TIME_UNIT_FILLER}${timeFragment}` : timeFragment.toString();
  }

  private static timeStringFormatted(timeNumber: number): string {
    return timeNumber < 1000 ? `${TIME_UNIT_FILLER}${timeNumber}` : timeNumber.toString();
  }

}


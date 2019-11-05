import {Injectable} from '@angular/core';
import {Months} from '../../shared/enums/month.enum';
import {Days} from '../../shared/enums/day.enum';
import {ComboBoxItem} from '../../shared/models/combo-box.model';

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

  public static getListOfMonths(): ComboBoxItem[] {
    const months = [];
    const monthsFromEnum = Object.keys(Months);
    monthsFromEnum.forEach((month) => {
      const newMonth = new ComboBoxItem(month, TimeService.getNameOfMonth(month));
      months.push(newMonth);
    });
    return months;
  }

  public static getListOfDays(): ComboBoxItem[] {
    const days = [];
    const daysFromEnum = Object.keys(Days);
    daysFromEnum.forEach((month) => {
      const newMonth = new ComboBoxItem(month, TimeService.getNameOfDay(month));
      days.push(newMonth);
    });
    return days;
  }

  public static getNameOfMonth(month): string {
    switch (month) {
      case Months.JANUARY:
        return 'Enero';
      case Months.FEBRUARY:
        return 'Febrero';
      case Months.MARCH:
        return 'Marzo';
      case Months.APRIL:
        return 'Abril';
      case Months.MAY:
        return 'Mayo';
      case Months.JUNE:
        return 'Junio';
      case Months.JULY:
        return 'Julio';
      case Months.AUGUST:
        return 'Agosto';
      case Months.SEPTEMBER:
        return 'Septiembre';
      case Months.OCTOBER:
        return 'Octubre';
      case Months.NOVEMBER:
        return 'Noviembre';
      case Months.DECEMBER:
        return 'Diciembre';
    }
  }

  public static getNameOfDay(day): string {
    switch (day) {
      case Days.MONDAY:
        return 'Lunes';
      case Days.TUESDAY:
        return 'Martes';
      case Days.WEDNESDAY:
        return 'Miercoles';
      case Days.THURSDAY:
        return 'Jueves';
      case Days.FRIDAY:
        return 'Viernes';
      case Days.SATURDAY:
        return 'Sabado';
      case Days.SUNDAY:
        return 'Domingo';
    }
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

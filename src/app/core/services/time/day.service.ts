import {Injectable} from '@angular/core';
import {Days} from '../../../shared/enums/day.enum';
import {ComboBoxItem} from '../../../shared/models/combo-box.model';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor() {
  }

  public static getListOfDays(): ComboBoxItem[] {
    const days = [];
    const daysFromEnum = Object.keys(Days);
    daysFromEnum.forEach((month) => {
      const newMonth = new ComboBoxItem(month, DayService.getNameOfDay(month));
      days.push(newMonth);
    });
    return days;
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


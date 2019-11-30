import {Injectable} from '@angular/core';
import {Months} from '../../../shared/enums/month.enum';
import {ComboBoxItem} from '../../../shared/models/combo-box.model';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor() {
  }

  public static getListOfMonths(): ComboBoxItem[] {
    const months = [];
    const monthsFromEnum = Object.keys(Months);
    monthsFromEnum.forEach((month) => {
      const newMonth = new ComboBoxItem(month, MonthService.getNameOfMonth(month));
      months.push(newMonth);
    });
    return months;
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
}

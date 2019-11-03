import {Injectable} from '@angular/core';
import {Months} from '../../shared/enums/month.enum';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() {
  }

  public static getListOfMonths(): Month[] {
    const months = [];
    for (let i = Months.JANUARY; i <= Months.DECEMBER; i++) {
      const month = new Month(i, TimeService.getNameOfMonth(i));
      months.push(month);
    }
    return months;
  }

  private static getNameOfMonth(month: Months): string {
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

export class Month {
  id: Months;
  name: string;

  constructor(id: Months, name: string) {
    this.id = id;
    this.name = name;
  }
}

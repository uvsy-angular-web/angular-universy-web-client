import { CareerStat } from './career-stat.model';

export class InstitutionReport {
  rating: number;
  careers: CareerStat[];

  constructor(rating?: number, careers?: CareerStat[]) {
    this.rating = rating;
    this.careers = careers;
  }
}

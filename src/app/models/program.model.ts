import { CareerKey } from './carreer-key.model';

export class Program {
  careerKey: CareerKey;
  uuid: string;
  name: string;
  validFrom: string;
  validTo: string;
  published: boolean;
  amountOfHours: number;
  amountOfPoints: number;
  amountOfSubjects: number;

  constructor(
    careerKey?: CareerKey,
    uuid?: string,
    name?: string,
    validFrom?: string,
    validTo?: string,
    published?: boolean,
    amountOfHours?: number,
    amountOfPoints?: number,
    amountOfSubjects?: number) {
      this.careerKey = careerKey;
      this.uuid = uuid;
      this.name = name;
      this.validFrom = validFrom;
      this.validTo = validTo;
      this.published = published;
      this.amountOfHours = amountOfHours;
      this.amountOfPoints = amountOfPoints;
      this.amountOfSubjects = amountOfSubjects;
  }
}

import { CareerKey } from './carreer-key.model';
import { Correlative } from './correlative.model';

export class Subject {
  id: string;
  programCode: string;
  subjectCode: string;
  name: string;
  level: number;
  correlatives: Correlative[];
  careerKey: CareerKey;
  isOptative: boolean;
  hours: number;
  points: number;

  constructor(
    id?: string,
    programCode?: string,
    subjectCode?: string,
    name?: string,
    level?: number,
    correlatives?: Correlative[],
    careerKey?: CareerKey,
    isOptative?: boolean,
    hours?: number,
    points?: number,
  ) {
    this.id = id;
    this.programCode = programCode;
    this.subjectCode = subjectCode;
    this.name = name;
    this.level = level;
    this.correlatives = correlatives;
    this.careerKey = careerKey;
    this.isOptative = isOptative;
    this.hours = hours;
    this.points = points;
  }
}



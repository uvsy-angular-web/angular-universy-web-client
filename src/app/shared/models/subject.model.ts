import {CareerKey} from './carreer-key.model';

export class Subject {
  programCode: string;
  subjectCode: string;
  name: string;
  level: number;
  correlatives: Correlative[];
  careerKey: CareerKey;

  constructor(programCode?: string,
              subjectCode?: string,
              name?: string,
              level?: number,
              correlatives?: Correlative[],
              careerKey?: CareerKey) {
    this.programCode = programCode;
    this.subjectCode = subjectCode;
    this.name = name;
    this.level = level;
    this.correlatives = correlatives;
    this.careerKey = careerKey;
  }
}

export class Correlative {
  subjectCode: string;
  name: string;
  correlativeRestriction: string;
  correlativeCondition: string;

  constructor(subjectCode?: string, name?: string, correlativeRestriction?: string, correlativeCondition?: string) {
    this.subjectCode = subjectCode;
    this.name = name;
    this.correlativeRestriction = correlativeRestriction;
    this.correlativeCondition = correlativeCondition;
  }
}


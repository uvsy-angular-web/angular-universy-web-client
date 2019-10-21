import {CareerKey} from './carreer-key.model';
import {Correlative} from './correlative.modal';

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



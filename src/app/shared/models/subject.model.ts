export class Subject {
  planCode: string;
  subjectCode: number;
  level: string;
  correlatives: Correlative[];

  constructor(planCode?: string, subjectCode?: number, level?: string, correlatives?: Correlative[]) {
    this.planCode = planCode;
    this.subjectCode = subjectCode;
    this.level = level;
    this.correlatives = correlatives;
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


export class Correlative {
  level: number;
  subjectCode: string;
  correlativeRestriction: CorrelativeRestriction;
  correlativeCondition: CorrelativeCondition;

  constructor(level?: number, subjectCode?: string, correlativeRestriction?: CorrelativeRestriction, correlativeCondition?: CorrelativeCondition) {
    this.level = level;
    this.subjectCode = subjectCode;
    this.correlativeRestriction = correlativeRestriction;
    this.correlativeCondition = correlativeCondition;
  }
}

export enum CorrelativeCondition {
  REGULAR = 'REGULAR',
  APPROVED = 'APPROVED'
}

export enum CorrelativeRestriction {
  TO_TAKE = 'TO_TAKE',
  TO_APPROVE = 'TO_APPROVE'
}

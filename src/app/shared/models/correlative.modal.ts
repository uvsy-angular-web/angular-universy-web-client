export class Correlative {
  subjectCode: string;
  correlativeRestriction: string;
  correlativeCondition: string;

  constructor(subjectCode?: string, correlativeRestriction?: string, correlativeCondition?: string) {
    this.subjectCode = subjectCode;
    this.correlativeRestriction = correlativeRestriction;
    this.correlativeCondition = correlativeCondition;
  }
}
export enum CorrelativeState {
  TO_TAKE_REGULAR = 1,
  TO_TAKE_APPROVED = 2,
  TO_APPROVE = 3,
  NO_CORRELATIVE = 4,
}

export enum CorrelativeCondition {
  REGULAR = 'REGULAR',
  APPROVED = 'APPROVED'
}

export enum CorrelativeRestriction {
  TO_TAKE = 'TO_TAKE',
  TO_APPROVE = 'TO_APPROVE'
}

export class Correlative {
  name: string;
  subjectCode: string;
  correlativeRestriction: CorrelativeRestriction;
  correlativeCondition: CorrelativeCondition;

  constructor(name?: string,
              subjectCode?: string,
              correlativeRestriction?: CorrelativeRestriction,
              correlativeCondition?: CorrelativeCondition) {
    this.name = name;
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

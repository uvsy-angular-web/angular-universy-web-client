export class Correlative {
  id: string;
  correlativeSubjectId: string;
  correlativeCondition: CorrelativeCondition;
  correlativeRestriction: CorrelativeRestriction;
  createdAt: number;
  updatedAt: number;


  constructor(
    id?: string,
    correlativeSubjectId?: string,
    correlativeCondition?: CorrelativeCondition,
    correlativeRestriction?: CorrelativeRestriction,
    createdAt?: number,
    updatedAt?: number
  ) {
    this.id = id;
    this.correlativeSubjectId = correlativeSubjectId;
    this.correlativeCondition = correlativeCondition;
    this.correlativeRestriction = correlativeRestriction;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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

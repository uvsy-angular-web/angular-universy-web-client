import { Period } from './period.model';

export class Course {

  public subjectId: string;
  public commissionId: string;
  public courseId: string;
  public periods: Period[];
  public active: boolean;
  public createdAt: number;
  public updatedAt: number;

  constructor(
    subjectId?: string,
    commissionId?: string,
    courseId?: string,
    periods?: Period[],
    active?: boolean,
    createdAt?: number,
    updatedAt?: number
    ) {
    this.subjectId = subjectId;
    this.commissionId = commissionId;
    this.courseId = courseId;
    this.periods = periods;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}


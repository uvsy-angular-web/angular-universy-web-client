import {Period} from './period.model';

export class Course {
  public subjectCode: string;
  public courseCode: string;
  public name: string;
  public periods: Period[];
  public active: boolean;

  constructor(subjectCode?: string,
              courseCode?: string,
              name?: string,
              periods?: Period[],
              active?: boolean) {
    this.subjectCode = subjectCode;
    this.courseCode = courseCode;
    this.name = name;
    this.periods = periods;
    this.active = active;
  }
}


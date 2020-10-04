import { CourseStat } from './course-stat.model';

export class SubjectReport {
  public courses: CourseStat[];

  constructor(courses?: CourseStat[],) {
    this.courses = courses;
  }
}

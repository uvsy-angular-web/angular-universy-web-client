export class SubjectReport {
  courses: CourseStat[];

  constructor(courses?: CourseStat[],) {
    this.courses = courses;
  }
}

export class CourseStat {
  courseId: string;
  commissionName: string;
  rating: number;
  difficulty: number;
  wouldTakeAgain: number;

  constructor(
    courseId?: string,
    commissionName?: string,
    rating?: number,
    difficulty?: number,
    wouldTakeAgain?: number,
  ) {
    this.courseId = courseId;
    this.commissionName = commissionName;
    this.rating = rating;
    this.difficulty = difficulty;
    this.wouldTakeAgain = wouldTakeAgain;
  }
}

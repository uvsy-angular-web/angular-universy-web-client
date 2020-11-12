export class CourseStat {
  public courseId: string;
  public commissionName: string;
  public rating: number;
  public difficulty: number;
  public wouldTakeAgain: number;

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

  public static orderByAscendingCommissionName(a: CourseStat, b: CourseStat) {
    const A_GREATER_B = 1;
    const A_LESS_B = -1;
    const A_EQUAL_B = 0;

    if (a.commissionName < b.commissionName) {
      return A_LESS_B;
    }
    if (a.commissionName > b.commissionName) {
      return A_GREATER_B;
    }
    return A_EQUAL_B;
  }
}

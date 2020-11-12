const RATING_PERCENTAGE_MULTIPLIER = 20;

export class SubjectStat {
  public subjectId: string;
  public subjectName: string;
  public rating: number;
  public ratingPercentage: number;
  public optative: boolean;
  public level: number;

  constructor(
    subjectId?: string,
    subjectName?: string,
    rating?: number,
    optative?: boolean,
    level?: number,
  ) {
    this.subjectId = subjectId;
    this.subjectName = subjectName;
    this.rating = rating;
    this.ratingPercentage = rating * RATING_PERCENTAGE_MULTIPLIER;
    this.optative = optative;
    this.level = level;
  }
}

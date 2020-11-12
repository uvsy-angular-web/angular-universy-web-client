export class ProgramStat {
  public programId: string;
  public programName: string;
  public rating: number;
  public amountOfOptatives: number;
  public amountOfSubjects: number;

  constructor(
    programId?: string,
    programName?: string,
    rating?: number,
    amountOfOptatives?: number,
    amountOfSubjects?: number,
  ) {
    this.programId = programId;
    this.programName = programName;
    this.rating = rating;
    this.amountOfOptatives = amountOfOptatives;
    this.amountOfSubjects = amountOfSubjects;
  }
}

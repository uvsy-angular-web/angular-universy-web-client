import { SubjectStat } from './subject-stat.model';

export class ProgramReport {
  public programId: string;
  public programName: string;
  public rating: number;
  public subjects: SubjectStat[];

  constructor(
    programId?: string,
    programName?: string,
    rating?: number,
    subjects?: SubjectStat[],
  ) {
    this.programId = programId;
    this.programName = programName;
    this.rating = rating;
    this.subjects = subjects;
  }
}

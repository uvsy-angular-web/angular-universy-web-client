export class ProgramReport {
  programId: string;
  programName: string;
  rating: number;
  subjects: SubjectStat[];

  constructor(
    programId?: string,
    programName?: string,
    rating?: number,
    subjects?: SubjectStat[],) {
      this.programId = programId;
      this.programName = programName;
      this.rating = rating;
      this.subjects = subjects;
  }
}

export class SubjectStat {
  subjectId: string;
  subjectName: string;
  rating: number;
  optative: boolean;
  level: number;

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
      this.optative = optative;
      this.level = level; 
  }
}
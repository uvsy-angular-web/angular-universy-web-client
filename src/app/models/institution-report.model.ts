export class InstitutionReport {
  rating: number;
  careers: CareerStat[];

  constructor(rating?: number, careers?: CareerStat[]) {
    this.rating = rating;
    this.careers = careers;
  }
}

export class CareerStat {
  careerId: string;
  careerName: string;
  programs: ProgramStat[];

  constructor(
    careerId?: string,
    careerName?: string,
    programs?: ProgramStat[]
  ) {
    this.careerId = careerId;
    this.careerName = careerName;
    this.programs = programs;
  }
}


export class ProgramStat {
  programId: string;
  programName: string;
  rating: number;
  amountOfOptatives: number;
  amountOfSubjects: number;

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

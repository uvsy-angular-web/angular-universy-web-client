import { ProgramStat } from './program-stat.model';

export class CareerStat {
  public careerId: string;
  public careerName: string;
  public programs: ProgramStat[];

  constructor(
    careerId?: string,
    careerName?: string,
    programs?: ProgramStat[],
  ) {
    this.careerId = careerId;
    this.careerName = careerName;
    this.programs = programs;
  }
}

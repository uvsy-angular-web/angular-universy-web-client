export class OptativeRequirement {
     amountOfHours: number;
     amountOfPoints: number;
     amountOfSubjects: number;

     constructor(
        amountOfHours?: number,
        amountOfPoints?: number,
        amountOfSubjects?: number) {
      this.amountOfHours = amountOfHours;
      this.amountOfPoints = amountOfPoints;
      this.amountOfSubjects = amountOfSubjects;
    }
  }
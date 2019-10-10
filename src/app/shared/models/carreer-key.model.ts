export class CareerKey {
  institutionKey: string;
  careerCode: string;

  constructor(institutionKey?: string, careerCode?: string) {
    this.institutionKey = institutionKey;
    this.careerCode = careerCode;
  }
}

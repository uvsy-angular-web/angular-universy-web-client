export class Program {
  id: string;
  name: string;
  careerId: string;
  validFrom: number;
  validTo: number;
  hours: number;
  points: number;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  deactivatedAt: number;

  constructor(
    id?: string,
    name?: string,
    careerId?: string,
    validFrom?: number,
    validTo?: number,
    hours?: number,
    points?: number,
    active?: boolean,
    createdAt?: number,
    updatedAt?: number,
    deactivatedAt?: number) {
      this.id = id;
      this.name = name;
      this.careerId = careerId;
      this.validFrom = validFrom;
      this.validTo = validTo;
      this.hours = hours;
      this.points = points;
      this.active = active;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deactivatedAt = deactivatedAt;
  }
}

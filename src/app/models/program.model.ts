export class Program {
  id: string;
  name: string;
  careerId: string;
  yearFrom: number;
  yearTo: number;
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
    yearFrom?: number,
    yearTo?: number,
    hours?: number,
    points?: number,
    active?: boolean,
    createdAt?: number,
    updatedAt?: number,
    deactivatedAt?: number) {
      this.id = id;
      this.name = name;
      this.careerId = careerId;
      this.yearFrom = yearFrom;
      this.yearTo = yearTo;
      this.hours = hours;
      this.points = points;
      this.active = active;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deactivatedAt = deactivatedAt;
  }
}

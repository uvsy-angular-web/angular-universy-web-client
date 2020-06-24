import { Correlative } from './correlative.model';

export class Subject {
  id: string;
  name: string;
  codename: string;
  programId: string;
  hours: number;
  points: number;
  level: number;
  active: boolean;
  optative: boolean;
  correlatives: Correlative[];
  createdAt: number;
  updatedAt: number;

  constructor(
    id?: string,
    name?: string,
    codename?: string,
    programId?: string,
    hours?: number,
    points?: number,
    level?: number,
    active?: boolean,
    optative?: boolean,
    correlatives?: Correlative[],
    createdAt?: number,
    updatedAt?: number,
  ) {
    this.id = id;
    this.name = name;
    this.codename = codename;
    this.programId = programId;
    this.hours = hours;
    this.points = points;
    this.level = level;
    this.active = active;
    this.optative = optative;
    this.correlatives = correlatives;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}



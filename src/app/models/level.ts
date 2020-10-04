import { Subject } from './subject.model';
import { Commission } from './commission.model';
import { range } from 'rxjs';

export class Level {
  levelNumber: number;
  subjects: Subject[];
  commissions: Commission[];

  constructor(
    levelNumber?: number,
    subjects?: Subject[],
    commissions?: Commission[]) {
    this.levelNumber = levelNumber;
    this.subjects = subjects;
    this.commissions = commissions;
  }
}

const generateArrayOfLevels = (minLevel: number, maxLevel: number) => {
  return Array.from({ length: maxLevel }, (_, i) => i + minLevel);
}

export const AVAIABLE_LEVELS = generateArrayOfLevels(1, 5);


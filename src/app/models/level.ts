import { Subject } from './subject.model';
import { Commission } from './commission.model';

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

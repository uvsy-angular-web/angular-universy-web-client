import { CareerKey } from './carreer-key.model';
import { OptativeRequirement } from './optative-requirement.model';
const DEFAULT_VALUE_REQUIREMENT_AMOUNT = 0;

export class Program {
  careerKey: CareerKey;
  uuid: string;
  name: string;
  validFrom: string;
  validTo: string;
  published: boolean;
  optativeRequirement: OptativeRequirement;

  constructor(
    careerKey?: CareerKey,
    uuid?: string,
    name?: string,
    validFrom?: string,
    validTo?: string,
    published?: boolean,
    optativeRequirement?: OptativeRequirement) {
    this.careerKey = careerKey;
    this.uuid = uuid;
    this.name = name;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.published = published;
    this.optativeRequirement = optativeRequirement;
  }

  requiresOptatives(): boolean {
    return this.optativeRequirement != null;
  }

  getAmountOfHours(): number {
    return this._getOptativeRequirementValue('amountOfHours');
  }

  getAmountOfPoints(): number {
    return this._getOptativeRequirementValue('amountOfPoints');
  }

  getAmountOfSubjects(): number {
    return this._getOptativeRequirementValue('amountOfSubjects');
  }

  private _getOptativeRequirementValue(attributeName: string): number {
    if (this.requiresOptatives()) {
      return this.optativeRequirement[attributeName];
    }
    return DEFAULT_VALUE_REQUIREMENT_AMOUNT;
  }
}

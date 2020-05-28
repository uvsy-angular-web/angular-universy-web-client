import { CareerKey } from './carreer-key.model';
import { OptativeRequirement } from './optative-requirement.model';

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
    this.optativeRequirement = optativeRequirement ? optativeRequirement : new OptativeRequirement();
  }
}

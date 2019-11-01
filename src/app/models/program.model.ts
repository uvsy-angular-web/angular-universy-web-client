import {CareerKey} from './carreer-key.model';

export class Program {
  careerKey: CareerKey;
  uuid: string;
  name: string;
  validFrom: string;
  validTo: string;
  published: boolean;

  constructor(careerKey?: CareerKey, uuid?: string, name?: string, validFrom?: string, validTo?: string, published?: boolean) {
    this.careerKey = careerKey;
    this.uuid = uuid;
    this.name = name;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.published = published;
  }
}

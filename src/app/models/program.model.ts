import {CareerKey} from './carreer-key.model';

export class Program {
  carrerKey: CareerKey;
  uuid: string;
  name: string;
  validFrom: string;
  validTo: string;
  published: boolean;

  constructor(carrerKey?: CareerKey, uuid?: string, name?: string, validFrom?: string, validTo?: string, published?: boolean) {
    this.carrerKey = carrerKey;
    this.uuid = uuid;
    this.name = name;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.published = published;
  }
}

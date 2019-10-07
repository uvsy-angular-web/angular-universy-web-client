import {CareerKey} from './carreer-key.model';

export class Career {
  careerKey: CareerKey;
  careerName: string;
  active: boolean;

  constructor(careerKey?: CareerKey, careerName?: string, active?: boolean) {
    this.careerKey = careerKey;
    this.careerName = careerName;
    this.active = active;
  }
}

export class Institution {
  institutionKey: string;
  name: string;
  careers: Career[];

  constructor(institutionKey?: string, name?: string, careers?: Career[]) {
    this.institutionKey = institutionKey;
    this.name = name;
    this.careers = careers;
  }
}

export class Institutions {
  institutions: Institution[];

  constructor(institutions?: Institution[]) {
    this.institutions = institutions;
  }
}


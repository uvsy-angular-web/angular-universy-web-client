export class Institution {
  id: string;
  name: string;
  codename: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(id?: string, name?: string, codename?: string, active?: boolean, createdAt?: number, updatedAt?: number) {
    this.id = id;
    this.name = name;
    this.codename = codename;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}


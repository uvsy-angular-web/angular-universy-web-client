export class Commission {
    id: string;
    name: string;
    level: number;
    active: boolean;
    createdAt: number;
    updatedAt: number;

    constructor(
        id?: string,
        name?: string,
        level?: number,
        active?: boolean,
        createdAt?: number,
        updatedAt?: number
    ) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


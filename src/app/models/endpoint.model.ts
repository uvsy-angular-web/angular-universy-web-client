export class Endpoint {
    base: string;
    parent: string;

    constructor(base: string, parent?: string) {
        this.base = base;
        this.parent = parent;
    }
}

export enum EndpointSuffix {
    DEFAULT = '',
    ACTIVATE = 'activate',
    REPORT = 'report'
}

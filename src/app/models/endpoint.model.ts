export class Endpoint {
    public base: string;
    public parent: string;

    constructor(base: string, parent?: string) {
        this.base = base;
        this.parent = parent;
    }
}

export enum EndpointSuffix {
    DEFAULT = '',
    ACTIVATE = 'activate',
    REPORT = 'report',
}

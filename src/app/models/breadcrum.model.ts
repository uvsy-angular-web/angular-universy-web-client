export class BreadCrum {
    order: number;
    location: string;
    label: string;
    active: boolean;
    value: string;

    constructor(
        order: number,
        location: string,
        label: string,
        active = false,
        value = '',
    ) {
        this.order = order;
        this.location = location;
        this.label = label;
        this.active = active;
        this.value = value;
    }
}
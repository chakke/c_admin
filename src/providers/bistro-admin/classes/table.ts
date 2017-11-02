export class Table {
    id: number;
    name: string;
    minCapacity: number;
    maxCapacity: number;
    status: number;
    constructor(id: number, name: string, minCapacity: number, maxCapacity: number, status: number) {
        this.id = id;
        this.name = name;
        this.minCapacity = minCapacity;
        this.maxCapacity = maxCapacity;
        this.status = status;
    }
}
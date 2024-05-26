export class Sezon {
    id!: number;
    name!: string;
    startDate!: Date;
    endDate!: Date;
    honey!: number;
    syrup!: number;

    constructor(name: string, startDate: Date, endDate: Date, honey: number, syrup: number) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.honey = honey;
        this.syrup = syrup;
    }

}
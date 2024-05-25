export class Sezon {
    id!: number;
    name!: string;
    startDate!: Date;
    endDate!: Date;
    honey!: number;
    syroup!: number;

    constructor(name: string, startDate: Date, endDate: Date, honey: number, syroup: number) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.honey = honey;
        this.syroup = syroup;
    }

}
export class Sezon {
    id!: number;
    name!: string;
    startDate!: Date;
    startHives!: number;
    endDate!: Date;
    endHives!: number;
    honey!: number;
    syroup!: number;
    
    constructor(id: number, name: string, startDate: Date, startHives: number, endDate: Date, endHives: number, honey: number, syroup: number) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.startHives = startHives;
        this.endDate = endDate;
        this.endHives = endHives;
        this.honey = honey;
        this.syroup = syroup;
    }
}
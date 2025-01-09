export class Note {
    id!: number;
    date!: Date;
    text!: string;
    hiveId!: number;
    honey!: number;
    syroup!: number;

    constructor(id: number, date: Date, text: string, hiveId: number, honey: number, syroup: number) {
        this.id = id;
        this.date = date;
        this.text = text;
        this.hiveId = hiveId;
        this.honey = honey;
        this.syroup = syroup;
    }

}
//Work is note without id
export class Work{
    date!: Date;
    name!: string;
    text!: string;
    hiveId!: number;
    honey!: number;
    syrup!: number;

    constructor(date: Date, name:string, text: string, hiveId: number, honey: number, syrup: number) {
        this.date = date;
        this.name = name;
        this.text = text;
        this.hiveId = hiveId;
        this.honey = honey;
        this.syrup = syrup;
    }
}
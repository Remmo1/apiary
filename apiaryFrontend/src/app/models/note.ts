export class Note {
    id!: number;
    date!: Date;
    text!: string;
    hiveId!: number;
    honey!: number;
    syroup!: number;
    
    constructor(id: number, date: Date, text: string, hiveId: number) {
        this.id = id;
        this.date = date;
        this.text = text;
        this.hiveId = hiveId;
    }
}
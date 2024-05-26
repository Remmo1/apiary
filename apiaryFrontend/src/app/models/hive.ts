import { Corp } from "./corp";
import { Note } from "./note";

export class Hive {
    id!: number;
    name!: string;
    queen!: string; 
    corps!: Corp[];
    notes!: Note[];

    constructor(name: string, queen: string, corps: Corp[], notes: Note[]) {
        this.name = name;
        this.queen = queen;
        this.corps = corps;
        this.notes = notes;
    }
}
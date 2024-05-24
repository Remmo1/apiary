import { Corp } from "./corp";
import { Note } from "./note";

export class Hive {
    id!: number;
    name!: string;
    queen!: string; 
    corps!: Corp[];
    notes!: Note[];
}
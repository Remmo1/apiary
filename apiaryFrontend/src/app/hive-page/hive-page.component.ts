import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FramesIndicatorComponent } from "../frames-indicator/frames-indicator.component";
import { Corp } from '../models/corp';
import { Note } from '../models/note';

@Component({
    selector: 'app-hive-page',
    standalone: true,
    templateUrl: './hive-page.component.html',
    styleUrls: ['./hive-page.component.scss'],
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, FramesIndicatorComponent]
})
export class HivePageComponent implements OnInit{



  hiveId = 1;
  corpsCount = 0;
  corps: Corp[] = [];
  notes: Note[] = [];
  dataSource: Note[] = [];
  tableColumns = ['date', 'note', 'options'];
  constructor(private router: Router) { }

  ngOnInit(): void {
    //rządanie do backendu
    this.hiveId = Number(this.router.url.split('/')[2]);
    this.corps = [new Corp(1, 1, 6, 16, 4, this.hiveId), new Corp(2, 6, 0, 9, 2, this.hiveId),new Corp(3, 1, 6, 16, 4, this.hiveId),];
    this.corpsCount = this.corps.length;
    this.notes = [new Note(1, new Date(), 'First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note First note '
    , this.hiveId), new Note(2, new Date(), 'Second note', this.hiveId)];
    this.dataSource = this.notes;  }
  
  goToHivesPage() 
  {
    this.router.navigate(['/hives']);
  }

  addNote() 
  {
    throw new Error('Method not implemented.');
  }

  addCorp() 
  {
    this.corps.push(new Corp(this.corpsCount + 1, 0, 0, 0, 0, this.hiveId));
    this.corpsCount++;
  }

  deleteCorp(arg0: number)
  {
    this.corps = this.corps.filter(corp => corp.id !== arg0);
  }

  onValueChange($event: number) 
  {
    throw new Error('Method not implemented.');
  }

  saveHive() 
  {
    //rządaie do backendu
  }
}

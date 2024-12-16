import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FramesIndicatorComponent } from "../frames-indicator/frames-indicator.component";
import { Corp } from '../models/corp';
import { Note } from '../models/note';
import { Hive } from '../models/hive';
import { HivesService } from '../services/hives.service';
import { AddNoteModalComponent } from '../add-note-modal/add-note-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-hive-page',
    standalone: true,
    templateUrl: './hive-page.component.html',
    styleUrls: ['./hive-page.component.scss'],
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, 
      FramesIndicatorComponent, MatDialogModule,MatNativeDateModule, FormsModule]
})
export class HivePageComponent implements OnInit{
  hive: Hive = {id: 0, name: '', queen: '', corps: [], notes: []};
  corpsCount = 0;
  notesCount = 0;
  corps: Corp[] = [];
  dataSource: Note[] = [];
  tableColumns = ['date', 'note', 'options'];
  constructor(private router: Router, private hivesService: HivesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.hivesService.getHive(Number(this.router.url.split('/')[2])).subscribe(hive => {
      this.hive = hive;
      this.corps = hive.corps;
      this.corpsCount = this.corps.length;
      this.dataSource = hive.notes;
      this.notesCount = this.dataSource.length;
    });
}
  
  goToHivesPage() 
  {
    this.router.navigate(['/hives']);
  }

  addNote() 
  {
    const dialogRef = this.dialog.open(AddNoteModalComponent, {
      width: '300px',
      data: { syroup: 0, honey: 0, date: new Date()}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(this.dataSource){
        this.dataSource.push(new Note(this.notesCount, result.date, result.note, this.hive.id, result.honey, result.syroup));
        this.dataSource = [...this.dataSource];
        this.notesCount++;
      }
      else{
        console.log(result);
      }
      });

  }

  deleteNote(arg0: number) 
  {
    this.dataSource = this.dataSource.filter(note => note.id !== arg0);
    this.dataSource = [...this.dataSource];
  }

  editNote(arg0: number) 
  {
    this.router.navigate(['/work', arg0]);
  }

  addCorp() 
  {
    this.corps.push(new Corp(this.corpsCount + 1, 0, 0, 0, 0, this.hive.id));
    this.corpsCount++;
  }

  deleteCorp(arg0: number)
  {
    this.corps = this.corps.filter(corp => corp.id !== arg0);
  }

  saveHive() 
  {
    this.hive.corps = this.corps;
    this.hive.notes = this.dataSource;
    this.hivesService.updateHive(this.hive.id, this.hive).subscribe(result => {console.log(result);} );
    this.router.navigate(['/hives']);
  }
}

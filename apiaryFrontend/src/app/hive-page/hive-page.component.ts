import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FramesIndicatorComponent } from "../frames-indicator/frames-indicator.component";
import { Corp } from '../models/corp';
import { Note, Work } from '../models/note';
import { Hive } from '../models/hive';
import { HivesService } from '../services/hives.service';
import { AddNoteModalComponent } from '../add-note-modal/add-note-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { WorksService } from '../services/works.service';

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
  constructor(private router: Router, private hivesService: HivesService, public dialog: MatDialog, private worksService : WorksService) { }

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
      data: { date: new Date(), note: '', honey: 0, syroup: 0,}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(this.dataSource){
          this.worksService.createWork(new Work(result.date, ":)", result.note, this.hive.id, result.honey, result.syroup)).subscribe(result => {
            if(result instanceof Error){
              console.log(result);
            }
            else{
              this.dataSource.push(result);
              this.dataSource = [...this.dataSource];
            }
    
          });
        }
      }
      });
    

  }

  deleteNote(id: number) 
  {
    this.worksService.deleteWork(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(work => work.id !== id);
      this.dataSource = [...this.dataSource];
      //this.notes = this.notes.filter(work => work.id !== id);;
    });
  }

  editNote(arg0: number) 
  {
    this.router.navigate(['/work', arg0], {queryParams:{backPath: this.router.url}});
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
    this.hive.name = this.hive.name;
    this.hive.queen = this.hive.queen;
    this.hive.corps = this.corps;
    this.hive.notes = this.dataSource;
    this.hivesService.updateHive(this.hive.id, this.hive).subscribe(result => {console.log(result);} );
    this.router.navigate(['/hives']);
  }
}

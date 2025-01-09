import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorksService } from '../services/works.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AddWorkModalComponent } from '../add-work-modal/add-work-modal.component';
import { Note, Work } from '../models/note';
import { MatNativeDateModule } from '@angular/material/core';
import { HelpModalWorksComponent } from '../help-modal-works/help-modal-works.component';
import { HivesService } from '../services/hives.service';
import { Hive } from '../models/hive';

@Component({
  selector: 'app-works-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatNativeDateModule],
  templateUrl: './works-page.component.html',
  styleUrls: ['./works-page.component.scss']
})
export class WorksPageComponent  implements OnInit{
constructor(private router: Router, public dialog: MatDialog, private worksService : WorksService, private hivesService : HivesService) { }

  notes : Note[] = [];
  dataSource : Note[] = [];
  tableColumns = ['date', 'hiveId', 'text', 'options'];
  hivesNames: Map<number, string> = new Map();
  hives: Hive[] = [];

  ngOnInit(): void 
  {
    this.worksService.getWorks().subscribe(works => {
      this.dataSource = works;
      this.notes = works;
    });

    this.hivesService.getHives().subscribe(hives => {
      this.hives = hives;
      this.hivesNames.set(-1, 'Praca ogólna');
      hives.forEach(hive => {
        this.hivesNames.set(hive.id, hive.name);
      });
    });
  }

  getHiveName(id: number) : string {
    return this.hivesNames.get(id) || 'Praca ogólna';
  }

  goToStartPage() 
  {
    this.router.navigate(['/home']);
  }

   openAddWorkDialog() : void {
      const dialogRef = this.dialog.open(AddWorkModalComponent, {
        width: '300px',
        data: {date: new Date(), note: '', hiveId: '', honey: '', syroup: '', hivesNames: this.hivesNames, hives: this.hives},
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if(this.dataSource){
        this.worksService.createWork(new Work(result.date, ":)", result.note, result.hiveId, result.honey, result.syroup)).subscribe(result => {
          if(result instanceof Error){
            console.log(result);
          }
          else{
            this.dataSource.push(result);
            this.dataSource = [...this.dataSource];
          }
  
        });
      }
      });
  
    }

    deleteWork(id: number) 
    {
      this.worksService.deleteWork(id).subscribe(() => {
        this.dataSource = this.dataSource.filter(work => work.id !== id);
        this.dataSource = [...this.dataSource];
        this.notes = this.notes.filter(work => work.id !== id);;
      });
    }
  
  
    editWork(id: number)
    {
      this.router.navigate(['/work', id], {queryParams:{backPath: this.router.url}});
    }

    
  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if(searchTerm !== '') {
    const term = searchTerm.toLowerCase();
    this.dataSource = this.notes.filter(item =>
      this.getHiveName(item.hiveId).toLowerCase().includes(term)
    );
    }
    else
    {
      this.dataSource = this.notes;
    }
  }

     openHelpDialog() : void {
        const dialogRef = this.dialog.open(HelpModalWorksComponent, {
          width: '500px',
        });
      }
    
}

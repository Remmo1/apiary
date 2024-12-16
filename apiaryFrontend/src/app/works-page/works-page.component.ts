import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorksService } from '../services/works.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AddWorkModalComponent } from '../add-work-modal/add-work-modal.component';
import { Note } from '../models/note';
import { MatNativeDateModule } from '@angular/material/core';
import { HelpModalWorksComponent } from '../help-modal-works/help-modal-works.component';

@Component({
  selector: 'app-works-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatNativeDateModule],
  templateUrl: './works-page.component.html',
  styleUrls: ['./works-page.component.scss']
})
export class WorksPageComponent  implements OnInit{
constructor(private router: Router, public dialog: MatDialog, private worksService : WorksService) { }

  works : Note[] = [];
  dataSource : Note[] = [];
  tableColumns = ['date', 'hiveId', 'text'];
  ngOnInit(): void 
  {
    this.worksService.getWorks().subscribe(works => {
      this.dataSource = works;
      this.works = works;
      //this.dataSource.push( new Note( 1, new Date(), 'fgddryh', 1, 1, 1))
    });
  }

  goToStartPage() 
  {
    this.router.navigate(['/home']);
  }

   openAddWorkDialog() : void {
      const dialogRef = this.dialog.open(AddWorkModalComponent, {
        width: '300px',
        data: {date: '', text: '', hiveId: '', honey: '', syroup: '' }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        this.worksService.createWork(new Note( 1, result.date, result.text, result.hiveId, result.honey, result.syroup)).subscribe(result => {
          if(result instanceof Error){
            console.log(result);
          }
          else{
            this.dataSource.push(result);
            this.dataSource = [...this.dataSource];
          }
  
        });
      });
    }

    deleteWork(id: number) 
    {
      this.worksService.deleteWork(id).subscribe(() => {
        this.dataSource = this.dataSource.filter(work => work.id !== id);
        this.dataSource = [...this.dataSource];
        this.works = this.works.filter(work => work.id !== id);;
      });
    }
  
  
    editWork(id: number)
    {
      this.router.navigate(['/works', id]);
    }

    
  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if(searchTerm !== '') {
    const term = searchTerm.toLowerCase();
    this.dataSource = this.works.filter(item =>
      item.hiveId.toString().includes(term)
    );
    }
    else
    {
      this.dataSource = this.works;
    }
  }

     openHelpDialog() : void {
        const dialogRef = this.dialog.open(HelpModalWorksComponent, {
          width: '500px',
        });
      }
    
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksService } from '../services/works.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Note } from '../models/note';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule,
         MatDialogModule,MatNativeDateModule, FormsModule, MatDatepickerModule, MatInputModule,   ],
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.scss']
})
export class WorkPageComponent implements OnInit{
  constructor(private router: Router, private worksService: WorksService, public dialog: MatDialog) { }

  work : Note = new Note( 1, new Date(), '', 0, 0, 0);

  ngOnInit(): void {
    this.worksService.getWork(Number(this.router.url.split('/')[2])).subscribe(work => {
      this.work = work;
    });
  }

  goToWorksPage() 
  {
    this.router.navigate(['/works']);
  }

  saveWork() 
  {
    this.worksService.updateWork(this.work).subscribe(result => {console.log(result);} );
    this.router.navigate(['/works']);
  }
}

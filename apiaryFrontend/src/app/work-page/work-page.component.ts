import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksService } from '../services/works.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Note } from '../models/note';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HivesService } from '../services/hives.service';
import { MatSelectModule } from '@angular/material/select';
import { Hive } from '../models/hive';

@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule,
         MatDialogModule,MatNativeDateModule, FormsModule, MatDatepickerModule, MatInputModule, MatSelectModule   ],
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.scss']
})
export class WorkPageComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute, private worksService: WorksService, public dialog: MatDialog, private hivesService : HivesService) { }

  work : Note = new Note( 1, new Date(), '', 0, 0, 0);
  backPath: string = '/works';
  hivesNames: Map<number, string> = new Map();
  hives: Hive[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.backPath = params['backPath'];
    });
    this.worksService.getWork(Number(this.router.url.split('/')[2].split('?')[0])).subscribe(work => {
      this.work = work;
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

  goBack() 
  {
    this.router.navigate([this.backPath]);
  }

  saveWork() 
  {
    this.worksService.updateWork(this.work).subscribe(result => {console.log(result);} );
    this.goBack(); 
  }
}

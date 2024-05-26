import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { AddSezonModalComponent } from '../add-sezon-modal/add-sezon-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Sezon } from '../models/sezon';
import { MatNativeDateModule } from '@angular/material/core';
import { SezonsService } from '../services/sezons.service';
@Component({
  selector: 'app-sezons-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule,MatNativeDateModule],
  templateUrl: './sezons-page.component.html',
  styleUrls: ['./sezons-page.component.scss']
})
export class SezonsPageComponent implements OnInit{

  constructor(private router: Router, public dialog: MatDialog, private sezonsService: SezonsService) { }


  dataSource: Sezon[] = [];
  tableColumns = ['id', 'name', 'startDate', 'endDate', 'honey', 'syroup', 'options'];

  ngOnInit(): void 
  {
    this.sezonsService.getSezons().subscribe(result => {
      if(result )
        this.dataSource = result;
    });
  
  }

  goToStartPage() 
  {
    this.router.navigate(['/home']);
  }
  
  openAddSezonDialog() : void {
    const dialogRef = this.dialog.open(AddSezonModalComponent, {
      width: '300px',
      data: { }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.sezonsService.createSezon(new Sezon(result.name, result.startDate, result.endDate, 0, 0)).subscribe(result => {
        this.dataSource.push(result);
        this.dataSource = [...this.dataSource];
      });
    });
  }

  deleteSezon(id: number) {
    this.sezonsService.deleteSezon(id).subscribe(result => {
        this.dataSource = this.dataSource.filter(sezon => sezon.id !== id);
    });

  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { AddSezonModalComponent } from '../add-sezon-modal/add-sezon-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Sezon } from '../models/sezon';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-sezons-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule,MatNativeDateModule],
  templateUrl: './sezons-page.component.html',
  styleUrls: ['./sezons-page.component.scss']
})
export class SezonsPageComponent {

  constructor(private router: Router, public dialog: MatDialog) { }

  dataSource: Sezon[] = [];
  tableColumns = ['id', 'name', 'startDate', 'endDate', 'honey', 'syroup', 'options'];

  goToStartPage() 
  {
    this.router.navigate(['/home']);
  }
  
  openAddSezonDialog() : void {
    const dialogRef = this.dialog.open(AddSezonModalComponent, {
      width: '300px',
      data: { name: '', queen: '' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      //rządanie do backendu
      this.dataSource.push(new Sezon(result.name, result.startDate, result.endDate, 0, 0));
      this.dataSource = [...this.dataSource];
    });
  }
}

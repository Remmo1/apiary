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
import { HelpModalSezonsComponent } from '../help-modal-sezons/help-modal-sezons.component';
@Component({
  selector: 'app-sezons-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule,MatNativeDateModule,],
  templateUrl: './sezons-page.component.html',
  styleUrls: ['./sezons-page.component.scss']
})
export class SezonsPageComponent implements OnInit{


  constructor(private router: Router, public dialog: MatDialog, private sezonsService: SezonsService) { }
  //searchTerm = '';
  sezons : Sezon[] = [];
  dataSource: Sezon[] = [];
  tableColumns = ['id', 'name', 'startDate', 'endDate', 'honey', 'syroup', 'options'];

  ngOnInit(): void 
  {
    this.sezonsService.getSezons().subscribe(result => {
      if(result )
        this.sezons = result;
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
        this.sezons.push(result);
        this.dataSource = [...this.dataSource];
        this.sezonsService.getSezons().subscribe(result => {
          if(result )
            this.dataSource = result;
        });
      });
    });
  }

  deleteSezon(id: number) {
    this.sezonsService.deleteSezon(id).subscribe(result => {
        this.dataSource = this.dataSource.filter(sezon => sezon.id !== id);
    });

  }

  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if(searchTerm !== '') {
    const term = searchTerm.toLowerCase();
    this.dataSource = this.sezons.filter(item =>
      item.name.toLowerCase().includes(term)
    );
    }
    else
    {
      this.dataSource = this.sezons;
    }
  }

    openHelpDialog() : void {
      const dialogRef = this.dialog.open(HelpModalSezonsComponent, {
        width: '520px',
      });
    }
  
}

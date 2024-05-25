import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddHiveModalComponent } from '../add-hive-modal/add-hive-modal.component';
import { Hive } from '../models/hive';
import { Corp } from '../models/corp';

@Component({
  selector: 'app-hives-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './hives-page.component.html',
  styleUrls: ['./hives-page.component.scss']
})
export class HivesPageComponent implements OnInit{
  beeHivesCount = 0;
  framesCount = 0;
  corpsCount = 0;

  constructor(private router: Router, public dialog: MatDialog) { }

  dataSource : Hive[] = [];
  hives: Hive[] = [];
  tableColumns = ['id', 'name', 'queen', 'frames', 'corps','options'];

  ngOnInit(): void 
  {
    //rządanie do backendu
    this.countApiaryParameters();
  }

  goToStartPage() 
  {
    this.router.navigate(['/home']);
  }

  countApiaryParameters() : void {
    this.beeHivesCount = this.hives.length;
    this.framesCount = this.hives.reduce((acc, hive) => acc + this.countFramesInHive(hive), 0);
    this.corpsCount = this.hives.reduce((acc, hive) => acc + this.countCorpsInHive(hive), 0);
  }

  openAddHiveDialog() : void {
    const dialogRef = this.dialog.open(AddHiveModalComponent, {
      width: '300px',
      data: { name: '', queen: '' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      //rządanie do backendu
      this.hives.push(new Hive(result.name, result.queen, [], []));
      this.dataSource.push(new Hive(result.name, result.queen, [], []));
      this.dataSource = [...this.dataSource];
      this.countApiaryParameters();
    });
  }

  countFramesInHive(hive: Hive) : number {
    if(hive.corps) {
      let frames = 0;
      hive.corps.forEach(corp => {
        frames += corp.framesBlack + corp.framesBrown + corp.framesWhite + corp.framesEmpty;
      });
      return frames;
    }else{
      return 0;
    }
  }

  countCorpsInHive(hive: Hive) : number {
    if(hive.corps) {
    return hive.corps.length;
    }else{
      return 0;
    }
  }

  deleteHive(event: any) 
  {
    //rządanie do backendu
    this.hives = this.hives.filter(hive => hive.id !== event.id);
    this.dataSource = this.dataSource.filter(hive => hive.id !== event.id);
    this.dataSource = [...this.dataSource];
    this.countApiaryParameters();
  }


  editHive(event: any)
  {
    this.router.navigate(['/hive', event.id]);
  }
}

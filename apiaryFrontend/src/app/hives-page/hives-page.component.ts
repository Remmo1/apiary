import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddHiveModalComponent } from '../add-hive-modal/add-hive-modal.component';
import { Hive } from '../models/hive';
import { HivesService } from '../services/hives.service';

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

  constructor(private router: Router, public dialog: MatDialog, private hivesService :HivesService) { }

  dataSource : Hive[] = [];
  tableColumns = ['id', 'name', 'queen', 'frames', 'corps','options'];

  ngOnInit(): void 
  {
    this.hivesService.getHives().subscribe(hives => {
      this.dataSource = hives;
      this.countApiaryParameters();
    });
  }

  goToStartPage() 
  {
    this.router.navigate(['/home']);
  }

  countApiaryParameters() : void {
    this.beeHivesCount = this.dataSource.length;
    this.framesCount = this.dataSource.reduce((acc, hive) => acc + this.countFramesInHive(hive), 0);
    this.corpsCount = this.dataSource.reduce((acc, hive) => acc + this.countCorpsInHive(hive), 0);
  }

  openAddHiveDialog() : void {
    const dialogRef = this.dialog.open(AddHiveModalComponent, {
      width: '300px',
      data: { name: '', queen: '' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.hivesService.createHive(new Hive(result.name, result.queen, [], [])).subscribe(result => {
        if(result instanceof Error){
          console.log(result);
        }
        else{
          this.dataSource.push(result);
          this.dataSource = [...this.dataSource];
          this.countApiaryParameters();
        }

      });
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

  deleteHive(id: number) 
  {
    this.hivesService.deleteHive(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(hive => hive.id !== id);
      this.dataSource = [...this.dataSource];
      this.countApiaryParameters();
    });
  }


  editHive(id: number)
  {
    this.router.navigate(['/hive', id]);
  }
}

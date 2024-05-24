import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FramesIndicatorComponent } from "../frames-indicator/frames-indicator.component";

@Component({
    selector: 'app-hive-page',
    standalone: true,
    templateUrl: './hive-page.component.html',
    styleUrls: ['./hive-page.component.scss'],
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, FramesIndicatorComponent]
})
export class HivePageComponent implements OnInit{
onValueChange($event: number) {
throw new Error('Method not implemented.');
}
  hiveId = 0;
  corpsCount = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.hiveId = Number(this.router.url.split('/')[2]);
  }
  
  goToHivesPage() 
  {
    this.router.navigate(['/hives']);
  }

}

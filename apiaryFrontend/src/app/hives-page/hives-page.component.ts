import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hives-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './hives-page.component.html',
  styleUrls: ['./hives-page.component.scss']
})
export class HivesPageComponent {
  beeHivesCount = 0;
  framesCount = 0;
  corpsCount = 0;

  constructor(private router: Router) { }
  dataSource = [];
  tableColumns = ['id', 'name', 'queen', 'frames', 'bodies'];

  goToStartPage() 
  {
    this.router.navigate(['/home']);
  }
}

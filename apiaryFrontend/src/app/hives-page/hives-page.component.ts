import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-hives-page',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './hives-page.component.html',
  styleUrls: ['./hives-page.component.scss']
})
export class HivesPageComponent {

  dataSource = [];
  tableColumns = ['id', 'name', 'queen', 'frames', 'bodies'];
}

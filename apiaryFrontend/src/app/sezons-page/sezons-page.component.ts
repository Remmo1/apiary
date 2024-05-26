import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sezons-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './sezons-page.component.html',
  styleUrls: ['./sezons-page.component.scss']
})
export class SezonsPageComponent {

  constructor(private router: Router) { }

  dataSource = [];
  tableColumns = ['id', 'name', 'startDate', 'startHives', 'endDate', 'endHives', 'honey', 'syroup', 'options'];

  goToStartPage() 
  {
    this.router.navigate(['/home']);
  }
}

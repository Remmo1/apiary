import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {

  constructor(private router: Router) { }

goToHivesPage() {
  this.router.navigate(['/hives']);
}

goToSezonsPage() {
  this.router.navigate(['/sezons']);
}

goToWorksPage() {
  this.router.navigate(['/works']);
}

goToHelpPage() {
  this.router.navigate(['/help']);
}
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, NavigationBarComponent]
})
export class AppComponent {
  constructor(private router: Router) { }
  title = 'BeeKing';

  gotoHome() {
    this.router.navigate(['/home']);
  }


}

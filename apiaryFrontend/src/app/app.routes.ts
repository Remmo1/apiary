import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';

export const routes: Routes = [
    { path: '*', component: StartPageComponent },
    { path: 'home', component: StartPageComponent },
];

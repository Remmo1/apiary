import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { HivesPageComponent } from './hives-page/hives-page.component';
import { SezonsPageComponent } from './sezons-page/sezons-page.component';
import { HivePageComponent } from './hive-page/hive-page.component';
import { WorksPageComponent } from './works-page/works-page.component';
import { WorkPageComponent } from './work-page/work-page.component';

export const routes: Routes = [
    { path: 'home', component: StartPageComponent },
    { path: 'hives', component: HivesPageComponent },
    { path: 'hive/:id', component: HivePageComponent },
    { path: 'sezons', component: SezonsPageComponent },
    { path: 'works', component: WorksPageComponent },
    { path: 'work/:id', component: WorkPageComponent },
    { path: '**', component: StartPageComponent },

];

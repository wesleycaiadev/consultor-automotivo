import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { ShowroomPageComponent } from './features/showroom/showroom-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Marques Felipe — Curadoria Automotiva',
  },
  {
    path: 'showroom',
    component: ShowroomPageComponent,
    title: 'Showroom — Marques Felipe Curadoria Automotiva',
  },
];

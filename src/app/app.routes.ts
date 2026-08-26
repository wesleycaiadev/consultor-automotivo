import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { ShowroomPageComponent } from './features/showroom/showroom-page.component';
import { VehicleDetailPageComponent } from './features/vehicle-detail/vehicle-detail-page.component';

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
  {
    path: 'showroom/:slug',
    component: VehicleDetailPageComponent,
    title: 'Veículo — Marques Felipe Curadoria Automotiva',
  },
];

import { Routes } from '@angular/router';
import { CarFinderPageComponent } from './features/car-finder/car-finder-page.component';
import { HomePageComponent } from './features/home/home-page.component';
import { ShowroomPageComponent } from './features/showroom/showroom-page.component';
import { VehicleDetailPageComponent } from './features/vehicle-detail/vehicle-detail-page.component';
import { PublicShellComponent } from './layout/public-shell/public-shell.component';
import { AdminShellComponent } from './layout/admin-shell/admin-shell.component';
import { adminAuthGuard } from './core/guards/admin-auth.guard';
import { AdminLoginPageComponent } from './features/admin-login/admin-login-page.component';
import { AdminDashboardPageComponent } from './features/admin-dashboard/admin-dashboard-page.component';
import { AdminDeliveryListPageComponent } from './features/admin-deliveries/admin-delivery-list-page.component';
import { AdminVehicleListPageComponent } from './features/admin-vehicles/admin-vehicle-list-page.component';
import { AdminVehicleEditorPageComponent } from './features/admin-vehicles/admin-vehicle-editor-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicShellComponent,
    children: [
      { path: '', component: HomePageComponent, title: 'Marques Felipe — Curadoria Automotiva' },
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
      {
        path: 'encontrar-meu-carro',
        component: CarFinderPageComponent,
        title: 'Encontrar meu carro — Marques Felipe Curadoria Automotiva',
      },
    ],
  },
  {
    path: 'admin/login',
    component: AdminLoginPageComponent,
    title: 'Acesso administrativo — Marques Felipe',
  },
  {
    path: 'admin',
    component: AdminShellComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', component: AdminDashboardPageComponent },
      { path: 'veiculos', component: AdminVehicleListPageComponent },
      { path: 'veiculos/novo', component: AdminVehicleEditorPageComponent },
      { path: 'entregas', component: AdminDeliveryListPageComponent },
      { path: 'feedbacks', component: AdminDashboardPageComponent },
      { path: 'configuracoes', component: AdminDashboardPageComponent },
    ],
  },
];

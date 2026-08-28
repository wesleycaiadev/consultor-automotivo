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
import { AdminFeedbackListPageComponent } from './features/admin-feedbacks/admin-feedback-list-page.component';
import { AdminVehicleListPageComponent } from './features/admin-vehicles/admin-vehicle-list-page.component';
import { AdminVehicleEditorPageComponent } from './features/admin-vehicles/admin-vehicle-editor-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicShellComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        title: 'Marques Felipe — Curadoria Automotiva',
        data: {
          seo: {
            title: 'Marques Felipe — Curadoria Automotiva',
            description:
              'Curadoria automotiva para encontrar, avaliar e escolher o carro certo com segurança, procedência e clareza.',
            path: '/',
          },
        },
      },
      {
        path: 'showroom',
        component: ShowroomPageComponent,
        title: 'Showroom — Marques Felipe Curadoria Automotiva',
        data: {
          seo: {
            title: 'Showroom — Marques Felipe Curadoria Automotiva',
            description:
              'Veículos selecionados com contexto técnico e curadoria para uma decisão de compra mais segura.',
            path: '/showroom',
          },
        },
      },
      {
        path: 'showroom/:slug',
        component: VehicleDetailPageComponent,
        title: 'Veículo — Marques Felipe Curadoria Automotiva',
        data: {
          seo: {
            title: 'Veículo — Marques Felipe Curadoria Automotiva',
            description:
              'Detalhes, fotos, especificações e contexto de curadoria para avaliar um veículo selecionado.',
            path: '/showroom',
          },
        },
      },
      {
        path: 'encontrar-meu-carro',
        component: CarFinderPageComponent,
        title: 'Encontrar meu carro — Marques Felipe Curadoria Automotiva',
        data: {
          seo: {
            title: 'Encontrar meu carro — Marques Felipe Curadoria Automotiva',
            description:
              'Conte para Felipe o tipo de veículo, faixa de investimento e preferências para iniciar uma busca personalizada pelo WhatsApp.',
            path: '/encontrar-meu-carro',
          },
        },
      },
    ],
  },
  {
    path: 'admin/login',
    component: AdminLoginPageComponent,
    title: 'Acesso administrativo — Marques Felipe',
    data: {
      seo: {
        title: 'Acesso administrativo — Marques Felipe',
        description: 'Área administrativa restrita da Marques Felipe Curadoria Automotiva.',
        path: '/admin/login',
        noindex: true,
      },
    },
  },
  {
    path: 'admin',
    component: AdminShellComponent,
    canActivate: [adminAuthGuard],
    data: {
      seo: {
        title: 'Administração — Marques Felipe',
        description: 'Área administrativa restrita da Marques Felipe Curadoria Automotiva.',
        path: '/admin',
        noindex: true,
      },
    },
    children: [
      { path: '', component: AdminDashboardPageComponent },
      { path: 'veiculos', component: AdminVehicleListPageComponent },
      { path: 'veiculos/novo', component: AdminVehicleEditorPageComponent },
      { path: 'entregas', component: AdminDeliveryListPageComponent },
      { path: 'feedbacks', component: AdminFeedbackListPageComponent },
      { path: 'configuracoes', component: AdminDashboardPageComponent },
    ],
  },
];

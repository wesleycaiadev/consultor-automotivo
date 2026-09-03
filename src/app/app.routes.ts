import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { Routes } from '@angular/router';
import { PublicShellComponent } from './layout/public-shell/public-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home-page.component').then(
            (component) => component.HomePageComponent,
          ),
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
        loadComponent: () =>
          import('./features/showroom/showroom-page.component').then(
            (component) => component.ShowroomPageComponent,
          ),
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
        loadComponent: () =>
          import('./features/vehicle-detail/vehicle-detail-page.component').then(
            (component) => component.VehicleDetailPageComponent,
          ),
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
        loadComponent: () =>
          import('./features/car-finder/car-finder-page.component').then(
            (component) => component.CarFinderPageComponent,
          ),
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
    loadComponent: () =>
      import('./features/admin-login/admin-login-page.component').then(
        (component) => component.AdminLoginPageComponent,
      ),
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
    loadComponent: () =>
      import('./layout/admin-shell/admin-shell.component').then(
        (component) => component.AdminShellComponent,
      ),
    canActivate: [
      (route, state) => {
        const injector = inject(EnvironmentInjector);
        return import('./core/guards/admin-auth.guard').then(({ adminAuthGuard }) =>
          runInInjectionContext(injector, () => adminAuthGuard(route, state)),
        );
      },
    ],
    data: {
      seo: {
        title: 'Administração — Marques Felipe',
        description: 'Área administrativa restrita da Marques Felipe Curadoria Automotiva.',
        path: '/admin',
        noindex: true,
      },
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin-dashboard/admin-dashboard-page.component').then(
            (component) => component.AdminDashboardPageComponent,
          ),
      },
      {
        path: 'veiculos',
        loadComponent: () =>
          import('./features/admin-vehicles/admin-vehicle-list-page.component').then(
            (component) => component.AdminVehicleListPageComponent,
          ),
      },
      {
        path: 'veiculos/novo',
        loadComponent: () =>
          import('./features/admin-vehicles/admin-vehicle-editor-page.component').then(
            (component) => component.AdminVehicleEditorPageComponent,
          ),
      },
      {
        path: 'entregas',
        loadComponent: () =>
          import('./features/admin-deliveries/admin-delivery-list-page.component').then(
            (component) => component.AdminDeliveryListPageComponent,
          ),
      },
      {
        path: 'feedbacks',
        loadComponent: () =>
          import('./features/admin-feedbacks/admin-feedback-list-page.component').then(
            (component) => component.AdminFeedbackListPageComponent,
          ),
      },
      {
        path: 'configuracoes',
        loadComponent: () =>
          import('./features/admin-dashboard/admin-dashboard-page.component').then(
            (component) => component.AdminDashboardPageComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

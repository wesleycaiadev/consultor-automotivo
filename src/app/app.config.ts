import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  SupabaseVehicleRepository,
  VEHICLE_REPOSITORY,
} from './core/services/vehicle-repository.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    { provide: VEHICLE_REPOSITORY, useExisting: SupabaseVehicleRepository },
  ],
};

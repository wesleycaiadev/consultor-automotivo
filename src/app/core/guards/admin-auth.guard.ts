import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../auth/admin-auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) return true;

  return auth
    .waitForSessionRestore()
    .then((session) => session !== null || router.createUrlTree(['/admin/login']));
};

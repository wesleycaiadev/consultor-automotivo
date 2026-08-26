import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../auth/admin-auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  return auth.isAuthenticated() || router.createUrlTree(['/admin/login']);
};

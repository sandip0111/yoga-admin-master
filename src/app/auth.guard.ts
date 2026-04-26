import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from './services/service.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const service = inject(ServiceService);
  const router = inject(Router);

  if (service.isLogedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

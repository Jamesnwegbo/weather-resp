import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Shared } from '../shared';

export const firstNameGuard: CanActivateFn = (route, state) => {
  const shared = inject(Shared);
  const router = inject(Router);
  
  if (shared.hasFirstName()) {
    return true;    
  } else {
    router.navigateByUrl('/personalise');
    return false;    
  }
};

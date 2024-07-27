import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppRoutes } from '@core/constants';

export const unSignedInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isUserSignedIn = false
  const router = inject(Router)

  if(!isUserSignedIn) {
    if(state.url.includes(AppRoutes.DASHBOARD) 
      /* || state.url.includes(AppRoutes.CHANGE_PASSWORD) */) 
    {
      router.navigateByUrl(AppRoutes.SIGN_IN)

      return true
    }
  }
  
  return true
};
